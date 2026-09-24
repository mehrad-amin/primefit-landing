import { NextResponse } from "next/server";
import { generateLeadEmailHtml } from "@/src/lib/emailTemplate.js";
import { getLocalClubTime } from "@/src/lib/dateUtils.js";

async function resolveEnvironmentVariables() {
  let cfEnv = {};
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    if (ctx && ctx.env) cfEnv = ctx.env;
  } catch (e) {}

  return {
    RESEND_API_KEY: cfEnv.RESEND_API_KEY || process.env.RESEND_API_KEY || "",
    GYM_ADMIN_EMAIL: cfEnv.GYM_ADMIN_EMAIL || process.env.GYM_ADMIN_EMAIL || "",
    GOOGLE_SHEET_WEBHOOK_URL:
      cfEnv.GOOGLE_SHEET_WEBHOOK_URL ||
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "",
    CALLMEBOT_PHONE: cfEnv.CALLMEBOT_PHONE || process.env.CALLMEBOT_PHONE || "",
    CALLMEBOT_API_KEY:
      cfEnv.CALLMEBOT_API_KEY || process.env.CALLMEBOT_API_KEY || "",
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
      joinWaitlist = false,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        {
          success: false,
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
        ? `مرحباً ${fullName}، معك إدارة النادي بخصوص تصريحك التدريبي.`
        : `Hello ${fullName}, this is the club concierge regarding your training pass.`;

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

    const env = await resolveEnvironmentVariables();
    let sheetResult = { success: true, status: "CONFIRMED" };

    // ۱. ارسال به گوگل شیت و بررسی ظرفیت
    if (env.GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        const sheetRes = await fetch(env.GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            timestamp: `${formattedDateTime} (${timeZone})`,
            name: fullName,
            phone: `+${fullInternationalPhone}`,
            goal: goal || "-",
            branch: selectedBranch || "-",
            reservations: selectedSummary,
            classSession: bookings?.classSession || null,
            classId: bookings?.classId || null,
            joinWaitlist: Boolean(joinWaitlist),
            whatsappLink: oneClickWaLink,
            language: lang,
          }),
        });

        sheetResult = await sheetRes.json();

        // اگر کلاس پر بود، فوراً پاسخ را برگردان تا به کاربر پیشنهاد لیست انتظار داده شود
        if (sheetResult.status === "CLASS_FULL") {
          return NextResponse.json(sheetResult, { status: 200 });
        }
      } catch (err) {
        console.error("Cloudflare Sheet Sync Error:", err);
      }
    }

    const isWaitlist = sheetResult.status === "WAITLIST_CONFIRMED";

    // ۲. ارسال ایمیل از طریق Resend
    if (env.RESEND_API_KEY && env.GYM_ADMIN_EMAIL) {
      const emailHtml = generateLeadEmailHtml({
        fullName,
        fullInternationalPhone,
        goal,
        selectedBranch,
        selectedSummary: `${selectedSummary} ${isWaitlist ? " [قائمة انتظار ⏳]" : ""}`,
        oneClickWaLink,
        formattedDateTime: `${formattedDateTime} (${timeZone})`,
        lang,
      });

      const emailSubject = isWaitlist
        ? `⏳ قائمة انتظار جديدة: ${fullName} (${bookings?.classSession || selectedSummary})`
        : `🔥 مشترك جديد: ${fullName} (${selectedSummary})`;

      fetch("https://api.resend.com/emails", {
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
      }).catch((e) => console.error("Resend Error:", e));
    }

    // ۳. ارسال پیام واتس‌اپ منشی با CallMeBot
    if (env.CALLMEBOT_PHONE && env.CALLMEBOT_API_KEY) {
      const recipientPhone = env.CALLMEBOT_PHONE.replace("+", "").trim();
      const alertHeader = isWaitlist
        ? `⏳ *طلب تسجيل في قائمة الانتظار!*`
        : `🚨 *حجز جديد في النادي!* 🏋️‍♂️`;

      const alertMessage =
        `${alertHeader}\n\n` +
        `👤 *الاسم:* ${fullName}\n` +
        `📱 *الهاتف:* +${fullInternationalPhone}\n` +
        `🎯 *الهدف:* ${goal || "-"}\n` +
        `📍 *الفرع:* ${selectedBranch || "-"}\n` +
        `📋 *التفاصيل:* ${selectedSummary}\n` +
        `📊 *الحالة:* ${isWaitlist ? "قائمة انتظار (الحصة ممتلئة)" : "حجز مؤكد"}\n` +
        `🕒 *الوقت:* ${formattedDateTime}\n\n` +
        `💬 *تواصل مع العميل بنقرة واحدة:*\n${oneClickWaLink}`;

      const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
        recipientPhone,
      )}&text=${encodeURIComponent(alertMessage)}&apikey=${encodeURIComponent(
        env.CALLMEBOT_API_KEY.trim(),
      )}`;

      fetch(callMeBotUrl).catch((e) => console.error("CallMeBot Error:", e));
    }

    return NextResponse.json({
      success: true,
      status: sheetResult.status || "CONFIRMED",
      message: isWaitlist
        ? lang === "ar"
          ? "تمت إضافتك إلى قائمة الانتظار بنجاح."
          : "Added to waitlist successfully."
        : lang === "ar"
          ? "تم استلام بياناتك وتأكيد الحجز بنجاح."
          : "Booking confirmed successfully.",
    });
  } catch (error) {
    console.error("Lead route global error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
