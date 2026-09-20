// src/lib/dateUtils.js
import { clubData } from "@/src/config/clubData.js";

export function getLocalClubTime(date = new Date()) {
  const timeZone = clubData.brand?.timeZone || "Asia/Dubai";

  // فرمت تاریخ و ساعت رسمی به وقت محلی باشگاه
  const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);

  const formattedTimeOnly = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);

  return {
    timeZone,
    formattedDateTime, // مثال: 20/09/2026, 06:30:15 pm
    formattedTimeOnly, // مثال: 06:30:15 pm
  };
}
