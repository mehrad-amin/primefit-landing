"use client";

import { useState, useEffect } from "react";
import { clubData } from "../config/clubData.js";
import { Menu, X, Sparkles, Globe } from "lucide-react";

export default function Header({
  currentCurrency,
  onCurrencyChange,
  lang = "ar",
  onLanguageChange,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAr = lang === "ar";

  const navLinks = [
    { label: isAr ? "المميزات" : "Features", href: "#features", show: true },
    {
      label: isAr ? "المرافق والخصوصية" : "Facilities",
      href: "#facilities",
      show: true,
    },
    {
      label: isAr ? "التحولات" : "Results",
      href: "#transformations",
      show: clubData.features.showTransformations,
    },
    {
      label: isAr ? "الجدول التدريبي" : "Schedule",
      href: "#schedule",
      show: clubData.features.showSchedule,
    },
    {
      label: isAr ? "المدربين" : "Coaches",
      href: "#trainers",
      show: clubData.features.showTrainers,
    },
    {
      label: isAr ? "خطط العضوية" : "Membership",
      href: "#pricing",
      show: clubData.features.showPricing,
    },
    {
      label: isAr ? "حاسبة اللياقة" : "Calculator",
      href: "#calculator",
      show: clubData.features.showCalculator,
    },
  ].filter((item) => item.show);

  const toggleLanguage = () => {
    const newLang = isAr ? "en" : "ar";
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-950/85 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* لوگوتایپ برند */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-950 font-extrabold text-xl shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
              PF
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-gold-400 transition-colors">
                {isAr ? clubData.brand.nameAr : clubData.brand.name}
              </span>
              <span className="text-[10px] text-neutral-400 tracking-wider font-english uppercase">
                {isAr ? clubData.brand.sloganAr : clubData.brand.slogan}
              </span>
            </div>
          </a>

          {/* لینک‌های ناوبری دسکتاپ */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm font-medium text-neutral-300 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* اکشن‌ها: سوئیچر زبان + سلکتور ارز + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* دکمه سوئیچ زبان */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-850 border border-neutral-800 text-neutral-300 hover:text-gold-400 hover:border-neutral-700 text-xs font-bold transition-all cursor-pointer"
              title={isAr ? "Switch to English" : "التحويل إلى العربية"}
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span className="font-english uppercase">
                {isAr ? "EN" : "عربي"}
              </span>
            </button>

            {/* سوئیچر ارز */}
            {onCurrencyChange && (
              <div className="relative">
                <select
                  value={currentCurrency}
                  onChange={(e) => onCurrencyChange(e.target.value)}
                  aria-label="Currency"
                  className="bg-dark-850/90 text-xs font-semibold text-neutral-200 border border-neutral-800 rounded-lg py-2 ps-3 pe-6 focus:outline-none focus:border-gold-500 cursor-pointer appearance-none"
                >
                  {Object.keys(clubData.currencies).map((cCode) => (
                    <option
                      key={cCode}
                      value={cCode}
                      className="bg-dark-900 text-white"
                    >
                      {cCode} (
                      {isAr
                        ? clubData.currencies[cCode].symbolAr
                        : clubData.currencies[cCode].symbolEn}
                      )
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 end-2 flex items-center text-neutral-400 text-[9px]">
                  ▼
                </div>
              </div>
            )}

            {/* دکمه رزرو روز رایگان */}
            <a
              href="#lead-capture"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-bold text-dark-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-xl shadow-lg shadow-gold-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 me-1.5" />
              <span>{isAr ? "احجز تجربة مجانية" : "Free Day Pass"}</span>
            </a>
          </div>

          {/* دکمه موبایل */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-dark-850 border border-neutral-800 text-neutral-300 text-xs font-bold font-english uppercase"
            >
              {isAr ? "EN" : "عربي"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-850 border border-neutral-800 text-neutral-300"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* بازشونده موبایل */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-dark-900/95 border border-neutral-800 shadow-2xl space-y-3 backdrop-blur-xl">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-300 hover:bg-dark-800 hover:text-gold-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
              {onCurrencyChange && (
                <select
                  value={currentCurrency}
                  onChange={(e) => onCurrencyChange(e.target.value)}
                  className="bg-dark-850 text-xs text-neutral-200 border border-neutral-700 rounded-lg p-2"
                >
                  {Object.keys(clubData.currencies).map((cCode) => (
                    <option key={cCode} value={cCode}>
                      {cCode} (
                      {isAr
                        ? clubData.currencies[cCode].symbolAr
                        : clubData.currencies[cCode].symbolEn}
                      )
                    </option>
                  ))}
                </select>
              )}

              <a
                href="#lead-capture"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-xs font-bold text-dark-950 bg-gold-500 rounded-lg"
              >
                {isAr ? "احجز تجربة مجانية" : "Free Day Pass"}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
