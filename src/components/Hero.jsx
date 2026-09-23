import { clubData } from "../config/clubData.js";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export default function Hero({ lang = "ar" }) {
  const isAr = lang === "ar";
  const { hero } = clubData.brand;

  const defaultWaMsg = isAr
    ? clubData.brand.defaultWaMessageAr
    : clubData.brand.defaultWaMessageEn;

  const waUrl = `https://wa.me/${clubData.brand.whatsappNumber}?text=${encodeURIComponent(defaultWaMsg)}`;

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-dark-950">
      {/* پس‌زمینه سینمایی ویدیویی با اورلی دارک */}
      {/* پس‌زمینه بهینه‌شده برای وضوح بالا در موبایل */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* ۱. نسخه موبایل */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster-mobile.png"
          className="md:hidden absolute inset-0 w-full h-full object-cover object-center opacity-85 contrast-105"
        >
          <source src="/hero-video-1.mp4" type="video/mp4" />
        </video>

        {/* ۲. نسخه دسکتاپ */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/poster.png"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center opacity-65"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* لایه گرادیان بسیار سبک (بدون تیرگی در مرکز صفحه) */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-transparent to-dark-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* برچسب اعتبار */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-850/90 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-gold-500/5 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
          <span>{isAr ? hero.badgeAr : hero.badgeEn}</span>
        </div>

        {/* تیتر اصلی دو زبانه */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto">
          {isAr ? hero.titlePart1Ar : hero.titlePart1En}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-amber-200">
            {isAr ? clubData.brand.nameAr : clubData.brand.name}
          </span>
        </h1>

        {/* زیرتیتر توضیحی */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {isAr ? hero.descAr : hero.descEn}
        </p>

        {/* دکمه‌های دوتایی CTA با عرض و ارتفاع هم‌اندازه */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto w-full items-stretch">
          {/* دکمه ۱: دریافت تصريح روز رایگان */}
          <a
            href="#lead-capture"
            className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm md:text-base font-bold text-dark-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-xl shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center whitespace-nowrap"
          >
            <span>{isAr ? hero.ctaPrimaryAr : hero.ctaPrimaryEn}</span>
            {isAr ? (
              <ArrowLeft className="w-5 h-5 shrink-0" />
            ) : (
              <ArrowRight className="w-5 h-5 shrink-0" />
            )}
          </a>

          {/* دکمه ۲: واتساپ مستقیم */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-sm md:text-base font-bold text-white bg-dark-850/90 border border-neutral-700 hover:border-[#25D366]/60 hover:bg-dark-800 hover:text-emerald-400 shadow-lg shadow-black/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center whitespace-nowrap group"
          >
            {/* لوگوی رسمی دو لایه WhatsApp */}
            <svg
              className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform duration-200 drop-shadow-[0_2px_8px_rgba(37,211,102,0.3)]"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* دایره سبز رسمی برند */}
              <circle cx="24" cy="24" r="24" fill="#25D366" />

              {/* بالون گفتگو و گوشی سفید رسمی */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.6 13.4C31.8 10.6 28.1 9 24.1 9C15.8 9 9.1 15.7 9.1 24C9.1 26.6 9.8 29.2 11.1 31.5L9 39L16.8 36.9C19 38.1 21.5 38.8 24.1 38.8H24.1C32.4 38.8 39.1 32.1 39.1 23.8C39.1 19.8 37.5 16.2 34.6 13.4ZM24.1 36.3C21.9 36.3 19.7 35.7 17.8 34.6L17.3 34.3L12.7 35.5L13.9 31L13.6 30.5C12.4 28.6 11.7 26.3 11.7 24C11.7 17.2 17.3 11.6 24.1 11.6C27.4 11.6 30.5 12.9 32.8 15.2C35.1 17.5 36.4 20.6 36.4 23.9C36.4 30.7 30.9 36.3 24.1 36.3ZM30.9 27.2C30.5 27 28.7 26.1 28.4 26C28.1 25.9 27.8 25.8 27.6 26.2C27.3 26.6 26.6 27.4 26.4 27.7C26.2 27.9 26 28 25.6 27.8C25.2 27.6 24.1 27.2 22.7 26C21.6 25 20.9 23.8 20.7 23.4C20.5 23 20.7 22.8 20.9 22.6C21.1 22.4 21.3 22.1 21.5 21.9C21.7 21.7 21.8 21.5 21.9 21.3C22 21.1 22 20.9 21.9 20.7C21.8 20.5 21.1 18.9 20.9 18.2C20.6 17.5 20.3 17.6 20.1 17.6H19.5C19.3 17.6 18.9 17.7 18.6 18C18.3 18.3 17.4 19.1 17.4 20.8C17.4 22.5 18.6 24.1 18.8 24.3C19 24.5 21.3 28.1 24.8 29.6C25.6 30 26.3 30.2 26.8 30.4C27.7 30.7 28.5 30.6 29.1 30.5C29.8 30.4 31.2 29.6 31.5 28.8C31.8 28 31.8 27.3 31.7 27.2C31.6 27.3 31.3 27.4 30.9 27.2Z"
                fill="#FFFFFF"
              />
            </svg>
            <span>{isAr ? hero.ctaSecondaryAr : hero.ctaSecondaryEn}</span>
          </a>
        </div>

        {/* آمار سریع زیر دکمه‌ها */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {clubData.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-black text-white font-english">
                {stat.value}
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">
                {isAr ? stat.labelAr : stat.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
