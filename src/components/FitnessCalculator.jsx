"use client";

import { useState, useEffect } from "react";
import { clubData } from "../config/clubData.js";
import {
  Calculator,
  Flame,
  Scale,
  Dumbbell,
  Sparkles,
  Utensils,
  CalendarCheck,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";

export default function FitnessCalculator({
  lang = "ar",
  onSelectClassFromCalc,
}) {
  const isAr = lang === "ar";
  const showCalculator = Boolean(clubData.features?.showCalculator);
  const calcData = clubData.calculator || {};

  const initialClasses = clubData.schedule?.classes || [];
  const [classesList, setClassesList] = useState(initialClasses);

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(24);
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(72);
  const [activity, setActivity] = useState(
    calcData.activityLevels?.[2]?.value || "1.55",
  );
  const [goal, setGoal] = useState("bulk");
  const [dietCommitment, setDietCommitment] = useState(
    calcData.dietOptions?.[0]?.id || "pro",
  );
  const [selectedClassId, setSelectedClassId] = useState("");
  const [result, setResult] = useState(null);

  // واکشی لایو کلاس‌ها از روت سرور
  useEffect(() => {
    let isMounted = true;
    async function loadLiveClasses() {
      try {
        const res = await fetch("/api/schedule");
        if (res.ok) {
          const data = await res.json();
          if (
            Array.isArray(data.classes) &&
            data.classes.length > 0 &&
            isMounted
          ) {
            setClassesList(data.classes);
            if (!selectedClassId) {
              setSelectedClassId(data.classes[0].id || "1");
            }
          }
        }
      } catch (err) {
        console.error("Failed to load live schedule for calculator:", err);
      }
    }

    loadLiveClasses();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedClassId && classesList.length > 0) {
      setSelectedClassId(classesList[0].id || "1");
    }
  }, [classesList, selectedClassId]);

  if (!showCalculator) return null;

  // ضرایب فیزیولوژیک بر اساس نوع کلاس ورزشی
  const getClassMultipliers = (classItem) => {
    if (!classItem) {
      return {
        muscle: 1.0,
        burn: 1.0,
        typeLabel: isAr
          ? calcData.generalTagAr || "تمارين شاملة لرفع اللياقة البدنية والتحمل"
          : calcData.generalTagEn ||
            "General physical conditioning & functional fitness",
      };
    }

    const titleToCheck = (
      classItem.title ||
      classItem.titleAr ||
      classItem.titleEn ||
      ""
    ).toLowerCase();

    // ۱. تمرینات قدرتی و هایپرتروفی
    if (
      titleToCheck.includes("بدنسازی") ||
      titleToCheck.includes("حديد") ||
      titleToCheck.includes("أثقال") ||
      titleToCheck.includes("body") ||
      titleToCheck.includes("strength") ||
      titleToCheck.includes("weight")
    ) {
      return {
        muscle: 1.35,
        burn: 1.05,
        typeLabel: isAr
          ? calcData.strengthTagAr ||
            "تركيز فائق على التضخيم العضلي وزيادة القوة (Hypertrophy)"
          : calcData.strengthTagEn ||
            "High-focus on hypertrophy & mechanical tension",
      };
    }

    // ۲. تمرینات کراس‌فیت و اینتروال متابولیک
    if (
      titleToCheck.includes("کراس") ||
      titleToCheck.includes("كروس") ||
      titleToCheck.includes("crossfit") ||
      titleToCheck.includes("hiit") ||
      titleToCheck.includes("سرعة") ||
      titleToCheck.includes("cardio")
    ) {
      return {
        muscle: 0.95,
        burn: 1.45,
        typeLabel: isAr
          ? calcData.cardioTagAr ||
            "تركيز عالي على حرق الدهون ورفع اللياقة اللاهوائية (HIIT)"
          : calcData.cardioTagEn ||
            "Maximum metabolic conditioning & peak calorie burn",
      };
    }

    // ۳. پیلاتس، یوگا و تمرینات اصلاحی
    if (
      titleToCheck.includes("پیلاتس") ||
      titleToCheck.includes("بيلاتس") ||
      titleToCheck.includes("pilates") ||
      titleToCheck.includes("يوغا") ||
      titleToCheck.includes("yoga") ||
      titleToCheck.includes("إصلاح")
    ) {
      return {
        muscle: 0.72,
        burn: 0.88,
        typeLabel: isAr
          ? calcData.mobilityTagAr ||
            "تركيز على تقوية عضلات الجذع، المرونة وتعديل القوام"
          : calcData.mobilityTagEn ||
            "Core stabilization, posture alignment & flexibility",
      };
    }

    return {
      muscle: 1.0,
      burn: 1.0,
      typeLabel: isAr
        ? calcData.generalTagAr || "تمارين شاملة لرفع اللياقة البدنية والتحمل"
        : calcData.generalTagEn ||
          "General physical conditioning & functional fitness",
    };
  };

  const calculateFitness = (e) => {
    e.preventDefault();

    // ۱. معادله Mifflin-St Jeor
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr = gender === "male" ? bmr + 5 : bmr - 161;
    const tdee = Math.round(bmr * parseFloat(activity));

    const heightInMeters = height / 100;
    const initialBmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    // ۲. مشخصات کلاس انتخابی
    const activeClass =
      classesList.find((c) => String(c.id) === String(selectedClassId)) ||
      classesList[0];
    const classMetrics = getClassMultipliers(activeClass);

    // ۳. ضریب پایبندی به رژیم غذایی
    const dietMultiplier =
      dietCommitment === "pro"
        ? 1.35
        : dietCommitment === "standard"
          ? 0.95
          : 0.45;

    let baseMinGainOrLoss = 0;
    let baseMaxGainOrLoss = 0;
    let targetCalories = tdee;

    if (goal === "bulk") {
      const isSkinny = parseFloat(initialBmi) < 20;
      targetCalories = dietCommitment === "pro" ? tdee + 650 : tdee + 400;

      const bulkBase = isSkinny ? 3.6 : 2.6;
      baseMinGainOrLoss = bulkBase * dietMultiplier * classMetrics.muscle;
      baseMaxGainOrLoss =
        (bulkBase + 2.4) * dietMultiplier * classMetrics.muscle;
    } else if (goal === "cut") {
      targetCalories =
        dietCommitment === "pro"
          ? Math.max(1250, tdee - 650)
          : Math.max(1350, tdee - 450);
      const isOverweight = parseFloat(initialBmi) > 26;

      const cutBase = isOverweight ? 4.2 : 2.8;
      baseMinGainOrLoss = cutBase * dietMultiplier * classMetrics.burn;
      baseMaxGainOrLoss = (cutBase + 2.5) * dietMultiplier * classMetrics.burn;
    } else {
      targetCalories = tdee;
      baseMinGainOrLoss = 1.0 * dietMultiplier * classMetrics.muscle;
      baseMaxGainOrLoss = 2.0 * dietMultiplier * classMetrics.muscle;
    }

    const minDelta = Math.max(0.6, baseMinGainOrLoss).toFixed(1);
    const maxDelta = Math.max(1.2, baseMaxGainOrLoss).toFixed(1);
    const avgDelta = (parseFloat(minDelta) + parseFloat(maxDelta)) / 2;

    const projectedWeight =
      goal === "cut"
        ? (weight - avgDelta).toFixed(1)
        : (weight + avgDelta).toFixed(1);

    const projectedBmi = (
      projectedWeight /
      (heightInMeters * heightInMeters)
    ).toFixed(1);

    const suggestedProtein =
      goal === "bulk"
        ? Math.round(weight * 2.2 * (classMetrics.muscle > 1 ? 1.05 : 0.95))
        : Math.round(weight * 1.9);

    // ۴ ایستگاه نقشه راه دوره ۸ هفته‌ای
    const msCfg = calcData.milestones || {};
    const isStrength = classMetrics.muscle > 1.1;

    const milestones = [
      {
        week: 2,
        title: isAr
          ? msCfg.week2?.titleAr || "الأسبوع 2: مرحلة التكيف"
          : msCfg.week2?.titleEn || "Week 2: Muscular Adaptation",
        projectedW:
          goal === "cut"
            ? (weight - avgDelta * 0.22).toFixed(1)
            : (weight + avgDelta * 0.22).toFixed(1),
        note: isAr
          ? goal === "bulk"
            ? isStrength
              ? msCfg.week2?.bulkNoteAr ||
                "زيادة الشهية، تعزيز تدفق الجليكوجين وارتفاع طاقة الجسم"
              : "تحسن في كفاءة التوازن والمطاطية العضلية الأولية"
            : msCfg.week2?.cutNoteAr ||
              "طرد احتباس السوائل الزائدة والشعور بخفة بدنية واضحة"
          : goal === "bulk"
            ? isStrength
              ? msCfg.week2?.bulkNoteEn ||
                "Increased appetite, glycogen uptake & elevated workout energy"
              : "Initial muscle balance and neural connection improvements"
            : msCfg.week2?.cutNoteEn ||
              "Shedding excess water retention & noticeable body lightness",
      },
      {
        week: 4,
        title: isAr
          ? msCfg.week4?.titleAr || "الأسبوع 4: مرحلة التثبيت الأيضي"
          : msCfg.week4?.titleEn || "Week 4: Metabolic Stabilization",
        projectedW:
          goal === "cut"
            ? (weight - avgDelta * 0.48).toFixed(1)
            : (weight + avgDelta * 0.48).toFixed(1),
        note: isAr
          ? goal === "bulk"
            ? isStrength
              ? msCfg.week4?.bulkNoteAr ||
                "ارتفاع ملحوظ في أوزان التمارين وبدء امتلاء الألياف العضلية"
              : "تطور مرونة المفاصل واشتداد الألياف العضلية"
            : msCfg.week4?.cutNoteAr ||
              "انخفاض مقاسات محيط الخصر وتحسن كبير في كفاءة التنفس"
          : goal === "bulk"
            ? isStrength
              ? msCfg.week4?.bulkNoteEn ||
                "Notable strength gains & initial muscle fiber fullness"
              : "Joint mobility enhancement and muscle core hardening"
            : msCfg.week4?.cutNoteEn ||
              "Visible waistline reduction & enhanced aerobic endurance",
      },
      {
        week: 6,
        title: isAr
          ? msCfg.week6?.titleAr || "الأسبوع 6: مرحلة بروز المعالم البدنية"
          : msCfg.week6?.titleEn || "Week 6: Aesthetic Definition",
        projectedW:
          goal === "cut"
            ? (weight - avgDelta * 0.74).toFixed(1)
            : (weight + avgDelta * 0.74).toFixed(1),
        note: isAr
          ? goal === "bulk"
            ? isStrength
              ? msCfg.week6?.bulkNoteAr ||
                "بروز تقسيم عضلات الأكتاف والذراعين مع زيادة كثافة العضل"
              : "نحت القوام وتناسق عضلات الجذع والظهر"
            : msCfg.week6?.cutNoteAr ||
              "ظهور خطوط عضلات البطن وتحسن ملحوظ في نقاء ومرونة الجلد"
          : goal === "bulk"
            ? isStrength
              ? msCfg.week6?.bulkNoteEn ||
                "Defined shoulder & arm lines with denser muscle mass"
              : "Core sculpture and improved spinal posture alignment"
            : msCfg.week6?.cutNoteEn ||
              "Abdominal definition emerges with firmer skin quality",
      },
      {
        week: 8,
        title: isAr
          ? msCfg.week8?.titleAr || "الأسبوع 8: ذروة التحول وتثبيت النتائج"
          : msCfg.week8?.titleEn || "Week 8: Peak Transformation",
        projectedW: projectedWeight,
        note: isAr
          ? goal === "bulk"
            ? isStrength
              ? msCfg.week8?.bulkNoteAr ||
                "تثبيت الكتلة العضلية المكتسبة وزيادة دائمية في القوة البدنية"
              : "تناسق مثالي في المرونة والقوة الوظيفية"
            : msCfg.week8?.cutNoteAr ||
              "الوصول لأفضل نسبة دهون مع أقصى وضوح وتقسيم عضلي"
          : goal === "bulk"
            ? isStrength
              ? msCfg.week8?.bulkNoteEn ||
                "Stabilizing newly gained muscle mass with lasting peak strength"
              : "Functional strength balance and enduring muscular endurance"
            : msCfg.week8?.cutNoteEn ||
              "Achieving target body fat percentage with peak muscle definition",
      },
    ];

    setResult({
      targetCalories,
      tdee,
      bmi: initialBmi,
      suggestedProtein,
      activeClass,
      classMetrics,
      minDelta,
      maxDelta,
      projectedWeight,
      projectedBmi,
      milestones,
    });
  };

  const generateWaMessage = () => {
    if (!result) return "";

    const activeClassName = isAr
      ? result.activeClass?.titleAr ||
        result.activeClass?.title ||
        "حصة اللياقة"
      : result.activeClass?.titleEn ||
        result.activeClass?.title ||
        "Fitness Class";

    const activeTrainerName = isAr
      ? result.activeClass?.trainerAr ||
        result.activeClass?.trainer ||
        "المدرب المعتمد"
      : result.activeClass?.trainerEn ||
        result.activeClass?.trainer ||
        "Certified Coach";

    const currentGoalLabel =
      calcData.goals?.find((g) => g.id === goal)?.[
        isAr ? "labelAr" : "labelEn"
      ] || goal;

    const currentDietLabel =
      calcData.dietOptions?.find((d) => d.id === dietCommitment)?.[
        isAr ? "labelAr" : "labelEn"
      ] || dietCommitment;

    if (isAr) {
      return `مرحباً كابتن، قمت بإجراء محاكاة خطة التحول لـ 8 أسابيع عبر الموقع:
- الحصة المختارة: ${activeClassName} (المدرب: ${activeTrainerName})
- بياناتي: الوزن ${weight} كجم | الطول ${height} سم | العمر ${age} سنة
- هدفي البدني: ${currentGoalLabel}
- مستوى الالتزام الغذائي: ${currentDietLabel}
- النتيجة المتوقعة لخطة 8 أسابيع: تغير بين ${result.minDelta} إلى ${result.maxDelta} كجم
- السعرات اليومية المقترحة: ${result.targetCalories} سعرة
يرجى تأكيد موعد التقييم البدني وبدء الاشتراك.`;
    }

    return `Hello Coach, I simulated my 8-Week Transformation Blueprint on your site:
- Selected Class: ${activeClassName} (Coach: ${activeTrainerName})
- My Profile: Weight ${weight} kg | Height ${height} cm | Age ${age} yrs
- Training Goal: ${currentGoalLabel}
- Nutrition Commitment: ${currentDietLabel}
- Projected 8-Week Shift: Change between ${result.minDelta} to ${result.maxDelta} kg
- Suggested Daily Calories: ${result.targetCalories} kcal
Please confirm my in-person assessment and membership setup.`;
  };

  const waLink = result
    ? `https://wa.me/${clubData.brand?.whatsappNumber || ""}?text=${encodeURIComponent(
        generateWaMessage(),
      )}`
    : "#";

  return (
    <section
      id="calculator"
      dir={isAr ? "rtl" : "ltr"}
      className="py-24 bg-dark-900 border-t border-neutral-800/80 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-850 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isAr ? calcData.badgeAr : calcData.badgeEn}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? calcData.titleAr : calcData.titleEn}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {isAr ? calcData.subtitleAr : calcData.subtitleEn}
          </p>
        </div>

        <div className="bg-dark-850/90 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <form onSubmit={calculateFitness} className="space-y-6">
            {/* انتخاب جنسیت */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                {isAr ? calcData.genderLabelAr : calcData.genderLabelEn}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    gender === "male"
                      ? "bg-gold-500 text-dark-950 border-gold-500 font-black shadow-lg shadow-gold-500/20"
                      : "bg-dark-800 text-neutral-300 border-neutral-700 hover:border-neutral-600"
                  }`}
                >
                  {isAr ? calcData.maleAr : calcData.maleEn}
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    gender === "female"
                      ? "bg-gold-500 text-dark-950 border-gold-500 font-black shadow-lg shadow-gold-500/20"
                      : "bg-dark-800 text-neutral-300 border-neutral-700 hover:border-neutral-600"
                  }`}
                >
                  {isAr ? calcData.femaleAr : calcData.femaleEn}
                </button>
              </div>
            </div>

            {/* ورودی سن، قد و وزن */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  {isAr ? calcData.ageLabelAr : calcData.ageLabelEn}
                </label>
                <input
                  type="text"
                  min="14"
                  max="85"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-dark-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500 font-english"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  {isAr ? calcData.heightLabelAr : calcData.heightLabelEn}
                </label>
                <input
                  type="text"
                  min="120"
                  max="230"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-dark-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500 font-english"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  {isAr ? calcData.weightLabelAr : calcData.weightLabelEn}
                </label>
                <input
                  type="text"
                  min="35"
                  max="220"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-dark-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500 font-english"
                  required
                />
              </div>
            </div>

            {/* سطح فعالیت، هدف و تعهد به رژیم */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  {isAr ? calcData.activityLabelAr : calcData.activityLabelEn}
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full bg-dark-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  {calcData.activityLevels?.map((act, i) => (
                    <option
                      key={i}
                      value={act.value}
                      className="bg-dark-900 text-white"
                    >
                      {isAr ? act.labelAr : act.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5 ">
                  {isAr ? calcData.goalLabelAr : calcData.goalLabelEn}
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-dark-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  {calcData.goals?.map((g) => (
                    <option
                      key={g.id}
                      value={g.id}
                      className="bg-dark-900 text-white"
                    >
                      {isAr ? g.labelAr : g.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-400 mb-1.5 flex items-center justify-between ">
                  <span className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" />
                    {isAr
                      ? calcData.dietLabelAr || "النظام الغذائي"
                      : calcData.dietLabelEn || "Diet Plan"}
                  </span>
                </label>
                <select
                  value={dietCommitment}
                  onChange={(e) => setDietCommitment(e.target.value)}
                  className="w-full bg-dark-800 border border-gold-500/40 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-500 cursor-pointer font-medium"
                >
                  {(
                    calcData.dietOptions || [
                      {
                        id: "pro",
                        labelAr:
                          "نظام غذائي بإشراف المدرب + مكملات (أعلى فاعلية)",
                        labelEn: "Coach Diet + Supplements (Max Output)",
                      },
                      {
                        id: "standard",
                        labelAr: "نظام غذائي منزلي منضبط (تقدم متوازن)",
                        labelEn: "Controlled Home Diet (Balanced)",
                      },
                      {
                        id: "none",
                        labelAr: "بدون نظام محدد / وجبات عادية (نتائج محدودة)",
                        labelEn: "No Strict Diet / Casual (Minimal)",
                      },
                    ]
                  ).map((d) => (
                    <option
                      key={d.id}
                      value={d.id}
                      className="bg-dark-900 text-white"
                    >
                      {isAr ? d.labelAr : d.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* کلاس انتخابی باشگاه */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center justify-between">
                <span>
                  {isAr
                    ? calcData.classLabelAr || "الحصة التدريبية بالنادي"
                    : calcData.classLabelEn || "Selected Gym Class"}
                </span>
                <span className="text-[10px] text-gold-400 font-normal">
                  {isAr
                    ? calcData.classSubtextAr ||
                      "تأثير مباشر على البناء العضلي ومعدل الحرق"
                    : calcData.classSubtextEn ||
                      "Direct impact on hypertrophy & burn"}
                </span>
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full bg-dark-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                {classesList.length > 0 ? (
                  classesList.map((c) => {
                    const cTitle = isAr
                      ? c.titleAr || c.title || c.titleEn
                      : c.titleEn || c.title || c.titleAr;
                    const cTrainer = isAr
                      ? c.trainerAr || c.trainer || c.coachAr
                      : c.trainerEn || c.trainer || c.coachEn;

                    return (
                      <option
                        key={c.id}
                        value={c.id}
                        className="bg-dark-900 text-white"
                      >
                        {cTitle} — ({cTrainer})
                      </option>
                    );
                  })
                ) : (
                  <option value="default" className="bg-dark-900 text-white">
                    {isAr
                      ? calcData.defaultClassOptionAr || "حصص اللياقة العامة"
                      : calcData.defaultClassOptionEn ||
                        "General Fitness Classes"}
                  </option>
                )}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-sm font-black text-dark-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:brightness-110 active:scale-98 transition-all duration-200 shadow-xl shadow-gold-500/20 cursor-pointer"
            >
              {isAr ? calcData.calculateBtnAr : calcData.calculateBtnEn}
            </button>
          </form>

          {/* کارت نمایش نتایج شبیه‌سازی و نقشه راه تفکیک شده */}
          {result && (
            <div className="mt-10 pt-10 border-t border-neutral-800 space-y-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-gold-500/10 via-dark-900 to-dark-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-800/80">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-gold-400 text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      {isAr ? calcData.resultsBadgeAr : calcData.resultsBadgeEn}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {isAr ? "الحصة:" : "Class:"}{" "}
                      <span className="text-gold-400">
                        {isAr
                          ? result.activeClass?.titleAr ||
                            result.activeClass?.title
                          : result.activeClass?.titleEn ||
                            result.activeClass?.title}
                      </span>{" "}
                      <span className="text-neutral-400 text-sm font-normal">
                        (
                        {isAr
                          ? result.activeClass?.trainerAr ||
                            result.activeClass?.trainer
                          : result.activeClass?.trainerEn ||
                            result.activeClass?.trainer}
                        )
                      </span>
                    </h3>
                    <p className="text-xs text-accent-emerald mt-1.5 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{result.classMetrics?.typeLabel}</span>
                    </p>
                  </div>

                  <div className="text-start sm:text-end">
                    <span className="text-xs text-neutral-400 block mb-1">
                      {isAr
                        ? calcData.projectedWeightLabelAr ||
                          "وزنك التقديري الجديد بنهاية الأسبوع الثامن"
                        : calcData.projectedWeightLabelEn ||
                          "Projected New Weight by Week 8"}
                      :
                    </span>
                    <div className="flex items-center sm:justify-end gap-2">
                      {goal === "bulk" ? (
                        <TrendingUp className="w-6 h-6 text-accent-emerald" />
                      ) : (
                        <TrendingDown className="w-6 h-6 text-gold-400" />
                      )}
                      <span className="text-2xl sm:text-3xl font-black text-white font-english">
                        ~{result.projectedWeight}{" "}
                        <span className="text-xs text-neutral-400 font-normal">
                          {isAr
                            ? calcData.weightUnitAr || "كجم"
                            : calcData.weightUnitEn || "kg"}
                        </span>
                      </span>
                    </div>
                    <span className="text-xs text-gold-400 font-semibold block mt-1">
                      (
                      {(isAr
                        ? calcData.weightChangeRangeTextAr ||
                          "تغير تقديري بين {min} إلى {max} كجم"
                        : calcData.weightChangeRangeTextEn ||
                          "Projected shift between {min} to {max} kg"
                      )
                        ?.replace("{min}", result.minDelta)
                        .replace("{max}", result.maxDelta)}
                      )
                    </span>
                  </div>
                </div>

                {/* نقشه راه ۴ فازه تحول گام‌به‌گام */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
                    {isAr
                      ? calcData.roadmapTitleAr ||
                        "خارطة طريق التحول التدريجي (Milestone Roadmap)"
                      : calcData.roadmapTitleEn ||
                        "Step-by-Step Transformation Roadmap"}
                    :
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {result.milestones.map((ms, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          idx === 3
                            ? "bg-gold-500/10 border-gold-500/40 ring-1 ring-gold-500/20"
                            : "bg-dark-950/60 border-neutral-800"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="text-[11px] font-black text-gold-400">
                              {ms.title}
                            </span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          </div>

                          <div className="text-xl font-black text-white font-english mb-2">
                            {ms.projectedW}{" "}
                            <span className="text-xs text-neutral-400 font-normal">
                              {isAr
                                ? calcData.weightUnitAr || "كجم"
                                : calcData.weightUnitEn || "kg"}
                            </span>
                          </div>

                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            {ms.note}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-neutral-800/60 text-[10px] text-neutral-500 font-english">
                          {(isAr
                            ? calcData.milestonePhasePrefixAr ||
                              "الأسبوع {week} من 8"
                            : calcData.milestonePhasePrefixEn ||
                              "Week {week} of 8"
                          )?.replace("{week}", ms.week)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* شاخص‌های بیومتریک و تغذیه */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-dark-850 p-3.5 rounded-xl border border-neutral-800">
                    <span className="block text-[11px] text-neutral-400 mb-1">
                      {isAr ? calcData.bmiLabelAr : calcData.bmiLabelEn}
                    </span>
                    <span className="text-base font-black text-neutral-200 font-english">
                      {result.bmi}
                    </span>
                  </div>
                  <div className="bg-dark-850 p-3.5 rounded-xl border border-gold-500/30">
                    <span className="block text-[11px] text-gold-400 mb-1">
                      {isAr
                        ? calcData.targetBmiLabelAr || "BMI المستهدف بالأسبوع 8"
                        : calcData.targetBmiLabelEn || "Target BMI by Week 8"}
                    </span>
                    <span className="text-base font-black text-gold-400 font-english">
                      {result.projectedBmi}
                    </span>
                  </div>
                  <div className="bg-dark-850 p-3.5 rounded-xl border border-neutral-800">
                    <span className="block text-[11px] text-neutral-400 mb-1">
                      {isAr
                        ? calcData.caloriesLabelAr
                        : calcData.caloriesLabelEn}
                    </span>
                    <span className="text-base font-black text-accent-emerald font-english">
                      {result.targetCalories}{" "}
                      <span className="text-[10px] text-neutral-400">
                        {isAr
                          ? calcData.dailyUnitAr || "سعرة/يوم"
                          : calcData.dailyUnitEn || "kcal/day"}
                      </span>
                    </span>
                  </div>
                  <div className="bg-dark-850 p-3.5 rounded-xl border border-neutral-800">
                    <span className="block text-[11px] text-neutral-400 mb-1">
                      {isAr ? calcData.proteinLabelAr : calcData.proteinLabelEn}
                    </span>
                    <span className="text-base font-black text-white font-english">
                      ~{result.suggestedProtein}{" "}
                      <span className="text-[10px] text-neutral-400">
                        {isAr
                          ? calcData.proteinUnitAr || "جرام"
                          : calcData.proteinUnitEn || "g/day"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* اکشن‌های رزرو صندلی و واتس‌اپ */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#schedule"
                  onClick={() => {
                    if (onSelectClassFromCalc && result.activeClass) {
                      onSelectClassFromCalc(result.activeClass);
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-black text-xs sm:text-sm shadow-lg shadow-gold-500/20 transition-all cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>
                    {(isAr
                      ? calcData.bookClassBtnTextAr || "حجز مقعد في حصة {title}"
                      : calcData.bookClassBtnTextEn || "Book Seat in {title}"
                    )?.replace(
                      "{title}",
                      (isAr
                        ? result.activeClass?.titleAr ||
                          result.activeClass?.title
                        : result.activeClass?.titleEn ||
                          result.activeClass?.title) || "",
                    )}
                  </span>
                </a>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/25 transition-all cursor-pointer group"
                >
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
                    {isAr
                      ? calcData.sendWhatsappBtnAr
                      : calcData.sendWhatsappBtnEn}
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
