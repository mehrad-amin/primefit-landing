import { NextResponse } from "next/server";
import { generateLeadEmailHtml } from "@/src/lib/emailTemplate.js";
import { getLocalClubTime } from "@/src/lib/dateUtils.js";

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

    // محاسبه زمان به افق محلی کشور مقصد باشگاه (مثلاً دبی یا ریاض)
    const { formattedDateTime, formattedTimeOnly, timeZone } = getLocalClubTime(
      new Date(),
    );

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

    // ۱. ارسال به گوگل شیت با زمان محلی رسمی
    const googleSheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (googleSheetWebhookUrl) {
      fetch(googleSheetWebhookUrl, {
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
      }).catch((err) => console.error("Google Sheet Sync Error:", err));
    }

    // ۲. ارسال ایمیل با نمایش دقیق ساعت محلی باشگاه
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.GYM_ADMIN_EMAIL;

    if (resendApiKey && adminEmail) {
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

      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "PrimeFit Club <onboarding@resend.dev>",
          to: [adminEmail],
          subject: emailSubject,
          html: emailHtml,
        }),
      }).catch((err) => console.error("Resend Network Error:", err));
    }

    return NextResponse.json(
      {
        success: true,
        message:
          lang === "ar"
            ? "تم استلام بياناتك بنجاح."
            : "Lead received successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lead route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
