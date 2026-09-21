import { NextResponse } from "next/server";
import { generateLeadEmailHtml } from "@/src/lib/emailTemplate.js";
import { getLocalClubTime } from "@/src/lib/dateUtils.js";

// استخراج ایمن متغیرها چه در لوکال/ورسل و چه در ورکر کلودفلر
async function resolveEnvironmentVariables() {
  let cfEnv = {};
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    if (ctx && ctx.env) {
      cfEnv = ctx.env;
    }
  } catch (e) {
    // در محیط غیر از کلودفلر نادیده گرفته می‌شود
  }

  return {
    RESEND_API_KEY: cfEnv.RESEND_API_KEY || process.env.RESEND_API_KEY || "",
    GYM_ADMIN_EMAIL: cfEnv.GYM_ADMIN_EMAIL || process.env.GYM_ADMIN_EMAIL || "",
    GOOGLE_SHEET_WEBHOOK_URL:
      cfEnv.GOOGLE_SHEET_WEBHOOK_URL ||
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "",
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      countryCode,
      phone,
      goal,
      selectedBranch,
      lang = "ar",
      bookings = {},
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        {
          error:
            lang === "ar"
              ? "الاسم ورقم الهاتف مطلوبان."
              : "Name and phone are required.",
        },
        { status: 400 },
      );
    }

    const cleanCountryCode = countryCode
      ? countryCode.replace("+", "").trim()
      : "971";
    const cleanPhone = phone.replace(/^0+/, "").replace(/\s+/g, "").trim();
    const fullInternationalPhone = `${cleanCountryCode}${cleanPhone}`;

    const defaultGreeting =
      lang === "ar"
        ? `مرحباً ${fullName}، معك إدارة النادي بخصوص تصريحك اليومي المجاني.`
        : `Hello ${fullName}, this is the club concierge regarding your complimentary day pass.`;

    const oneClickWaLink = `https://wa.me/${fullInternationalPhone}?text=${encodeURIComponent(defaultGreeting)}`;

    const { formattedDateTime, timeZone } = getLocalClubTime(new Date());

    const selectedSummary =
      [
        bookings?.plan
          ? `باقة: ${bookings.plan} ${bookings.planPrice ? `(${bookings.planPrice})` : ""}`
          : null,
        bookings?.trainer ? `مدرب: ${bookings.trainer}` : null,
        bookings?.classSession
          ? `حصة: ${bookings.classSession} ${bookings.classTime ? `(${bookings.classTime})` : ""}`
          : null,
      ]
        .filter(Boolean)
        .join(" | ") ||
      (lang === "ar" ? "تصريح تجريبي عام" : "General Day Pass");

    // خواندن مقادیر با تابع هوشمند دوطرفه
    const env = await resolveEnvironmentVariables();

    // ۱. ارسال به گوگل شیت
    if (env.GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(env.GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: `${formattedDateTime} (${timeZone})`,
            name: fullName,
            phone: `+${fullInternationalPhone}`,
            goal: goal || "-",
            branch: selectedBranch || "-",
            reservations: selectedSummary,
            whatsappLink: oneClickWaLink,
            language: lang,
          }),
        });
      } catch (err) {
        console.error("Cloudflare Sheet Sync Error:", err);
      }
    }

    // ۲. ارسال مستقیم از طریق Resend HTTP API (همراه با Await صریح)
    let emailStatus = "not_attempted";
    let resendDebug = null;

    if (env.RESEND_API_KEY && env.GYM_ADMIN_EMAIL) {
      const emailHtml = generateLeadEmailHtml({
        fullName,
        fullInternationalPhone,
        goal,
        selectedBranch,
        selectedSummary,
        oneClickWaLink,
        formattedDateTime: `${formattedDateTime} (${timeZone})`,
        lang,
      });

      const emailSubject =
        lang === "ar"
          ? `🔥 مشترك جديد: ${fullName} (${selectedSummary})`
          : `🔥 New Lead: ${fullName} (${selectedSummary})`;

      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY.trim()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: [env.GYM_ADMIN_EMAIL.trim()],
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        resendDebug = await resendResponse.json();
        emailStatus = resendResponse.ok ? "sent" : "failed";
      } catch (err) {
        console.error("Cloudflare Resend Dispatch Error:", err);
        emailStatus = "network_error";
      }
    } else {
      emailStatus = "missing_env_credentials";
    }

    return NextResponse.json(
      {
        success: true,
        emailStatus,
        debug: {
          hasApiKey: Boolean(env.RESEND_API_KEY),
          adminEmail: env.GYM_ADMIN_EMAIL || "NOT_SET",
          resendOutcome: resendDebug,
        },
        message:
          lang === "ar"
            ? "تم استلام بياناتك بنجاح."
            : "Lead received successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lead route global error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
