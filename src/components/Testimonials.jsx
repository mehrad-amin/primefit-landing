"use client";

import { useState, useEffect } from "react";
import { clubData } from "../config/clubData.js";
import {
  Star,
  ShieldCheck,
  Sparkles,
  Quote,
  ChevronRight,
  ChevronLeft,
  MapPin,
} from "lucide-react";

export default function Testimonials({ lang = "ar" }) {
  const isAr = lang === "ar";
  const { testimonials } = clubData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const reviews = testimonials?.reviews || [];

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  if (!testimonials || reviews.length === 0) return null;

  const maxIndex = Math.max(0, reviews.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const stepPercentage = 100 / visibleCount;

  return (
    <section
      id="testimonials"
      className="py-24 bg-dark-900 border-t border-neutral-800/80 relative overflow-hidden select-none"
    >
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* تیتر بخش */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-850 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? testimonials.badgeAr : testimonials.badgeEn}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? testimonials.titleAr : testimonials.titleEn}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {isAr ? testimonials.subtitleAr : testimonials.subtitleEn}
          </p>
        </div>

        {/* بج ریتینگ گوگل */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-dark-850 border border-neutral-800 shadow-lg">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white font-english">
              4.9 / 5.0
            </span>
            <span className="text-xs text-neutral-400 border-s border-neutral-700 ps-3">
              {isAr
                ? testimonials.googleRatingTextAr
                : testimonials.googleRatingTextEn}
            </span>
          </div>
        </div>

        {/* کانتینر کاروسل بدون فضای خالی */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${
                  isAr
                    ? currentIndex * stepPercentage
                    : -currentIndex * stepPercentage
                }%)`,
              }}
            >
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 p-3"
                >
                  <div className="h-full bg-dark-850/90 border border-neutral-800/90 hover:border-gold-500/40 rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-gold-400 fill-gold-400"
                            />
                          ))}
                        </div>
                        <Quote className="w-5 h-5 text-neutral-700" />
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic min-h-[85px]">
                        "{isAr ? rev.reviewTextAr : rev.reviewTextEn}"
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-neutral-800">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {isAr ? rev.authorAr : rev.authorEn}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-neutral-400">
                            <span className="text-gold-400 font-medium">
                              {isAr
                                ? rev.membershipTierAr
                                : rev.membershipTierEn}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-neutral-400">
                              <MapPin className="w-3 h-3 text-neutral-500" />
                              {isAr ? rev.locationAr : rev.locationEn}
                            </span>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-accent-emerald text-[10px] font-semibold shrink-0">
                          <ShieldCheck className="w-3 h-3" />
                          <span>
                            {isAr ? rev.memberSinceAr : rev.memberSinceEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* نوار کنترل کاروسل */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-6 bg-gold-500"
                      : "w-2 bg-neutral-800 hover:bg-neutral-700"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="p-2.5 rounded-xl bg-dark-850 border border-neutral-800 hover:border-gold-500/50 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label={isAr ? "الرأي السابق" : "Previous review"}
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="p-2.5 rounded-xl bg-dark-850 border border-neutral-800 hover:border-gold-500/50 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label={isAr ? "الرأي التالي" : "Next review"}
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* دکمه CTA پایین کاروسل */}
        <div className="mt-12 text-center">
          <a
            href="#lead-capture"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-dark-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 transition-all shadow-lg shadow-gold-500/20"
          >
            {isAr ? testimonials.ctaAr : testimonials.ctaEn}
          </a>
        </div>
      </div>
    </section>
  );
}
