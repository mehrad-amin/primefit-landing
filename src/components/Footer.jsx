"use client";

import { useState } from "react";
import { clubData } from "../config/clubData.js";
import {
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  AlertCircle,
  X,
  Dumbbell,
  UserCheck,
  CreditCard,
  Building2,
} from "lucide-react";

export default function Footer({
  lang = "ar",
  selectedBookings = {},
  onClearBooking,
}) {
  const isAr = lang === "ar";
  const defaultBranch = clubData.branches?.[0];

  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: clubData.countryPhoneCodes?.[0]?.dialCode || "+971",
    phone: "",
    goal: isAr ? "خسارة دهون وتنشيف" : "Fat Loss & Toning",
    selectedBranch: isAr
      ? defaultBranch?.nameAr || "الفرع الرئيسي"
      : defaultBranch?.nameEn || "Main Flagship",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const currentPlan = selectedBookings?.plan || null;
  const currentTrainer = selectedBookings?.trainer || null;
  const currentClass =
    selectedBookings?.classItem || selectedBookings?.class || null;

  const hasAnyBadge = Boolean(currentPlan || currentTrainer || currentClass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const payload = {
        ...formData,
        lang,
        bookings: {
          plan: currentPlan
            ? currentPlan.title || currentPlan.nameAr || currentPlan.nameEn
            : null,
          planPrice: currentPlan?.price || null,
          trainer: currentTrainer
            ? currentTrainer.title ||
              currentTrainer.nameAr ||
              currentTrainer.nameEn
            : null,
          classSession: currentClass
            ? currentClass.title || currentClass.titleAr || currentClass.titleEn
            : null,
          classTime: currentClass?.time || null,
        },
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(
          isAr
            ? "حدث خطأ أثناء إرسال البيانات. يرجى المحاولة لاحقاً."
            : "An error occurred while submitting. Please try again.",
        );
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({
        fullName: "",
        countryCode: clubData.countryPhoneCodes?.[0]?.dialCode || "+971",
        phone: "",
        goal: isAr ? "خسارة دهون وتنشيف" : "Fat Loss & Toning",
        selectedBranch: isAr
          ? defaultBranch?.nameAr || "الفرع الرئيسي"
          : defaultBranch?.nameEn || "Main Flagship",
      });

      if (onClearBooking) {
        onClearBooking("plan");
        onClearBooking("trainer");
        onClearBooking("classItem");
        onClearBooking("class");
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <footer className="bg-dark-950 border-t border-neutral-800/80 relative overflow-hidden select-none">
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* فرم دریافت لید */}
      <section id="lead-capture" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-dark-900 to-dark-850 border border-neutral-800 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* تیتر */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-800 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? "عرض تجربة اليوم الواحد المجاني"
                    : "Complimentary 1-Day Pass"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {isAr
                  ? "ابدأ رحلتك الرياضية اليوم مجاناً"
                  : "Start Your Fitness Journey Today"}
              </h2>
              <p className="mt-3 text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {isAr
                  ? "سجل بياناتك وسيتواصل معك فريق الاستقبال فوراً لتأكيد الحجز وتفعيل تصريح الدخول المجاني."
                  : "Register your details now and our concierge team will contact you to activate your VIP pass."}
              </p>
            </div>

            {/* بج‌های گزینه‌های انتخابی کاربر */}
            {hasAnyBadge && (
              <div className="mb-8 p-4 rounded-2xl bg-dark-950/80 border border-gold-500/30 space-y-2.5">
                <div className="text-xs font-bold text-gold-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isAr
                      ? "اختياراتك المحجوزة للمتابعة:"
                      : "Your Selected Reservations:"}
                  </span>
                </div>

                {currentPlan && (
                  <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-gold-400 shrink-0" />
                      <span className="px-2 py-0.5 rounded bg-gold-500 text-dark-950 text-[10px] font-black uppercase">
                        {isAr ? "الباقة" : "Plan"}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {currentPlan.title ||
                          currentPlan.nameAr ||
                          currentPlan.nameEn}
                      </span>
                      {currentPlan.price && (
                        <span className="text-gold-400 text-xs font-english">
                          ({currentPlan.price})
                        </span>
                      )}
                    </div>
                    {onClearBooking && (
                      <button
                        type="button"
                        onClick={() => onClearBooking("plan")}
                        className="p-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title={isAr ? "إزالة" : "Remove"}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {currentTrainer && (
                  <div className="p-3 rounded-xl bg-dark-850 border border-neutral-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <UserCheck className="w-4 h-4 text-neutral-300 shrink-0" />
                      <span className="px-2 py-0.5 rounded bg-neutral-200 text-dark-950 text-[10px] font-black uppercase">
                        {isAr ? "المدرب" : "Coach"}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {currentTrainer.title ||
                          currentTrainer.nameAr ||
                          currentTrainer.nameEn}
                      </span>
                    </div>
                    {onClearBooking && (
                      <button
                        type="button"
                        onClick={() => onClearBooking("trainer")}
                        className="p-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title={isAr ? "إزالة" : "Remove"}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {currentClass && (
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Dumbbell className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="px-2 py-0.5 rounded bg-purple-500 text-white text-[10px] font-black uppercase">
                        {isAr ? "الحصة" : "Class"}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {currentClass.title ||
                          currentClass.titleAr ||
                          currentClass.titleEn}
                      </span>
                      {currentClass.time && (
                        <span className="text-purple-300 text-xs font-english">
                          ({currentClass.time})
                        </span>
                      )}
                    </div>
                    {onClearBooking && (
                      <button
                        type="button"
                        onClick={() => {
                          onClearBooking("classItem");
                          onClearBooking("class");
                        }}
                        className="p-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title={isAr ? "إزالة" : "Remove"}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* بدنه فرم */}
            {status.success ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-white">
                  {isAr
                    ? "تم استلام طلبك بنجاح!"
                    : "Application Submitted Successfully!"}
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? "شكراً لتسجيلك. تم تحويل بياناتك وخياراتك إلى مكتب الاستقبال، وسيتم التواصل معك فوراً عبر واتساب لتسليمك تصريح الدخول."
                    : "Thank you! Your details and selections have been forwarded to our team. We will message you on WhatsApp shortly."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {status.error && (
                  <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                {/* ردیف اول: نام و هدف ورزشی */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1.5">
                      {isAr ? "الاسم الكريم *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? "محمد عبد الله" : "e.g. Alex Morgan"}
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-dark-800/90 border border-neutral-700 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1.5">
                      {isAr ? "الهدف الرياضي الأساسي *" : "Primary Goal *"}
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) =>
                        setFormData({ ...formData, goal: e.target.value })
                      }
                      className="w-full bg-dark-800/90 border border-neutral-700 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                    >
                      {isAr ? (
                        <>
                          <option value="خسارة دهون وتنشيف">
                            خسارة دهون ونحت القوام
                          </option>
                          <option value="بناء كتلة عضلية">
                            بناء كتلة عضلية وزيادة القوة
                          </option>
                          <option value="تحسين اللياقة العامة">
                            تحسين اللياقة والمرونة البدنية
                          </option>
                          <option value="تدريب خاص بالسيدات">
                            الاشتراك في قسم السيدات فقط
                          </option>
                          <option value="استشفاء وبيلاتس">
                            بيلاتس وتمارين الاستشفاء
                          </option>
                        </>
                      ) : (
                        <>
                          <option value="Fat Loss & Toning">
                            Fat Loss & Toning
                          </option>
                          <option value="Muscle Building & Strength">
                            Muscle Building & Strength
                          </option>
                          <option value="General Conditioning">
                            General Conditioning
                          </option>
                          <option value="Ladies-Only Facility">
                            Ladies-Only Facility Access
                          </option>
                          <option value="Pilates & Wellness">
                            Pilates & Wellness
                          </option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* ردیف دوم: شماره تماس و دراپ‌داون انتخاب شعبه */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* شماره تماس با کد کشور */}
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1.5">
                      {isAr
                        ? "رقم الجوال (واتساب) *"
                        : "WhatsApp Phone Number *"}
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-neutral-700 focus-within:border-gold-500 transition-colors">
                      <select
                        value={formData.countryCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            countryCode: e.target.value,
                          })
                        }
                        aria-label="Country Dial Code"
                        className="bg-dark-800 text-neutral-200 text-xs px-3 py-3.5 border-e border-neutral-700 focus:outline-none cursor-pointer font-english shrink-0"
                      >
                        {clubData.countryPhoneCodes?.map((c) => (
                          <option
                            key={c.code}
                            value={c.dialCode}
                            className="bg-dark-900 text-white"
                          >
                            {c.flag} {c.dialCode}
                          </option>
                        ))}
                      </select>

                      <input
                        type="tel"
                        required
                        placeholder="50 000 0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-dark-800/90 px-4 py-3.5 text-white text-sm focus:outline-none font-english tracking-wider"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* فیلد انتخاب شعبه (Target Branch) */}
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1.5">
                      {isAr
                        ? "الفرع الأقرب لك أو المطلوب *"
                        : "Target Branch Selection *"}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.selectedBranch}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            selectedBranch: e.target.value,
                          })
                        }
                        className="w-full bg-dark-800/90 border border-neutral-700 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors cursor-pointer appearance-none pe-10"
                      >
                        {clubData.branches?.map((branch) => (
                          <option
                            key={branch.id}
                            value={isAr ? branch.nameAr : branch.nameEn}
                            className="bg-dark-900 text-white"
                          >
                            {isAr ? branch.nameAr : branch.nameEn}
                          </option>
                        ))}
                      </select>
                      <div className="absolute top-1/2 end-3.5 -translate-y-1/2 pointer-events-none text-neutral-400">
                        <Building2 className="w-4 h-4 text-gold-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* دکمه ارسال */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold text-dark-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:brightness-110 active:scale-98 transition-all duration-200 shadow-xl shadow-gold-500/20 cursor-pointer disabled:opacity-50"
                >
                  {status.loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>
                        {isAr
                          ? "تأكيد وحجز تصريح اليوم المجاني"
                          : "Claim Free 1-Day Pass"}
                      </span>
                      <Send className="w-4 h-4 rtl:rotate-180 ltr:rotate-0" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>
                    {isAr
                      ? "بياناتك في أمان تام ولا نشارك أرقام الاتصال مع أي جهة خارجية إطلاقاً."
                      : "Your personal information is 100% confidential and secure."}
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* پایین فوتر */}
      <div className="border-t border-neutral-800/80 py-16 text-neutral-400 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-950 font-black text-lg">
                  PF
                </div>
                <span className="font-extrabold text-base text-white">
                  {isAr ? clubData.brand?.nameAr : clubData.brand?.name}
                </span>
              </div>
              <p className="text-neutral-400 leading-relaxed text-xs">
                {isAr ? clubData.brand?.sloganAr : clubData.brand?.slogan} -{" "}
                {isAr
                  ? "البيئة التدريبية المتكاملة والمصممة لتمنحك نتائج حقيقية وأعلى معايير الخصوصية والرفاهية."
                  : "Engineered for exceptional athletic performance, privacy, and results."}
              </p>

              <div className="flex items-center gap-3 pt-2">
                {clubData.socials?.instagram && (
                  <a
                    href={clubData.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-xl bg-dark-850 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}

                {clubData.socials?.tiktok && (
                  <a
                    href={clubData.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="w-9 h-9 rounded-xl bg-dark-850 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.45 6.27 6.27 0 0 0 1.88-4.47V8.58a8.28 8.28 0 0 0 4.85 1.56V6.69z" />
                    </svg>
                  </a>
                )}

                {clubData.socials?.snapchat && (
                  <a
                    href={clubData.socials.snapchat}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Snapchat"
                    className="w-9 h-9 rounded-xl bg-dark-850 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.003 2c-3.486 0-6.143 2.584-6.143 5.999 0 .68.148 1.487.354 2.152.091.293.18.577.165.733-.042.44-.457.653-.872.868-.458.238-.973.504-.973 1.05 0 .426.312.753.843.905.748.214 1.428.09 2.052-.027.348-.065.732-.137 1.135.08.414.225.592.594.673.997.098.49.02.946-.226 1.341-.304.49-.785.836-1.324 1.096-.28.134-.582.261-.837.42-.32.2-.497.45-.497.778 0 .546.54.914 1.254 1.07.607.133 1.353.151 2.221.053.472-.053.94-.176 1.455-.176.438 0 .84.093 1.233.284.453.22.955.597 1.543.597.587 0 1.089-.377 1.542-.597.393-.19.795-.284 1.233-.284.515 0 .983.123 1.455.176.868.098 1.614.08 2.221-.053.714-.156 1.254-.524 1.254-1.07 0-.328-.177-.578-.497-.778-.255-.159-.557-.286-.837-.42-.539-.26-1.02-.606-1.324-1.096-.246-.395-.324-.851-.226-1.341.081-.403.259-.772.673-.997.403-.217.787-.145 1.135-.08.624.117 1.304.241 2.052.027.531-.152.843-.479.843-.905 0-.546-.515-.812-.973-1.05-.415-.215-.83-.428-.872-.868-.015-.156.074-.44.165-.733.206-.665.354-1.472.354-2.152 0-3.415-2.657-5.999-6.143-5.999z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>{isAr ? "أوقات العمل الرسمية" : "Operating Hours"}</span>
              </h4>
              <p className="text-neutral-300 leading-relaxed text-xs">
                {isAr
                  ? clubData.brand?.workingHoursAr
                  : clubData.brand?.workingHoursEn}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>{isAr ? "الموقع والعنوان" : "Club Location"}</span>
              </h4>
              <p className="text-neutral-300 leading-relaxed text-xs">
                {isAr
                  ? clubData.brand?.locationAddressAr
                  : clubData.brand?.locationAddress}
              </p>
              <div className="pt-1 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span className="font-english text-neutral-200">
                  {clubData.brand?.phone}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {/* آیکون برداری رسمی واتساپ در تیتر */}
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="24" r="24" fill="#25D366" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M34.6 13.4C31.8 10.6 28.1 9 24.1 9C15.8 9 9.1 15.7 9.1 24C9.1 26.6 9.8 29.2 11.1 31.5L9 39L16.8 36.9C19 38.1 21.5 38.8 24.1 38.8H24.1C32.4 38.8 39.1 32.1 39.1 23.8C39.1 19.8 37.5 16.2 34.6 13.4ZM24.1 36.3C21.9 36.3 19.7 35.7 17.8 34.6L17.3 34.3L12.7 35.5L13.9 31L13.6 30.5C12.4 28.6 11.7 26.3 11.7 24C11.7 17.2 17.3 11.6 24.1 11.6C27.4 11.6 30.5 12.9 32.8 15.2C35.1 17.5 36.4 20.6 36.4 23.9C36.4 30.7 30.9 36.3 24.1 36.3ZM30.9 27.2C30.5 27 28.7 26.1 28.4 26C28.1 25.9 27.8 25.8 27.6 26.2C27.3 26.6 26.6 27.4 26.4 27.7C26.2 27.9 26 28 25.6 27.8C25.2 27.6 24.1 27.2 22.7 26C21.6 25 20.9 23.8 20.7 23.4C20.5 23 20.7 22.8 20.9 22.6C21.1 22.4 21.3 22.1 21.5 21.9C21.7 21.7 21.8 21.5 21.9 21.3C22 21.1 22 20.9 21.9 20.7C21.8 20.5 21.1 18.9 20.9 18.2C20.6 17.5 20.3 17.6 20.1 17.6H19.5C19.3 17.6 18.9 17.7 18.6 18C18.3 18.3 17.4 19.1 17.4 20.8C17.4 22.5 18.6 24.1 18.8 24.3C19 24.5 21.3 28.1 24.8 29.6C25.6 30 26.3 30.2 26.8 30.4C27.7 30.7 28.5 30.6 29.1 30.5C29.8 30.4 31.2 29.6 31.5 28.8C31.8 28 31.8 27.3 31.7 27.2C31.6 27.3 31.3 27.4 30.9 27.2Z"
                    fill="#FFFFFF"
                  />
                </svg>
                <span>
                  {isAr ? "خدمة الأعضاء الفورية" : "Instant Concierge"}
                </span>
              </h4>

              <p className="text-neutral-400 leading-relaxed text-xs">
                {isAr
                  ? "تفضل بمحادثتنا مباشرة للحصول على رد فوري وتأكيد الحجز."
                  : "Chat with our membership consultants directly via WhatsApp."}
              </p>

              <a
                href={`https://wa.me/${clubData.brand?.whatsappNumber}?text=${encodeURIComponent(isAr ? clubData.brand?.defaultWaMessageAr || "" : clubData.brand?.defaultWaMessageEn || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-dark-950 font-bold transition-all text-xs group"
              >
                {/* لوگوی رسمی دو لایه درون دکمه با افکت تغییر حالت (Hover) */}
                <svg
                  className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform duration-200"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="24" r="24" fill="#25D366" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M34.6 13.4C31.8 10.6 28.1 9 24.1 9C15.8 9 9.1 15.7 9.1 24C9.1 26.6 9.8 29.2 11.1 31.5L9 39L16.8 36.9C19 38.1 21.5 38.8 24.1 38.8H24.1C32.4 38.8 39.1 32.1 39.1 23.8C39.1 19.8 37.5 16.2 34.6 13.4ZM24.1 36.3C21.9 36.3 19.7 35.7 17.8 34.6L17.3 34.3L12.7 35.5L13.9 31L13.6 30.5C12.4 28.6 11.7 26.3 11.7 24C11.7 17.2 17.3 11.6 24.1 11.6C27.4 11.6 30.5 12.9 32.8 15.2C35.1 17.5 36.4 20.6 36.4 23.9C36.4 30.7 30.9 36.3 24.1 36.3ZM30.9 27.2C30.5 27 28.7 26.1 28.4 26C28.1 25.9 27.8 25.8 27.6 26.2C27.3 26.6 26.6 27.4 26.4 27.7C26.2 27.9 26 28 25.6 27.8C25.2 27.6 24.1 27.2 22.7 26C21.6 25 20.9 23.8 20.7 23.4C20.5 23 20.7 22.8 20.9 22.6C21.1 22.4 21.3 22.1 21.5 21.9C21.7 21.7 21.8 21.5 21.9 21.3C22 21.1 22 20.9 21.9 20.7C21.8 20.5 21.1 18.9 20.9 18.2C20.6 17.5 20.3 17.6 20.1 17.6H19.5C19.3 17.6 18.9 17.7 18.6 18C18.3 18.3 17.4 19.1 17.4 20.8C17.4 22.5 18.6 24.1 18.8 24.3C19 24.5 21.3 28.1 24.8 29.6C25.6 30 26.3 30.2 26.8 30.4C27.7 30.7 28.5 30.6 29.1 30.5C29.8 30.4 31.2 29.6 31.5 28.8C31.8 28 31.8 27.3 31.7 27.2C31.6 27.3 31.3 27.4 30.9 27.2Z"
                    fill="#FFFFFF"
                  />
                </svg>
                <span>
                  {isAr ? "بدء محادثة واتساب الآن" : "Start WhatsApp Chat"}
                </span>
              </a>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>
              © {new Date().getFullYear()}{" "}
              {isAr ? clubData.brand?.nameAr : clubData.brand?.name}.{" "}
              {isAr ? "جميع الحقوق محفوظة." : "All Rights Reserved."}
            </p>
            <div className="flex gap-4 text-neutral-400">
              <a href="#" className="hover:text-gold-400 transition-colors">
                {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
              <a href="#" className="hover:text-gold-400 transition-colors">
                {isAr ? "الشروط والأحكام" : "Terms of Service"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
