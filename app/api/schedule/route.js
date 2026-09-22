import { NextResponse } from "next/server";
import { clubData } from "../../../src/config/clubData.js";

async function resolveEnvironmentVariables() {
  let cfEnv = {};
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    if (ctx && ctx.env) cfEnv = ctx.env;
  } catch (e) {}

  return {
    GOOGLE_SHEET_WEBHOOK_URL:
      cfEnv.GOOGLE_SHEET_WEBHOOK_URL ||
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "",
  };
}

export async function GET() {
  const fallbackClasses = clubData.schedule?.classes || [];
  const fallbackPlans = clubData.pricing?.plans || [];
  const env = await resolveEnvironmentVariables();
  const webhookUrl = env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({
      classes: fallbackClasses,
      plans: fallbackPlans,
      source: "fallback_config",
    });
  }

  try {
    const res = await fetch(webhookUrl, {
      next: { revalidate: 10 },
    });

    if (!res.ok) throw new Error("Google Sheets fetch failed");

    const data = await res.json();

    // تبدیل ویژگی‌های متنی جداشده با کاما به آرایه
    const formattedPlans = (data.plans || fallbackPlans).map((p) => ({
      ...p,
      isPopular: Boolean(p.isPopular === true || p.isPopular === "TRUE"),
      featuresAr: Array.isArray(p.featuresAr)
        ? p.featuresAr
        : (p.featuresAr || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      featuresEn: Array.isArray(p.featuresEn)
        ? p.featuresEn
        : (p.featuresEn || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
    }));

    return NextResponse.json(
      {
        classes: data.classes || fallbackClasses,
        plans: formattedPlans,
        source: "live_sheet",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        },
      },
    );
  } catch (error) {
    console.error("Schedule/Plans API error:", error);
    return NextResponse.json({
      classes: fallbackClasses,
      plans: fallbackPlans,
      source: "fallback_error",
    });
  }
}
