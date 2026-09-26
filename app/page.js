"use client";

import { useState, useEffect } from "react";
import { clubData } from "../src/config/clubData.js";

import Facilities from "@/src/components/Facilities.jsx";
import TransformationsSlider from "@/src/components/TransformationsSlider.jsx";
import Faq from "@/src/components/Faq.jsx";
import Trainers from "@/src/components/Trainers.jsx";
import Testimonials from "@/src/components/Testimonials.jsx";
import Schedule from "@/src/components/Schedule.jsx";
import Recovery from "@/src/components/Recovery.jsx";
import FitnessCalculator from "@/src/components/FitnessCalculator.jsx";
import FloatingWhatsApp from "@/src/components/FloatingWhatsApp.jsx";
import Footer from "@/src/components/Footer.jsx";
import Header from "@/src/components/Header.jsx";
import Hero from "@/src/components/Hero.jsx";
import Pricing from "@/src/components/Pricing.jsx";
import StickyBookingBar from "@/src/components/StickyBookingBar.jsx";

export default function HomePage() {
  const [lang, setLang] = useState("ar");
  const [currency, setCurrency] = useState(
    clubData.activeCurrencyCode || "USD",
  );

  // استیت متمرکز رزروها
  const [selectedBookings, setSelectedBookings] = useState({
    plan: null,
    trainer: null,
    classItem: null,
  });

  useEffect(() => {
    const isRtl = lang === "ar";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const handleProceedToForm = () => {
    const el = document.getElementById("lead-capture");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const hasActiveBooking = Boolean(
    selectedBookings.plan ||
    selectedBookings.trainer ||
    selectedBookings.classItem,
  );

  const handleSelectPlan = (plan) => {
    setSelectedBookings((prev) => ({ ...prev, plan }));
  };

  // انتخاب مربی به صورت دستی
  const handleSelectTrainer = (trainer) => {
    setSelectedBookings((prev) => ({ ...prev, trainer }));
  };

  // انتخاب کلاس + همگام‌سازی خودکار مربی مربوط به همان کلاس
  const handleSelectClass = (classItem) => {
    if (!classItem) {
      setSelectedBookings((prev) => ({ ...prev, classItem: null }));
      return;
    }

    // استخراج نام مربی کلاس بر اساس کلیدهای موجود
    const trainerName =
      lang === "ar"
        ? classItem.trainerAr || classItem.trainer || classItem.trainerEn
        : classItem.trainerEn || classItem.trainer || classItem.trainerAr;

    // جستجوی مربی متناظر از دیتابیس کلاب جهت ست کردن دیتا با ساختار استاندارد
    const matchedTrainer = clubData.trainers?.items?.find((t) => {
      const matchNameAr =
        t.nameAr &&
        classItem.trainerAr &&
        t.nameAr.includes(classItem.trainerAr);
      const matchNameEn =
        t.nameEn &&
        classItem.trainerEn &&
        t.nameEn.toLowerCase().includes(classItem.trainerEn.toLowerCase());
      const matchGeneral =
        t.name && (t.name === classItem.trainer || t.name === trainerName);
      return matchNameAr || matchNameEn || matchGeneral;
    });

    const syncedTrainer = matchedTrainer
      ? {
          id: matchedTrainer.id,
          title:
            lang === "ar"
              ? matchedTrainer.nameAr || matchedTrainer.name
              : matchedTrainer.nameEn || matchedTrainer.name,
          role:
            lang === "ar"
              ? matchedTrainer.roleAr || matchedTrainer.role
              : matchedTrainer.roleEn || matchedTrainer.role,
        }
      : {
          id: `class-trainer-${classItem.id}`,
          title:
            trainerName || (lang === "ar" ? "مدرب الحصة" : "Class Trainer"),
          role: lang === "ar" ? "مدرب الحصة المحددة" : "Selected Class Trainer",
        };

    setSelectedBookings((prev) => ({
      ...prev,
      classItem,
      trainer: syncedTrainer,
    }));
  };

  const handleClearBooking = (type) => {
    setSelectedBookings((prev) => {
      // اگر کلاس لغو شد، مربی متصل به آن را نیز پاک می‌کنیم تا کاربر آزادانه انتخاب کند
      if (type === "classItem") {
        return { ...prev, classItem: null, trainer: null };
      }
      return { ...prev, [type]: null };
    });
  };

  return (
    <main className="min-h-screen bg-dark-950 text-neutral-100 flex flex-col relative">
      <Header
        lang={lang}
        onLanguageChange={setLang}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
      />
      <Hero lang={lang} />
      <Facilities lang={lang} />
      <Recovery lang={lang} />
      <TransformationsSlider lang={lang} />
      <FitnessCalculator lang={lang} />

      {/* اتصال کلاس‌ها همراه با ارسال کلاس انتخاب‌شده جهت هایلایت و بررسی */}
      <Schedule
        lang={lang}
        selectedClass={selectedBookings.classItem}
        onSelectClass={handleSelectClass}
        onClearClass={() => handleClearBooking("classItem")}
      />

      {/* اتصال مربیان با پشتیبانی از کادر زرد، قفل بودن و دکمه لغو */}
      <Trainers
        lang={lang}
        selectedTrainer={selectedBookings.trainer}
        selectedClass={selectedBookings.classItem}
        onSelectTrainer={handleSelectTrainer}
        onClearTrainer={() => handleClearBooking("classItem")}
      />

      <Testimonials lang={lang} />

      <Pricing
        lang={lang}
        currentCurrency={currency}
        onSelectPlan={handleSelectPlan}
      />

      <Faq lang={lang} />

      <Footer
        lang={lang}
        selectedBookings={selectedBookings}
        onClearBooking={handleClearBooking}
      />

      <StickyBookingBar
        lang={lang}
        selectedBookings={selectedBookings}
        onClearBooking={handleClearBooking}
        onProceedToForm={handleProceedToForm}
      />

      <FloatingWhatsApp lang={lang} hasActiveBar={hasActiveBooking} />
    </main>
  );
}
