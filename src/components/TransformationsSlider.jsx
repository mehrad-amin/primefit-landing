"use client";

import { useState, useRef, useCallback } from "react";
import { clubData } from "../config/clubData.js";
import {
  ChevronRight,
  ChevronLeft,
  Trophy,
  Calendar,
  Dumbbell,
  Sparkles,
} from "lucide-react";

export default function TransformationsSlider({ lang = "ar" }) {
  if (!clubData.features.showTransformations) return null;

  const isAr = lang === "ar";
  const { items, titleAr, titleEn, subtitleAr, subtitleEn } =
    clubData.transformations;
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const currentCase = items[activeCaseIdx] || items[0];

  const handlePositionChange = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const isRtl = typeof document !== "undefined" && document.dir === "rtl";

    let percentage = (x / rect.width) * 100;
    if (isRtl) {
      percentage = 100 - percentage;
    }

    const clamped = Math.max(3, Math.min(97, percentage));
    setSliderPosition(clamped);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches[0]) return;
    handlePositionChange(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handlePositionChange(e.clientX);
  };

  const nextCase = () => {
    setActiveCaseIdx((prev) => (prev + 1) % items.length);
    setSliderPosition(50);
  };

  const prevCase = () => {
    setActiveCaseIdx((prev) => (prev - 1 + items.length) % items.length);
    setSliderPosition(50);
  };

  return (
    <section
      id="transformations"
      className="py-24 bg-dark-950 border-t border-neutral-800/80 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* تیتر بخش */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-850 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>
              {isAr
                ? "نتائج ملموسة لا وعود"
                : "Proven Results, No Empty Promises"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? titleAr : titleEn}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            {isAr ? subtitleAr : subtitleEn}
          </p>
        </div>

        {/* کارت اصلی کیس تحول */}
        <div className="bg-dark-900 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* اسلایدر مقایسه تصویر */}
            <div className="lg:col-span-7">
              <div
                ref={containerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
                className="relative h-[340px] sm:h-[460px] w-full rounded-2xl overflow-hidden cursor-ew-resize border border-neutral-800/90 bg-dark-950"
              >
                {/* تصویر بعد (After) در لایه زیرین */}
                <img
                  src={currentCase.afterImg}
                  alt={`After - ${isAr ? currentCase.nameAr : currentCase.nameEn}`}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />

                {/* تصویر قبل (Before) داخل کانتینر درصدی با برش عرضی */}
                <div
                  className="absolute inset-y-0 start-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentCase.beforeImg}
                    alt={`Before - ${isAr ? currentCase.nameAr : currentCase.nameEn}`}
                    className="absolute inset-y-0 start-0 h-full object-cover max-w-none pointer-events-none"
                    style={{
                      width: containerRef.current
                        ? `${containerRef.current.clientWidth}px`
                        : "100%",
                    }}
                    draggable={false}
                  />
                </div>

                {/* بج‌های ثابت روی عکس */}
                <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between pointer-events-none z-20">
                  <span className="px-3 py-1.5 rounded-lg bg-dark-950/85 backdrop-blur-md text-gold-400 border border-gold-500/30 text-xs font-bold shadow-md">
                    {isAr ? "قبل" : "Before"}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-gold-500 text-dark-950 text-xs font-black shadow-md">
                    {isAr ? "بعد" : "After"}
                  </span>
                </div>

                {/* خط جداکننده و دستگیره دایره‌ای متحرک */}
                <div
                  className="absolute inset-y-0 z-30 pointer-events-none"
                  style={{
                    [isAr ? "right" : "left"]: `${sliderPosition}%`,
                  }}
                >
                  {/* خط عمودی مرکزی طلایی */}
                  <div className="absolute inset-y-0 -start-[1.5px] w-[3px] bg-gradient-to-b from-gold-300 via-gold-500 to-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.9)]" />

                  {/* دستگیره دایره‌ای با ابعاد فیکس و کاملاً گرد */}
                  <div className="absolute top-1/2 -start-5 -translate-y-1/2 w-10 h-10 min-w-10 min-h-10 rounded-full bg-gold-500 text-dark-950 flex items-center justify-center shadow-2xl border-2 border-dark-950 shrink-0 select-none aspect-square">
                    <span className="text-sm font-black leading-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="3" y1="12" x2="21" y2="12" />

                        <polyline points="8 7 3 12 8 17" />

                        <polyline points="16 7 21 12 16 17" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-neutral-400 mt-3.5">
                {isAr
                  ? "اسحب المؤشر للمقارنة الدقيقة بين صورتي قبل وبعد"
                  : "Drag the slider to compare Before & After"}
              </p>
            </div>

            {/* بخش مشخصات و نتایج کیس */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-black text-white">
                    {isAr ? currentCase.nameAr : currentCase.nameEn}
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded bg-dark-850 text-gold-400 border border-gold-500/20 font-semibold">
                    {isAr ? currentCase.trainerAr : currentCase.trainerEn}
                  </span>
                </div>
                <p className="text-sm font-medium text-gold-400 mb-4">
                  {isAr ? currentCase.goalAr : currentCase.goalEn}
                </p>
                <blockquote className="text-neutral-300 text-sm italic bg-dark-850 p-4 rounded-xl border-s-2 border-gold-500 mb-6 leading-relaxed">
                  "{isAr ? currentCase.quoteAr : currentCase.quoteEn}"
                </blockquote>

                {/* آمارهای تغییرات بدنی */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-dark-850 p-3 rounded-xl border border-neutral-800">
                    <Calendar className="w-4 h-4 mx-auto text-neutral-400 mb-1" />
                    <span className="block text-xs text-neutral-400">
                      {isAr ? "المدة" : "Duration"}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white font-english">
                      {isAr ? currentCase.durationAr : currentCase.durationEn}
                    </span>
                  </div>
                  <div className="bg-dark-850 p-3 rounded-xl border border-neutral-800">
                    <Dumbbell className="w-4 h-4 mx-auto text-accent-emerald mb-1" />
                    <span className="block text-xs text-neutral-400">
                      {isAr ? "الوزن" : "Weight"}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-accent-emerald font-english">
                      {isAr
                        ? currentCase.weightChangeAr
                        : currentCase.weightChangeEn}
                    </span>
                  </div>
                  <div className="bg-dark-850 p-3 rounded-xl border border-neutral-800">
                    <Sparkles className="w-4 h-4 mx-auto text-gold-400 mb-1" />
                    <span className="block text-xs text-neutral-400">
                      {isAr ? "نسبة الدهون" : "Body Fat"}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gold-400 font-english">
                      {isAr
                        ? currentCase.bodyFatChangeAr
                        : currentCase.bodyFatChangeEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* سوئیچ بین کیس‌های دیگر */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <span className="text-xs text-neutral-400 font-english">
                  {isAr
                    ? `قصة ${activeCaseIdx + 1} من ${items.length}`
                    : `Story ${activeCaseIdx + 1} of ${items.length}`}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevCase}
                    className="p-2.5 rounded-lg bg-dark-850 border border-neutral-700 text-neutral-300 hover:text-white hover:border-gold-500 transition-colors cursor-pointer"
                    aria-label={isAr ? "القصة السابقة" : "Previous Story"}
                  >
                    <ChevronRight className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
                  </button>
                  <button
                    onClick={nextCase}
                    className="p-2.5 rounded-lg bg-dark-850 border border-neutral-700 text-neutral-300 hover:text-white hover:border-gold-500 transition-colors cursor-pointer"
                    aria-label={isAr ? "القصة التالية" : "Next Story"}
                  >
                    <ChevronLeft className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
