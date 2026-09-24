"use client";

import { useState, useEffect, useCallback } from "react";
import { clubData } from "../config/clubData.js";
import {
  Calendar,
  Clock,
  User,
  Flame,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function Schedule({ lang = "ar", onSelectClass }) {
  // ۱. تمامی هوک‌ها پیش از هرگونه شرط یا Return زودهنگام تعریف می‌شوند
  const { schedule } = clubData;
  const isAr = lang === "ar";
  const showSchedule = Boolean(clubData.features?.showSchedule);

  const [selectedDay, setSelectedDay] = useState("all");
  const [classesList, setClassesList] = useState(schedule?.classes || []);
  const [isLoading, setIsLoading] = useState(false);

  // ۲. مدیریت دریافت دیتا با useCallback برای جلوگیری از بازسازی تابع
  const fetchLiveSchedule = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/schedule");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.classes) && data.classes.length > 0) {
          setClassesList(data.classes);
        }
      }
    } catch (err) {
      console.error("Could not load live schedule:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!showSchedule) return;

    let isMounted = true;

    async function loadData() {
      try {
        const res = await fetch("/api/schedule");
        if (res.ok && isMounted) {
          const data = await res.json();
          if (Array.isArray(data.classes) && data.classes.length > 0) {
            setClassesList(data.classes);
          }
        }
      } catch (err) {
        console.error("Could not load initial live schedule:", err);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [showSchedule]);

  // ۳. شرط Return زودهنگام بعد از اجرای تمام هوک‌ها
  if (!showSchedule || !schedule) return null;

  const filteredClasses =
    selectedDay === "all"
      ? classesList
      : classesList.filter((c) => c.dayId === selectedDay);

  const handleClassClick = (item) => {
    if (item.seatsLeft <= 0) return;

    if (typeof onSelectClass === "function") {
      onSelectClass({
        id: item.id || item["(id)"],
        title: isAr ? item.titleAr : item.titleEn,
        titleAr: item.titleAr,
        titleEn: item.titleEn,
        trainer: isAr
          ? item.trainerAr || item.trainer || item.trainerEn
          : item.trainerEn || item.trainer || item.trainerAr,
        time: isAr ? item.timeAr : item.timeEn,
      });
    }
  };
  return (
    <section
      id="schedule"
      className="py-24 bg-dark-900 border-t border-neutral-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* تیتر بخش */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-850 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>{isAr ? schedule.badgeAr : schedule.badgeEn}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? schedule.titleAr : schedule.titleEn}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            {isAr ? schedule.subtitleAr : schedule.subtitleEn}
          </p>
        </div>

        {/* فیلتر روزهای هفته و دکمه رفرش دستی */}
        <div className="flex items-center justify-between sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <div className="flex items-center gap-2">
            {schedule.days?.map((day) => {
              const isActive = selectedDay === day.id;
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => setSelectedDay(day.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gold-500 text-dark-950 shadow-lg shadow-gold-500/20 scale-102 font-black"
                      : "bg-dark-850 text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:text-white"
                  }`}
                >
                  {isAr ? day.labelAr : day.labelEn}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={fetchLiveSchedule}
            title={isAr ? "تحديث السعة من الشيت" : "Refresh live seats"}
            className="p-2.5 rounded-xl bg-dark-850 border border-neutral-800 text-neutral-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-gold-400" : ""}`}
            />
          </button>
        </div>

        {/* لیست کلاس‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClasses.map((item) => {
            const isFull = item.seatsLeft <= 0;

            return (
              <div
                key={item.id}
                className={`bg-dark-850/90 border rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group ${
                  isFull
                    ? "border-neutral-800/50 opacity-60"
                    : "border-neutral-800 hover:border-gold-500/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {item.isLadiesOnly ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-950/60 text-purple-300 border border-purple-800/60 text-[11px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>
                          {isAr
                            ? schedule.ladiesBadgeAr
                            : schedule.ladiesBadgeEn}
                        </span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-800 text-neutral-300 border border-neutral-700 text-[11px] font-medium">
                        <span>
                          {isAr ? schedule.allBadgeAr : schedule.allBadgeEn}
                        </span>
                      </span>
                    )}

                    {isFull ? (
                      <span className="text-[11px] font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/50">
                        {isAr ? "مكتملة العدد" : "Fully Booked"}
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-accent-emerald">
                        {isAr
                          ? schedule.seatsLeftAr.replace("{n}", item.seatsLeft)
                          : schedule.seatsLeftEn.replace("{n}", item.seatsLeft)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-gold-400 transition-colors mb-3">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>

                  <div className="space-y-2 text-xs text-neutral-300 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                      <span className="font-english text-neutral-200">
                        {isAr ? item.timeAr : item.timeEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>
                        {isAr
                          ? schedule.trainerLabelAr
                          : schedule.trainerLabelEn}
                        :{" "}
                        <strong className="text-white">
                          {isAr
                            ? item.trainerAr ||
                              item.trainer ||
                              item.coachAr ||
                              item.trainerEn ||
                              "-"
                            : item.trainerEn ||
                              item.trainer ||
                              item.coachEn ||
                              item.trainerAr ||
                              "-"}
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-accent-lime shrink-0" />
                      <span>
                        {isAr
                          ? schedule.intensityLabelAr
                          : schedule.intensityLabelEn}
                        :{" "}
                        <span className="text-neutral-200">
                          {isAr ? item.intensityAr : item.intensityEn}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isFull}
                  onClick={() => handleClassClick(item)}
                  className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-center transition-all duration-200 shadow-sm ${
                    isFull
                      ? "bg-dark-800 text-neutral-400 cursor-not-allowed border border-neutral-800"
                      : "bg-dark-800 hover:bg-gold-500 text-neutral-200 hover:text-dark-950 border border-neutral-700 hover:border-gold-500 cursor-pointer active:scale-98"
                  }`}
                >
                  {isFull
                    ? isAr
                      ? "عذراً، المقاعد مكتملة"
                      : "Class Full"
                    : isAr
                      ? schedule.bookBtnAr
                      : schedule.bookBtnEn}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-400">
            {isAr ? schedule.disclaimerAr : schedule.disclaimerEn}
          </p>
        </div>
      </div>
    </section>
  );
}
