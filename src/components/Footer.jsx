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
  ShieldCheck,
  AlertCircle,
  X,
  Dumbbell,
  UserCheck,
  CreditCard,
  Building2,
  UserPlus,
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
    isWaitlist: false,
    error: null,
  });

  // وضعیت باز شدن باکس پیشنهاد لیست انتظار در صورت تکمیل ظرفیت
  const [waitlistPrompt, setWaitlistPrompt] = useState(null);

  const currentPlan = selectedBookings?.plan || null;
  const currentTrainer = selectedBookings?.trainer || null;
  const currentClass =
    selectedBookings?.classItem || selectedBookings?.class || null;

  const hasAnyBadge = Boolean(currentPlan || currentTrainer || currentClass);

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, phone: rawValue }));
  };

  const executeSubmission = async (joinWaitlist = false) => {
    setStatus({
      loading: true,
      success: false,
      isWaitlist: false,
      error: null,
    });

    if (formData.phone.trim().length < 7 || formData.phone.trim().length > 12) {
      setStatus({
        loading: false,
        success: false,
        isWaitlist: false,
        error: isAr
          ? "يرجى إدخال رقم هاتف صحيح مكوّن من 7 إلى 10 أرقام."
          : "Please enter a valid phone number (7 to 10 digits).",
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        fullPhoneNumber: `${formData.countryCode}${formData.phone}`,
        lang,
        joinWaitlist,
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
            ? currentClass.titleAr || currentClass.title || currentClass.titleEn
            : null,
          classId: currentClass?.id || null,
          classTime: currentClass?.time || null,
        },
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      // ۱. اگر ظرفیت کلاس تکمیل باشد
      if (result.status === "CLASS_FULL") {
        setWaitlistPrompt({
          message: isAr
            ? "عذراً، مقاعد هذه الحصة مكتملة حالياً بالكامل! هل تود الانضمام إلى قائمة الانتظار ليتم التواصل معك فور توفر مقعد؟"
            : "Sorry, this class is currently fully booked! Would you like to join the priority waitlist to be notified once a spot opens?",
        });
        setStatus({
          loading: false,
          success: false,
          isWaitlist: false,
          error: null,
        });
        return;
      }

      // ۲. بررسی خطاهای سیستمی دیگر
      if (!res.ok || result.success === false) {
        throw new Error(
          result.message ||
            (isAr
              ? "حدث خطأ أثناء إرسال البيانات. يرجى المحاولة لاحقاً."
              : "An error occurred while submitting. Please try again."),
        );
      }

      // ۳. ثبت با موفقیت (رزرو قطعی یا تایید ورود به لیست انتظار)
      setStatus({
        loading: false,
        success: true,
        isWaitlist: result.status === "WAITLIST_CONFIRMED",
        error: null,
      });

      setWaitlistPrompt(null);
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
      setStatus({
        loading: false,
        success: false,
        isWaitlist: false,
        error: err.message,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeSubmission(false);
  };

  return (
    <footer className="bg-dark-950 border-t border-neutral-800/80 relative overflow-hidden select-none pb-28 sm:pb-24">
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* فرم ثبت درخواست لید */}
      <section id="lead-capture" className="py-20 relative z-10 scroll-mt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-dark-900 to-dark-850 border border-neutral-800 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* تیتر ارتقایافته */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-800 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? "طلب اشتراك وتأكيد الحجز المبدئي"
                    : "Membership Request & Priority Booking"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {isAr
                  ? "ثبّت حجزك وابدأ تجربة التدريب الفاخرة"
                  : "Lock Your Reservation & Experience Elite Training"}
              </h2>
              <p className="mt-3 text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {isAr
                  ? "سجل بياناتك وسيصلك إشعار فوري وتواصل مباشر من إدارة الاشتراكات لتأكيد الموعد واستلام بطاقتك."
                  : "Fill in your details to secure your spot. Our concierge team will reach out directly on WhatsApp to finalize your onboarding."}
              </p>
            </div>

            {/* بج‌های گزینه‌های انتخاب شده */}
            {hasAnyBadge && (
              <div className="mb-8 p-4 rounded-2xl bg-dark-950/80 border border-gold-500/30 space-y-2.5">
                <div className="text-xs font-bold text-gold-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isAr
                      ? "تفاصيل طلبك المحجوز مبدئياً:"
                      : "Your Reserved Selections:"}
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

            {/* بخش وضعیت تایید فرم یا نمایش فیلدها */}
            {status.success ? (
              <div
                className={`p-8 rounded-2xl border text-center space-y-3 ${
                  status.isWaitlist
                    ? "bg-amber-950/40 border-amber-800"
                    : "bg-emerald-950/40 border-emerald-800"
                }`}
              >
                <CheckCircle2
                  className={`w-12 h-12 mx-auto animate-bounce ${
                    status.isWaitlist ? "text-amber-400" : "text-emerald-400"
                  }`}
                />
                <h3 className="text-lg font-bold text-white">
                  {status.isWaitlist
                    ? isAr
                      ? "تم تسجيلك في قائمة الانتظار بنجاح! ⏳"
                      : "Added to Priority Waitlist Successfully!"
                    : isAr
                      ? "تم تأكيد طلب الحجز المبدئي بنجاح!"
                      : "Reservation Request Received Successfully!"}
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                  {status.isWaitlist
                    ? isAr
                      ? "تم حفظ بياناتك في قائمة الانتظار لهذه الحصة. سيتم إشعارك فوراً عبر واتساب بمجرد توفر أي مقعد شاغر."
                      : "You are placed on the priority waitlist. We will notify you directly via WhatsApp as soon as an opening becomes available."
                    : isAr
                      ? "شكراً لاختيارك. تم إرسال تفاصيل اختياراتك مباشرة إلى الإدارة، وسيتواصل معك الموظف المختص عبر واتساب لتفعيل الاشتراك."
                      : "Thank you for registering. Your booking details have been submitted. Our concierge team will reach out via WhatsApp immediately."}
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

                {/* بنر تعاملی لیست انتظار هنگام پر بودن ظرفیت کلاس */}
                {waitlistPrompt && (
                  <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/50 space-y-3">
                    <div className="flex items-start gap-2.5 text-amber-300 text-xs leading-relaxed">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                      <span>{waitlistPrompt.message}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={status.loading}
                        onClick={() => executeSubmission(true)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-dark-950 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>
                          {isAr
                            ? "نعم، سجلني في قائمة الانتظار"
                            : "Yes, Join Waitlist"}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setWaitlistPrompt(null)}
                        className="px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-neutral-300 text-xs font-semibold transition cursor-pointer"
                      >
                        {isAr ? "إلغاء" : "Cancel"}
                      </button>
                    </div>
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

                {/* ردیف دوم: شماره تماس و انتخاب شعبه */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        onChange={handlePhoneChange}
                        maxLength={12}
                        className="w-full bg-dark-800/90 px-4 py-3.5 text-white text-sm focus:outline-none font-english tracking-wider"
                        dir="ltr"
                      />
                    </div>
                  </div>

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

                {/* دکمه ارسال (فقط وقتی نمایش داده می‌شود که بنر لیست انتظار باز نباشد) */}
                {!waitlistPrompt && (
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
                            ? "طلب اشتراك وتأكيد الحجز المبدئي"
                            : "Request Membership & Reserve Spot"}
                        </span>
                        <Send className="w-4 h-4 rtl:rotate-180 ltr:rotate-0" />
                      </>
                    )}
                  </button>
                )}

                <p className="text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>
                    {isAr
                      ? "بياناتك في أمان تام وتستخدم فقط لتأكيد اشتراكك المباشر مع النادي."
                      : "Your personal details are strictly private and used solely for club onboarding."}
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* بخش پایینی فوتر */}
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
                href={`https://wa.me/${clubData.brand?.whatsappNumber}?text=${encodeURIComponent(
                  isAr
                    ? clubData.brand?.defaultWaMessageAr || ""
                    : clubData.brand?.defaultWaMessageEn || "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-dark-950 font-bold transition-all text-xs"
              >
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
          </div>
        </div>
      </div>
    </footer>
  );
}
