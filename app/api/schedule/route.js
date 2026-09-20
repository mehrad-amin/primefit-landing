import { NextResponse } from "next/server";
import { clubData } from "../../../src/config/clubData.js";

export async function GET() {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  // اگر هنوز متغیر گوگل شیت ست نشده بود، دیتای پیش‌فرض کانفیگ را برمی‌گرداند
  if (!webhookUrl) {
    return NextResponse.json({ classes: clubData.schedule?.classes || [] });
  }

  try {
    const res = await fetch(webhookUrl, {
      next: { revalidate: 60 }, // کش به مدت ۱ دقیقه
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from Google Sheets");
    }

    const data = await res.json();
    return NextResponse.json({
      classes: data.classes || clubData.schedule?.classes || [],
    });
  } catch (error) {
    console.error("Error fetching dynamic schedule:", error);
    // فال‌بک امن به دیتای لوکال
    return NextResponse.json({ classes: clubData.schedule?.classes || [] });
  }
}
