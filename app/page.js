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

export default function HomePage() {
  const [lang, setLang] = useState("ar");
  const [currency, setCurrency] = useState(
    clubData.activeCurrencyCode || "USD",
  );

  // استیت متمرکز برای ۳ انتخاب همزمان
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

  // اسکرول نرم به فرم بعد از انتخاب
  const scrollToForm = () => {
    setTimeout(() => {
      const el = document.getElementById("lead-capture");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSelectPlan = (plan) => {
    setSelectedBookings((prev) => ({ ...prev, plan }));
    scrollToForm();
  };

  const handleSelectTrainer = (trainer) => {
    setSelectedBookings((prev) => ({ ...prev, trainer }));
    scrollToForm();
  };

  const handleSelectClass = (classItem) => {
    setSelectedBookings((prev) => ({ ...prev, classItem }));
    scrollToForm();
  };

  const handleClearBooking = (type) => {
    setSelectedBookings((prev) => ({ ...prev, [type]: null }));
  };

  return (
    <main className="min-h-screen bg-dark-950 text-neutral-100 flex flex-col">
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

      {/* اتصال کلاس‌ها */}
      <Schedule lang={lang} onSelectClass={handleSelectClass} />

      {/* اتصال مربیان */}
      <Trainers lang={lang} onSelectTrainer={handleSelectTrainer} />

      <Testimonials lang={lang} />

      {/* اتصال پلن‌ها */}
      <Pricing
        lang={lang}
        currentCurrency={currency}
        onSelectPlan={handleSelectPlan}
      />

      <Faq lang={lang} />

      {/* فرم با بج‌های فعال */}
      <Footer
        lang={lang}
        selectedBookings={selectedBookings}
        onClearBooking={handleClearBooking}
      />

      <FloatingWhatsApp lang={lang} />
    </main>
  );
}
