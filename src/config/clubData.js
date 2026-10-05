export const clubData = {
  // اطلاعات برندینگ و شعبه
  brand: {
    timeZone: "Asia/Dubai",
    name: "PRIME FIT ATHLETIC CLUB",
    nameAr: "برايم فيت أتلتيك كلوب",
    slogan: "Where Champions Are Forged",
    sloganAr: "حيث تُصنع النخبة والأبطال",
    city: "Riyadh",
    cityAr: "الرياض",
    country: "Saudi Arabia",
    countryAr: "المملكة العربية السعودية",
    locationAddress: "King Fahd Road, Al Olaya District, Riyadh",
    locationAddressAr: "طريق الملك فهد، حي العليا، الرياض",
    phone: "+966500000000",
    whatsappNumber: "966500000000",
    defaultWaMessageAr:
      "مرحباً، أود الاستفسار عن تفاصيل الاشتراك وتجربة اليوم الواحد المجانية.",
    defaultWaMessageEn:
      "Hello, I would like to inquire about membership options and the free 1-day pass.",
    workingHoursAr:
      "السبت - الخميس: 6:00 ص - 12:00 منتصف الليل | الجمعة: 1:00 م - 10:00 م",
    workingHoursEn:
      "Sat - Thu: 6:00 AM - 12:00 Midnight | Fri: 1:00 PM - 10:00 PM",

    // متون دو زبانه بخش Hero
    hero: {
      badgeAr: "النادي الأحدث والأكثر تميزاً في المنطقة",
      badgeEn: "The Premier Athletic Destination in the Region",
      titlePart1Ar: "أعد صياغة قوتك وتجاوز حدودك في",
      titlePart1En: "Redefine Your Limits & Forge Elite Strength at",
      descAr:
        "بيئة تدريب استثنائية مزودة بأحدث التجهيزات الرياضية عالمياً، صالات خاصة ومستقلة 100% للسيدات، ومدربين حاصلين على أعلى الشهادات الدولية لتصل لهدفك بأسرع وقت.",
      descEn:
        "An unmatched training ecosystem powered by Olympic-grade equipment, 100% private ladies-only zones, and internationally accredited master coaches dedicated to your results.",
      ctaPrimaryAr: "ابدأ عضويتك المميزة الآن",
      ctaPrimaryEn: "Book Your Elite Membership",
      ctaSecondaryAr: "تواصل عبر واتساب",
      ctaSecondaryEn: "Instant WhatsApp Chat",
    },
  },

  // سوئیچ‌های مقیاس‌پذیری (Feature Flags)
  // تغییر هر یک از این فلگ‌ها هیچ آسیبی به ساختار و جریان ظاهری صفحه نمی‌زند
  features: {
    showLadiesSection: true, // بخش اختصاصی ۱۰۰٪ خصوصی بانوان
    showRecovery: true, // سالن ریکاوری (حوضچه یخ، سونا، کرایوتراپی)
    showCalculator: true, // ماشین‌حساب تناسب اندام و کالری (Lead Magnet)
    showTransformations: true, // اسلایدر قبل و بعد چندکیسه
    showSchedule: true, // جدول زمان‌بندی زنده کلاس‌ها
    showTrainers: true, // لیست و رزومه مربیان بین‌المللی
    showPricing: true, // پلن‌های عضویت و قیمت‌گذاری
    showVirtualTour: true, // گالری و تور مجازی سالن و تجهیزات
    showFaq: true, // بخش سوالات متداول
    showBranchSelector: true, // نمایش انتخابگر شعبه در فرم‌ها و CTAها
  },
  branches: [
    {
      id: "flagship-olaya",
      nameAr: "فرع العليا - الرياض (الرئيسي)",
      nameEn: "Al Olaya - Riyadh (Flagship)",
      isLadies: false,
    },
    {
      id: "ladies-narjis",
      nameAr: "فرع النرجس - الرياض (قسم السيدات المستقل 100%)",
      nameEn: "Al Narjis - Riyadh (100% Private Ladies Sanctuary)",
      isLadies: true,
    },
    {
      id: "vip-marina",
      nameAr: "فرع مارينا - دبي (نادي الـ VIP والأداء العالي)",
      nameEn: "Dubai Marina (VIP Performance Hub)",
      isLadies: false,
    },
    {
      id: "corniche-doha",
      nameAr: "فرع الكورنيش - الدوحة",
      nameEn: "Corniche Hub - Doha",
      isLadies: false,
    },
  ],
  // تنظیمات ارز فعال برای پروژه
  activeCurrencyCode: "AED", // قابل تغییر به: AED, QAR, KWD, BHD, OMR, JOD, MAD, EGP, USD, ...

  // لیست جامع و کامل ارزهای منطقه MENA و بین‌المللی
  currencies: {
    SAR: {
      code: "SAR",
      symbolAr: "ر.س",
      symbolEn: "SAR",
      decimals: 0,
      position: "end",
    },
    AED: {
      code: "AED",
      symbolAr: "د.إ",
      symbolEn: "AED",
      decimals: 0,
      position: "end",
    },
    QAR: {
      code: "QAR",
      symbolAr: "ر.ق",
      symbolEn: "QAR",
      decimals: 0,
      position: "end",
    },
    KWD: {
      code: "KWD",
      symbolAr: "د.ك",
      symbolEn: "KWD",
      decimals: 3,
      position: "end",
    },
    BHD: {
      code: "BHD",
      symbolAr: "د.ب",
      symbolEn: "BHD",
      decimals: 3,
      position: "end",
    },
    OMR: {
      code: "OMR",
      symbolAr: "ر.ع",
      symbolEn: "OMR",
      decimals: 3,
      position: "end",
    },
    JOD: {
      code: "JOD",
      symbolAr: "د.أ",
      symbolEn: "JOD",
      decimals: 2,
      position: "end",
    },
    EGP: {
      code: "EGP",
      symbolAr: "ج.م",
      symbolEn: "EGP",
      decimals: 0,
      position: "end",
    },
    MAD: {
      code: "MAD",
      symbolAr: "د.م.",
      symbolEn: "MAD",
      decimals: 0,
      position: "end",
    },
    TND: {
      code: "TND",
      symbolAr: "د.ت",
      symbolEn: "TND",
      decimals: 3,
      position: "end",
    },
    DZD: {
      code: "DZD",
      symbolAr: "د.ج",
      symbolEn: "DZD",
      decimals: 0,
      position: "end",
    },
    IQD: {
      code: "IQD",
      symbolAr: "د.ع",
      symbolEn: "IQD",
      decimals: 0,
      position: "end",
    },
    LBP: {
      code: "LBP",
      symbolAr: "ل.ل",
      symbolEn: "LBP",
      decimals: 0,
      position: "end",
    },
    LYD: {
      code: "LYD",
      symbolAr: "د.ل",
      symbolEn: "LYD",
      decimals: 3,
      position: "end",
    },
    SDG: {
      code: "SDG",
      symbolAr: "ج.س",
      symbolEn: "SDG",
      decimals: 0,
      position: "end",
    },
    MRU: {
      code: "MRU",
      symbolAr: "أ.م",
      symbolEn: "MRU",
      decimals: 0,
      position: "end",
    },
    USD: {
      code: "USD",
      symbolAr: "$",
      symbolEn: "$",
      decimals: 0,
      position: "start",
    },
  },

  // تابع کمکی برای فرمت استاندارد قیمت بر اساس زبان و واحد پول انتخابی
  formatPrice(amount, lang = "ar", currencyCode = null) {
    const cur =
      this.currencies[currencyCode || this.activeCurrencyCode] ||
      this.currencies.SAR;
    const formattedAmount = Number(amount).toLocaleString(
      lang === "ar" ? "ar-SA" : "en-US",
      {
        minimumFractionDigits: cur.decimals,
        maximumFractionDigits: cur.decimals,
      },
    );
    const symbol = lang === "ar" ? cur.symbolAr : cur.symbolEn;

    if (cur.position === "start") {
      return `${symbol} ${formattedAmount}`;
    }
    return `${formattedAmount} ${symbol}`;
  },

  // پیش‌شماره‌های تلفن معتبر منطقه MENA / GCC برای فرم‌ها
  countryPhoneCodes: [
    {
      countryAr: "المملكة العربية السعودية",
      code: "SA",
      dialCode: "+966",
      flag: "🇸🇦",
    },
    {
      countryAr: "الإمارات العربية المتحدة",
      code: "AE",
      dialCode: "+971",
      flag: "🇦🇪",
    },
    { countryAr: "قطر", code: "QA", dialCode: "+974", flag: "🇶🇦" },
    { countryAr: "الكويت", code: "KW", dialCode: "+965", flag: "🇰🇼" },
    { countryAr: "مملكة البحرين", code: "BH", dialCode: "+973", flag: "🇧🇭" },
    { countryAr: "سلطنة عمان", code: "OM", dialCode: "+968", flag: "🇴🇲" },
    {
      countryAr: "المملكة الأردنية الهاشمية",
      code: "JO",
      dialCode: "+962",
      flag: "🇯🇴",
    },
    {
      countryAr: "جمهورية مصر العربية",
      code: "EG",
      dialCode: "+20",
      flag: "🇪🇬",
    },
    { countryAr: "المملكة المغربية", code: "MA", dialCode: "+212", flag: "🇲🇦" },
    {
      countryAr: "الجمهورية التونسية",
      code: "TN",
      dialCode: "+216",
      flag: "🇹🇳",
    },
    { countryAr: "الجزائر", code: "DZ", dialCode: "+213", flag: "🇩🇿" },
    { countryAr: "العراق", code: "IQ", dialCode: "+964", flag: "🇮🇶" },
    { countryAr: "لبنان", code: "LB", dialCode: "+961", flag: "🇱🇧" },
    { countryAr: "ليبيا", code: "LY", dialCode: "+218", flag: "🇱🇾" },
  ],

  // آمارهای کلیدی (Trust Bar)
  stats: [
    { value: "+3,500", labelAr: "عضو نشط", labelEn: "Active Members" },
    {
      value: "4.9",
      labelAr: "تقييم جوجل (850+ تقييم)",
      labelEn: "Google Rating",
    },
    {
      value: "+18",
      labelAr: "مدرب معتمد دولياً",
      labelEn: "Certified Coaches",
    },
    {
      value: "2,400m²",
      labelAr: "مساحة متكاملة وفارهة",
      labelEn: "Luxury Space",
    },
  ],

  // لینک‌های شبکه‌های اجتماعی
  socials: {
    instagram: "https://instagram.com",
    snapchat: "https://snapchat.com",
    tiktok: "https://tiktok.com",
  },

  // داده‌های تور ۳۶۰ درجه و فضاهای اختصاصی باشگاه
  tour: {
    badgeAr: "مرافق وفضاءات النادي الفاخرة",
    badgeEn: "Club Facilities & Exclusive Spaces",
    titleAr: "جولة استكشافية ومساحات التدريب الخاصة",
    titleEn: "Exclusive Spaces & Virtual Tour",
    subtitleAr:
      "لاكتشاف زوايا وأجهزة كل قسم، اختر التصنيف وتصفح الصور بكل سهولة",
    subtitleEn:
      "Select a category and browse photos to explore each training zone and premium equipment",
    allCategoryAr: "جميع الأقسام",
    allCategoryEn: "All Spaces",
    memberAccessBadgeAr: "دخول حر ومجاني لجميع المشتركين",
    memberAccessBadgeEn: "Full Access for All Members",
    bookSessionAr: "حجز جولة / سانس استكشافي",
    bookSessionEn: "Book Private Session",

    categories: [
      {
        id: "all",
        labelAr: "جميع الأقسام",
        labelEn: "All Spaces",
        icon: "Sparkles",
      },
      {
        id: "gym_floor",
        labelAr: "الصالة الرئيسية والأجهزة",
        labelEn: "Main Gym Floor & Rigs",
        icon: "Dumbbell",
      },
      {
        id: "lockers",
        labelAr: "غرف التبديل ودوش VIP",
        labelEn: "VIP Lockers & Showers",
        icon: "KeyRound",
      },
      {
        id: "recovery",
        labelAr: "الساونا وحوض الثلج",
        labelEn: "Sauna, Spa & Ice Bath",
        icon: "Waves",
      },
      {
        id: "cafe",
        labelAr: "بار البروتين والكافيه",
        labelEn: "Protein Bar & Cafe",
        icon: "Coffee",
      },
      {
        id: "studio",
        labelAr: "استوديو البيلاتس واليوغا",
        labelEn: "Pilates & Yoga Studio",
        icon: "HeartPulse",
      },
    ],

    spaces: [
      {
        id: "gym_floor_main",
        categoryId: "gym_floor",
        titleAr: "صالة الأوزان الحرة والتجهيزات المتقدمة",
        titleEn: "Free Weights & Advanced Machinery",
        subtitleAr: "تجهيزات إيطالية متطورة من Panatta و Technogym",
        subtitleEn: "Pro-grade Italian equipment by Panatta & Technogym",
        badgeAr: "بدون انتظار للأجهزة",
        badgeEn: "Zero Wait Time",
        photos: [
          {
            url: "/images/fit-room.webp",
            captionAr: "محطات رك الأسكوات ومكابس الصدر متعددة الاستخدام",
            captionEn: "Multi-functional power cages & heavy squat racks",
          },
          {
            url: "/images/fit-room-2.webp",
            captionAr: "تشكيلة دمبلز يوريثان متكاملة حتى 50 كجم",
            captionEn: "Full urethane heavy dumbbell set up to 50kg",
          },
        ],
        featuresAr: [
          "تكييف هواء مركزي مع نظام فلترة نانو متطور",
          "أرضيات مطاطية احترافية ماصة للصدمات",
          "مرايا بانورامية متصلة بإضاءة مدروسة",
        ],
        featuresEn: [
          "Nano-filtration clean air conditioning",
          "Heavy-duty shock-absorbing athletic flooring",
          "Panoramic full-height precision mirrors",
        ],
      },
      {
        id: "lockers_vip",
        categoryId: "lockers",
        titleAr: "خزائن ذكية وغرف تبديل خاصة",
        titleEn: "Smart Lockers & VIP Dressing Suites",
        subtitleAr: "أعلى معايير النظافة والخصوصية والأمان للرياضي",
        subtitleEn: "Utmost hygiene, security, and member comfort",
        badgeAr: "أمان 100%",
        badgeEn: "100% Secure",
        photos: [
          {
            url: "/images/locker-1.webp",
            captionAr: "خزائن إلكترونية مؤمنة بأساور RFID الذكية",
            captionEn: "Electronic lockers with contactless RFID wristbands",
          },
          {
            url: "/images/locker-2.webp",
            captionAr: "كبائن دوش ساخن مستقلة مع تعقيم مستمر",
            captionEn: "Private rain shower suites with ongoing sanitization",
          },
        ],
        featuresAr: [
          "مجففات شعر احترافية ومستلزمات عناية شخصية فاخرة",
          "دوش ماء ساخن بضغط مرتفع وتصميم فندقي",
          "أقفال رقمية ذكية عبر السوار الإلكتروني",
        ],
        featuresEn: [
          "High-power dryers & luxury grooming essentials",
          "High-pressure individual rain showers",
          "Smart contactless digital locker locks",
        ],
      },
      {
        id: "recovery_spa",
        categoryId: "recovery",
        titleAr: "المنطقة المائية، الساونا والاستشفاء العضلي",
        titleEn: "Thermal Suite, Sauna & Muscle Recovery",
        subtitleAr: "تفريغ حمض اللاكتيك واسترخاء عميق بعد الحصص الشاقة",
        subtitleEn: "Flush lactic acid and decompress after peak workouts",
        badgeAr: "استشفاء احترافي",
        badgeEn: "Pro Recovery",
        photos: [
          {
            url: "/images/suna-1.webp",
            captionAr: "ساونا فنلندية جافة بخشب الترمو الطبيعي وصخور بركانية",
            captionEn:
              "Authentic Finnish thermo-wood sauna with volcanic rocks",
          },
          {
            url: "/images/suna-2.webp",
            captionAr: "حوض الغمر البارد (Cold Plunge) لتثبيط الالتهابات",
            captionEn:
              "Sub-zero cold plunge bath for instant inflammation relief",
          },
        ],
        featuresAr: [
          "تحكم حراري دقيق بدرجة برودة حوض الثلج (3-6 درجات)",
          "علاج عطري (Aromatherapy) بمستخلصات عشبية بالساونا",
          "تقنية تعقيم وتنقية مياه بالأوزون على مدار الساعة",
        ],
        featuresEn: [
          "Precise cold plunge temperature regulation (3-6°C)",
          "Infused herbal aromatherapy in Finnish sauna",
          "24/7 continuous ozone water sterilization",
        ],
      },
      {
        id: "cafe_bar",
        categoryId: "cafe",
        titleAr: "بار البروتين، السموثي والمكملات الغذائية",
        titleEn: "Dedicated Protein, Smoothie & Supplement Bar",
        subtitleAr: "تغذية فورية وطاقة نقية قبل التدريب وبعده",
        subtitleEn: "Instant pre-workout ignition & clean post-workout fueling",
        badgeAr: "طازج وصحي",
        badgeEn: "Fresh & Organic",
        photos: [
          {
            url: "/images/bar-1.webp",
            captionAr: "شيك بروتين معزول (Whey Isolate) وسموثي خالي من السكر",
            captionEn: "Whey isolate shakes & zero-sugar superfood smoothies",
          },
          {
            url: "/images/bar-2.webp",
            captionAr: "قهوة إسبريسو 100% أرابيكا مختصة لطاقة ما قبل التمرين",
            captionEn: "Specialty 100% Arabica espresso for explosive energy",
          },
        ],
        featuresAr: [
          "إعداد مخفوقات البروتين بمكملاتك المفضلة",
          "مكائن قهوة إيطالية احترافية",
          "وجبات خفيفة صحية وبارات بروتين منخفضة السعرات",
        ],
        featuresEn: [
          "Custom protein shakes tailored to your macronutrients",
          "Artisan Italian espresso & pre-workout brews",
          "Clean diet snacks & low-calorie protein bars",
        ],
      },
      {
        id: "studio_classes",
        categoryId: "studio",
        titleAr: "استوديو البيلاتس، الـ TRX والتمارين الوظيفية",
        titleEn: "Pilates Reformer, TRX & Dynamic Flow Studio",
        subtitleAr: "بيئة هادئة بإضاءة محيطية مريحة وأرضيات مطاطية خاصة",
        subtitleEn:
          "Isolated sanctuary with ambient lighting & low-impact flooring",
        badgeAr: "متاح لجميع الفئات",
        badgeEn: "Open to All",
        photos: [
          {
            url: "/images/pilates-2.webp",
            captionAr: "أجهزة بيلاتس ريفورمر (Pilates Reformer) الأصلية",
            captionEn: "Commercial-grade Pilates Reformer machines",
          },
          {
            url: "/images/pilates-1.webp",
            captionAr: "أجواء مهدئة مع أشرطة TRX وحصائر يوغا طبية",
            captionEn: "Tranquil space with premium yoga mats & TRX straps",
          },
        ],
        featuresAr: [
          "نظام صوتي محيطي عالي النقاوة للحصص الهادئة والحماسية",
          "أسرّة ريفورمر جديدة ومطابقة للمواصفات الدولية",
          "إضاءة سمارت تفاعلية تتكيف مع أجواء الحصة التدريبية",
        ],
        featuresEn: [
          "Immersive acoustic sound system tailored to class mood",
          "Brand-new world-standard reformer carriages",
          "Custom ambient mood lighting for focus & tranquility",
        ],
      },
    ],
  },

  // داده‌های بخش ریکاوری و استشفاء
  recovery: {
    badgeAr: "استشفاء سريع لأداء لا يتوقف",
    badgeEn: "Accelerated Recovery For Peak Performance",
    titleAr: "مركز الاستشفاء والاسترخاء المتطور",
    titleEn: "Advanced Recovery & Wellness Sanctuary",
    subtitleAr:
      "تسريع عملية تعافي العضلات وتجديد طاقتك الذهنية والبدنية بأحدث التقنيات",
    subtitleEn:
      "Accelerate muscular recovery, reduce inflammation, and restore full mental and physical vitality.",
    items: [
      {
        titleAr: "حوض المياه الباردة (Ice Bath)",
        titleEn: "Cold Plunge Therapy (Ice Bath)",
        descAr:
          "تقنية الغمر في الماء المثلج بدرجة حرارة 3-6 درجات لتقليل الالتهابات وتسريع استشفاء العضلات فوراً.",
        descEn:
          "Sub-zero cold water immersion (3-6°C) engineered to flush lactic acid and eliminate soreness instantly.",
        icon: "snowflake",
      },
      {
        titleAr: "الساونا الفنلندية وغرف البخار",
        titleEn: "Finnish Saunas & Steam Rooms",
        descAr:
          "جلسات حرارية عميقة لتخليص الجسم من السموم، تحسين تدفق الدورة الدموية، وتخفيف الضغط العصبي.",
        descEn:
          "Deep heat therapy designed for full-body detoxification, improved vascular flow, and nervous system calm.",
        icon: "flame",
      },
      {
        titleAr: "العلاج بالتبريد فائق البرودة (Cryotherapy)",
        titleEn: "Whole-Body Cryotherapy",
        descAr:
          "كبسولات نيتروجين متقدمة تمنح جسمك دفعة طاقة هائلة وتساعد في حرق الدهون وتجديد الخلايا في دقائق.",
        descEn:
          "Advanced nitrogen chambers exposing the body to extreme cold for a few minutes to trigger collagen production and rapid fat metabolism.",
        icon: "wind",
      },
      {
        titleAr: "أجهزة تدليك الضغط الهوائي (Normatec)",
        titleEn: "Normatec Compression Systems",
        descAr:
          "أكمام ضغط ديناميكية تنشط الدورة اللمفاوية وتزيل التعب العضلي المتراكم بعد أعتى التمارين الرياضية.",
        descEn:
          "Dynamic sequential pulse technology that accelerates lymphatic drainage and relieves heavy-leg fatigue after grueling sessions.",
        icon: "activity",
      },
    ],
  },
  // داده‌های تحولات و کیس‌های موفق (Before & After)
  transformations: {
    titleAr: "قصص نجاح وتحولات حقيقية",
    titleEn: "Real Transformations & Success Stories",
    subtitleAr:
      "شاهد نتائج أعضائنا الملموسة بعد الالتزام بخطط التدريب والتغذية المخصصة",
    subtitleEn:
      "Witness tangible results achieved by our members through personalized training and nutrition regimes.",
    items: [
      {
        id: 1,
        nameAr: "طارق الشمري",
        nameEn: "Tariq Al-Shammari",
        trainerAr: "كوتش خالد",
        trainerEn: "Coach Khalid",
        goalAr: "خسارة وزن كبرى واستعادة الصحة العامة",
        goalEn: "Major Weight Loss & Metabolic Reset",
        quoteAr:
          "خسرت أكثر من 20 كجم واستعدت خفتي ونشاطي اليومي. الأجهزة والبيئة هنا تجبرك على النجاح.",
        quoteEn:
          "Lost over 20 kg and restored my daily stamina. The facility standard keeps you accountable.",
        durationAr: "24 أسبوعاً",
        durationEn: "24 Weeks",
        weightChangeAr: "-22 كجم",
        weightChangeEn: "-22 kg",
        bodyFatChangeAr: "-15%",
        bodyFatChangeEn: "-15%",
        beforeImg: "/images/before-men.jpg",
        afterImg: "/images/after-men.jpg",
      },
      {
        id: 2,
        nameAr: "سارة القحطاني",
        nameEn: "Sara Al-Qahtani",
        trainerAr: "كوتش نورة",
        trainerEn: "Coach Noura",
        goalAr: "نحت القوام وزيادة اللياقة البدنية",
        goalEn: "Body Toning & Core Conditioning",
        quoteAr:
          "الخصوصية التامة في قسم السيدات والأجواء الحماسية هي السبب الأول لاستمراري ووصولي لهذا الوزن.",
        quoteEn:
          "The 100% private ladies environment and motivating coaches made staying consistent effortless.",
        durationAr: "12 أسبوعاً",
        durationEn: "12 Weeks",
        weightChangeAr: "-11 كجم",
        weightChangeEn: "-11 kg",
        bodyFatChangeAr: "-9%",
        bodyFatChangeEn: "-9%",
        beforeImg: "/images/before-women-1.jpg",
        afterImg: "/images/after-women-1.jpg",
      },
      {
        id: 3,
        nameAr: "خالد المنصور",
        nameEn: "Khalid Al-Mansoor",
        trainerAr: "كوتش ماركوس",
        trainerEn: "Coach Marcus",
        goalAr: "تنشيف متقدم وبناء كتلة عضلية صافية",
        goalEn: "Hypertrophy & Lean Shred",
        quoteAr:
          "برامج القوة المركزة وجلسات الاستشفاء بحوض الثلج ضاعفت طاقتي وسرعة تعافي عضلاتي بشكل ملحوظ.",
        quoteEn:
          "Targeted strength programming combined with cold plunge sessions took my recovery to an elite level.",
        durationAr: "16 أسبوعاً",
        durationEn: "16 Weeks",
        weightChangeAr: "-8 كجم (دهون) / +4 كجم (عضل)",
        weightChangeEn: "-8kg Fat / +4kg Muscle",
        bodyFatChangeAr: "-11%",
        bodyFatChangeEn: "-11%",
        beforeImg: "/images/before-1.jpg",
        afterImg: "/images/after-1.jpg",
      },
    ],
  },
  // داده‌های جدول زمان‌بندی هفتگی کلاس‌ها
  schedule: {
    badgeAr: "طاقة وحماس لا ينقطعان",
    badgeEn: "Unstoppable Energy & Momentum",
    titleAr: "جدول الحصص التدريبية الأسبوعي",
    titleEn: "Weekly Group Fitness Schedule",
    subtitleAr:
      "حصص جماعية حماسية بإشراف مدربين محترفين لمختلف المستويات والأهداف",
    subtitleEn:
      "High-energy group workouts led by elite coaches for all fitness levels and targets",
    disclaimerAr:
      "جميع الحصص الجماعية مشمولة مجاناً ضمن باقات العضوية السنوية ونصف السنوية.",
    disclaimerEn:
      "All group sessions are complimentary with Semi-Annual and Annual memberships.",
    bookBtnAr: "حجز مقعد في الحصة",
    bookBtnEn: "Reserve a Spot",
    ladiesBadgeAr: "خاص بالسيدات 100%",
    ladiesBadgeEn: "100% Ladies Only",
    allBadgeAr: "متاح للجميع",
    allBadgeEn: "Mixed / Open",
    trainerLabelAr: "المدرب",
    trainerLabelEn: "Coach",
    intensityLabelAr: "مستوى الشدة",
    intensityLabelEn: "Intensity",
    seatsLeftAr: "متبقي {n} مقاعد فقط",
    seatsLeftEn: "Only {n} spots left",
    days: [
      { id: "all", labelAr: "جميع الأيام", labelEn: "All Days" },
      { id: "sat", labelAr: "السبت", labelEn: "Saturday" },
      { id: "sun", labelAr: "الأحد", labelEn: "Sunday" },
      { id: "mon", labelAr: "الإثنين", labelEn: "Monday" },
      { id: "tue", labelAr: "الثلاثاء", labelEn: "Tuesday" },
      { id: "wed", labelAr: "الأربعاء", labelEn: "Wednesday" },
      { id: "thu", labelAr: "الخميس", labelEn: "Thursday" },
    ],
    classes: [
      {
        id: 1,
        titleAr: "حرق دهون مكثف (HIIT)",
        titleEn: "High-Intensity Fat Burn (HIIT)",
        trainerAr: "كوتش خالد",
        trainerEn: "Coach Khalid",
        timeAr: "08:00 ص - 09:00 ص",
        timeEn: "08:00 AM - 09:00 AM",
        dayId: "sat",
        intensityAr: "عالي جداً",
        intensityEn: "Very High",
        seatsLeft: 4,
        isLadiesOnly: false,
      },
      {
        id: 2,
        titleAr: "بيلاتس ونحت القوام",
        titleEn: "Pilates & Core Sculpt",
        trainerAr: "كوتش سارة",
        trainerEn: "Coach Sara",
        timeAr: "10:00 ص - 11:00 ص",
        timeEn: "10:00 AM - 11:00 AM",
        dayId: "sat",
        intensityAr: "متوسط",
        intensityEn: "Moderate",
        seatsLeft: 2,
        isLadiesOnly: true,
      },
      {
        id: 3,
        titleAr: "كروس فيت وقوة بدنية",
        titleEn: "CrossFit & Athletic Power",
        trainerAr: "كوتش ماركوس",
        trainerEn: "Coach Marcus",
        timeAr: "05:00 م - 06:15 م",
        timeEn: "05:00 PM - 06:15 PM",
        dayId: "sun",
        intensityAr: "عالي جداً",
        intensityEn: "Very High",
        seatsLeft: 6,
        isLadiesOnly: false,
      },
      {
        id: 4,
        titleAr: "يوغا واستشفاء مرن",
        titleEn: "Restorative Yoga & Flow",
        trainerAr: "كوتش ليلى",
        trainerEn: "Coach Layla",
        timeAr: "06:30 م - 07:30 م",
        timeEn: "06:30 PM - 07:30 PM",
        dayId: "sun",
        intensityAr: "هادئ",
        intensityEn: "Low / Restorative",
        seatsLeft: 5,
        isLadiesOnly: true,
      },
      {
        id: 5,
        titleAr: "سبينينغ وتحدي الدراجات",
        titleEn: "RPM Sprint & Spin Challenge",
        trainerAr: "كوتش عمر",
        trainerEn: "Coach Omar",
        timeAr: "07:00 م - 08:00 م",
        timeEn: "07:00 PM - 08:00 PM",
        dayId: "mon",
        intensityAr: "عالي",
        intensityEn: "High",
        seatsLeft: 3,
        isLadiesOnly: false,
      },
      {
        id: 6,
        titleAr: "تدريب الملاكمة الوظيفي",
        titleEn: "Functional Boxing Conditioning",
        trainerAr: "كوتش طارق",
        trainerEn: "Coach Tariq",
        timeAr: "06:00 م - 07:00 م",
        timeEn: "06:00 PM - 07:00 PM",
        dayId: "tue",
        intensityAr: "عالي",
        intensityEn: "High",
        seatsLeft: 5,
        isLadiesOnly: false,
      },
    ],
  },
  // داده‌های کادر مربیان بین‌المللی
  trainers: {
    badgeAr: "نخبة التدريب الاحترافي",
    badgeEn: "Master Level Coaching",
    titleAr: "نخبة من خيرة المدربين الدوليين",
    titleEn: "Internationally Accredited Master Coaches",
    subtitleAr:
      "فريق معتمد بأعلى شهادات التدريب العالمية لمرافقتك خطوة بخطوة نحو هدفك",
    subtitleEn:
      "Globally certified fitness specialists dedicated to personalizing your transformation journey",
    credentialsLabelAr: "الاعتمادات والشهادات الدولية",
    credentialsLabelEn: "Accreditations & Certifications",
    specialtyLabelAr: "التخصص",
    specialtyLabelEn: "Specialty",
    bookConsultBtnAr: "طلب جلسة تقييم مع المدرب",
    bookConsultBtnEn: "Book 1-on-1 Assessment",
    items: [
      {
        id: 1,
        nameAr: "كوتش خالد السعيد",
        nameEn: "Coach Khalid Al-Saeed",
        roleAr: "كبير مدربي القوة والإعداد البدني",
        roleEn: "Head of Strength & Conditioning",
        experienceAr: "+10 سنوات خبرة",
        experienceEn: "10+ Years Exp.",
        specialtyAr: "كمال الأجسام والقوة الانفجارية",
        specialtyEn: "Hypertrophy & Explosive Power",
        credentials: [
          "ISSA Certified Master Trainer",
          "CSCS Specialist",
          "REPs Level 4",
        ],
        image: "/images/coach-2.webp",
      },
      {
        id: 2,
        nameAr: "كوتش نورة المنصور",
        nameEn: "Coach Noura Al-Mansoor",
        roleAr: "أخصائية تدريب نسائي وبيلاتس",
        roleEn: "Ladies Specialist & Pilates Director",
        experienceAr: "+7 سنوات خبرة",
        experienceEn: "7+ Years Exp.",
        specialtyAr: "نحت القوام والتأهيل الحركي",
        specialtyEn: "Core Sculpting & Posture Rehab",
        credentials: [
          "NASM Certified Personal Trainer",
          "Comprehensive Pilates Certified",
          "Pre/Post Natal Fitness",
        ],
        image: "/images/coach-lady.jpg",
      },
      {
        id: 3,
        nameAr: "كوتش ماركوس سيلفا",
        nameEn: "Coach Marcus Silva",
        roleAr: "بطل ومدرب أداء وظيفي وكروس فت",
        roleEn: "Functional Performance & CrossFit Lead",
        experienceAr: "+12 سنة خبرة",
        experienceEn: "12+ Years Exp.",
        specialtyAr: "اللياقة الوظيفية ورفع الأثقال",
        specialtyEn: "Olympic Lifting & Athletic Agility",
        credentials: [
          "CrossFit Level 3 Trainer",
          "Olympic Weightlifting USAW",
          "Precision Nutrition Level 1",
        ],
        image: "/images/test.jpg",
      },
    ],
  },
  // داده‌های جامع نظرات اعضا (Google Maps Verified Reviews)
  testimonials: {
    badgeAr: "آراء وتجارب الأعضاء الموثقة",
    badgeEn: "Verified Member Experiences",
    titleAr: "ماذا يقول أعضاؤنا ونخبة رياضيينا؟",
    titleEn: "What Our Athletes & Members Say",
    subtitleAr:
      "قصص وتجارب حقيقية توثق رحلة الالتزام والنتائج داخل صالات برايم فيت في أنحاء المنطقة",
    subtitleEn:
      "Authentic member stories documenting dedication and physical transformation across our premier clubs.",
    googleRatingTextAr: "أكثر من 850+ تقييم معتمد على خرائط Google",
    googleRatingTextEn: "Over 850+ verified Google Maps reviews",
    ctaAr: "احجز تصريحك اليومي المجاني وانضم لأبطالنا",
    ctaEn: "Claim Your Free Day Pass & Join Our Champions",
    reviews: [
      {
        id: 1,
        authorAr: "سلطان العتيبي",
        authorEn: "Sultan Al-Otaibi",
        locationAr: "الرياض",
        locationEn: "Riyadh",
        membershipTierAr: "باقة النخبة VIP",
        membershipTierEn: "Black Diamond VIP",
        memberSinceAr: "عضو منذ سنة",
        memberSinceEn: "Member for 1 Year",
        rating: 5,
        reviewTextAr:
          "أفضل نادي رياضي دخلته بلا مبالغة. الأجهزة من هامر سترينث وتكنوجيم بأعلى المواصفات، وغرف الاستشفاء بعد حصص التدريب المكثف تصنع فارقاً حقيقياً في سرعة التعافي.",
        reviewTextEn:
          "Hands down the finest club in the region. Hammer Strength and Technogym rigs are pristine, and the cold plunge suites after heavy sessions accelerate recovery immensely.",
      },
      {
        id: 2,
        authorAr: "مها الدوسري",
        authorEn: "Maha Al-Dossari",
        locationAr: "الرياض",
        locationEn: "Riyadh",
        membershipTierAr: "القسم النسائي المستقل",
        membershipTierEn: "Ladies-Only Wing",
        memberSinceAr: "عضوة منذ 8 أشهر",
        memberSinceEn: "Member for 8 Months",
        rating: 5,
        reviewTextAr:
          "الخصوصية التامة في قسم السيدات هي السبب الأول في استمراري. المدخل منفصل تماماً، والمدربات محترفات لأبعد حد ويتابعن الأداء خطوة بخطوة في حصص البيلاتس والكارديو.",
        reviewTextEn:
          "Complete privacy in the women's facility keeps me consistent. Dedicated access, top-tier certified female coaches, and attentive instruction during Pilates classes.",
      },
      {
        id: 3,
        authorAr: "فهد الحربي",
        authorEn: "Fahad Al-Harbi",
        locationAr: "جدة",
        locationEn: "Jeddah",
        membershipTierAr: "عضوية سنوية كاملة",
        membershipTierEn: "Annual All-Access",
        memberSinceAr: "عضو منذ 6 أشهر",
        memberSinceEn: "Member for 6 Months",
        rating: 5,
        reviewTextAr:
          "النظافة على مدار الساعة ومستوى التكييف ممتاز حتى في أوقات الذروة. تطبيق التقييم البدني الدوري مع المدربين جعلني أخسر 14 كجم بأمان وبدون حرمان.",
        reviewTextEn:
          "Impeccable hygiene and great airflow even at peak hours. Routine InBody assessments with my coach helped me drop 14kg safely without extreme restrictions.",
      },
      {
        id: 4,
        authorAr: "د. ريم المهندي",
        authorEn: "Dr. Reem Al-Mohannadi",
        locationAr: "الدوحة",
        locationEn: "Doha",
        membershipTierAr: "عضوية البلاتينيوم",
        membershipTierEn: "Platinum Tier",
        memberSinceAr: "عضوة منذ سنتين",
        memberSinceEn: "Member for 2 Years",
        rating: 5,
        reviewTextAr:
          "أكثر ما يميز النادي هو الهدوء والبيئة الراقية البعيدة عن الازدحام. استوديو اليوغا ومناطق الاسترخاء والساونا أصبحت جزءاً لا يتجزأ من روتيني الأسبوعي بعد العمل.",
        reviewTextEn:
          "What truly sets this club apart is the tranquil, uncrowded atmosphere. The yoga sanctuary and Finnish sauna are essential parts of my post-work decompression.",
      },
      {
        id: 5,
        authorAr: "عمر الكندري",
        authorEn: "Omar Al-Kandari",
        locationAr: "مدينة الكويت",
        locationEn: "Kuwait City",
        membershipTierAr: "باقة القوة ورفع الأثقال",
        membershipTierEn: "Powerlifting Tier",
        memberSinceAr: "عضو منذ 10 أشهر",
        memberSinceEn: "Member for 10 Months",
        rating: 5,
        reviewTextAr:
          "منصات الرفع الأولمبي مجهزة بأوزان Eleiko معتمدة وأرضيات ممتصة للصدمات بمعايير عالمية. مستحيل تجد مثل هذه التجهيزات الاحترافية في الصالات التجارية العادية.",
        reviewTextEn:
          "Olympic lifting platforms equipped with calibrated Eleiko bumper plates. You simply cannot find this standard in ordinary commercial gym franchises.",
      },
      {
        id: 6,
        authorAr: "خالد بن منصور",
        authorEn: "Khalid Bin Mansoor",
        locationAr: "دبي",
        locationEn: "Dubai",
        membershipTierAr: "باقة النخبة السنوية",
        membershipTierEn: "VIP Annual",
        memberSinceAr: "عضو منذ سنة ونصف",
        memberSinceEn: "Member for 1.5 Years",
        rating: 5,
        reviewTextAr:
          "مزيج متكامل من اللياقة والاستشفاء. حوض الثلج وغرفة البخار بعد جلسة تمارين القوة يعيدان الحيوية للجسم خلال دقائق. خدمة الاستقبال والموظفين على أعلى درجات الاحترافية.",
        reviewTextEn:
          "The ultimate balance of high performance and thermal recovery. Ice bath and steam post-workout re-energize the body in minutes. Hospitality is world-class.",
      },
      {
        id: 7,
        authorAr: "يوسف النعيمي",
        authorEn: "Yousef Al-Nuaimi",
        locationAr: "المنامة",
        locationEn: "Manama",
        membershipTierAr: "باقة الأداء الوظيفي",
        membershipTierEn: "Functional Performance",
        memberSinceAr: "عضو منذ 5 أشهر",
        memberSinceEn: "Member for 5 Months",
        rating: 5,
        reviewTextAr:
          "المدربون لا يكتفون بإعطائك جدول تمارين، بل يتابعون تكنيك الحركات لتفادي الإصابات تماماً. رفعت طاقتي الإنتاجية ولياقتي القلبية بشكل ملحوظ.",
        reviewTextEn:
          "Coaches don't just hand you a workout routine; they correct bio-mechanics to prevent injury. My cardiovascular stamina and endurance surged notably.",
      },
      {
        id: 8,
        authorAr: "سارة المجالي",
        authorEn: "Sara Al-Majali",
        locationAr: "عمّان",
        locationEn: "Amman",
        membershipTierAr: "باقة اللياقة الشاملة",
        membershipTierEn: "Total Fitness Tier",
        memberSinceAr: "عضوة منذ 9 أشهر",
        memberSinceEn: "Member for 9 Months",
        rating: 5,
        reviewTextAr:
          "الأجواء مشجعة ومحفزة للغاية، والحصص الجماعية ممتعة جداً. من أفضل الاستثمارات التي قمت بها لصحتي النفسية والبدنية هذا العام.",
        reviewTextEn:
          "Electrifying community culture with motivating group classes. One of the highest-yield investments in my physical and mental wellness this year.",
      },
    ],
  },
  // داده‌های پلن‌های عضویت و قیمت‌گذاری
  pricing: {
    badgeAr: "خطط واضحة بدون رسوم خفية",
    badgeEn: "Transparent Plans, No Hidden Fees",
    titleAr: "باقات عضوية مصممة لتناسب أهدافك",
    titleEn: "Membership Tiers Built Around Your Goals",
    subtitleAr:
      "استثمر في صحتك مع خيارات اشتراك مرنة تشمل كافة المرافق وحصص التدريب الجماعية",
    subtitleEn:
      "Invest in your vitality with flexible memberships including full facility and studio class access.",
    promoBannerAr: "🔥 خصم خاص 20% بمناسبة الموسم الجديد لفترة محدودة!",
    promoBannerEn: "🔥 Limited Time: 20% Season Kick-off Privilege Applied!",
    guaranteeAr:
      "إمكانية استرجاع الرسوم خلال أول 7 أيام من بدء التفعيل وفق الشروط والأحكام.",
    guaranteeEn:
      "7-Day unconditional satisfaction guarantee from activation date.",
    selectPlanAr: "اختيار هذه الباقة",
    selectPlanEn: "Select This Plan",
    vatIncludedAr: "شامل الضريبة وكافة مرافق اللياقة",
    vatIncludedEn: "All-inclusive access & local taxes included",
    plans: [
      {
        id: "starter",
        nameAr: "الباقة الفضية (أساسية)",
        nameEn: "Silver Essential Tier",
        periodAr: "3 أشهر",
        periodEn: "3 Months",
        price: 499,
        badgeAr: null,
        badgeEn: null,
        isPopular: false,
        featuresAr: [
          "دخول كامل لمنطقة كمال الأجسام والكارديو",
          "استخدام غرف الساونا والبخار",
          "تقييم بدني InBody مجاني عند التسجيل",
          "خزائن ملابس قياسية",
        ],
        featuresEn: [
          "Unlimited strength and cardio floor access",
          "Finnish sauna & steam suite access",
          "Complimentary initial InBody assessment",
          "Standard secure locker access",
        ],
      },
      {
        id: "pro",
        nameAr: "الباقة الذهبية (الأكثر طلباً)",
        nameEn: "Gold Performance (Popular)",
        periodAr: "6 أشهر",
        periodEn: "6 Months",
        price: 899,
        badgeAr: "الأكثر اختياراً",
        badgeEn: "Most Popular",
        isPopular: true,
        featuresAr: [
          "كافة مميزات الباقة الفضية",
          "دخول غير محدود لجميع الحصص الجماعية",
          "جلستان مجانيتان مع مدرب شخصي معتمد",
          "إمكانية إيقاف (تجميد) الاشتراك لمدة 30 يوماً",
          "دخول منطقة الاستشفاء المائي وحوض الثلج",
        ],
        featuresEn: [
          "All Silver Tier privileges included",
          "Unlimited access to all group studio classes",
          "2 complimentary master personal training sessions",
          "Complimentary 30-day membership freeze",
          "Full cold plunge & wellness recovery access",
        ],
      },
      {
        id: "vip",
        nameAr: "باقة النخبة VIP السنوية",
        nameEn: "Black Diamond VIP Annual",
        periodAr: "12 شهراً",
        periodEn: "12 Months",
        price: 1499,
        badgeAr: "قيمة استثنائية",
        badgeEn: "Best Value",
        isPopular: false,
        featuresAr: [
          "كافة مميزات الباقة الذهبية",
          "جناح تدريب VIP واستقبال خاص",
          "تجميد الاشتراك مجاناً حتى 60 يوماً",
          "5 جلسات تدريب شخصي VIP",
          "خزانة خاصة باسم العضو ومستلزمات فاخرة",
          "تصاريح دخول مجانية شهرية لضيوفك",
        ],
        featuresEn: [
          "All Gold Tier privileges included",
          "Access to private VIP suites & priority lounge",
          "Up to 60-day flexible membership freeze",
          "5 bespoke personal coaching sessions",
          "Dedicated named locker & luxury amenities",
          "Complimentary monthly guest passes",
        ],
      },
    ],
  },
  // داده‌های سوالات متداول (FAQ)
  faq: {
    badgeAr: "كل ما تحتاج معرفته",
    badgeEn: "Everything You Need to Know",
    titleAr: "الأسئلة الشائعة",
    titleEn: "Frequently Asked Questions",
    subtitleAr:
      "إجابات واضحة على كل ما يهمك معرفته قبل بدء رحلتك التدريبية معنا",
    subtitleEn:
      "Clear, transparent answers to help you start your fitness journey with complete peace of mind.",
    supportTextAr: "لديك استفسار آخر لم تجد إجابته هنا؟",
    supportTextEn: "Have a specific question not covered here?",
    supportWaBtnAr: "تواصل مع فريق الاستقبال مباشرة عبر واتساب",
    supportWaBtnEn: "Chat Directly with Member Concierge on WhatsApp",
    items: [
      {
        qAr: "هل قسم السيدات معزول تماماً وبخصوصية 100%؟",
        qEn: "Is the ladies' area 100% private and fully segregated?",
        aAr: "نعم، قسم السيدات مصمم بمدخل وبوابات إلكترونية ذكية خاصة ومنفصلة كلياً، وكافة الطواقم من موظفات استقبال ومدربات وعاملات نظافة من الكوادر النسائية المعتمدة.",
        aEn: "Yes, our women's facility features dedicated private access, biometric gates, and an all-female staff and coaching roster with 100% visual privacy.",
      },
      {
        qAr: "كيف يمكنني الحصول على تجربة اليوم الواحد المجانية؟",
        qEn: "How do I claim and activate my complimentary 1-day pass?",
        aAr: "يمكنك ببساطة تعبئة نموذج التسجيل في أسفل الصفحة أو التواصل معنا مباشرة عبر واتساب، وسيتم إرسال باركود التصريح اليومي المجاني إلى هاتفك فوراً لزيارة النادي وتجربة كافة المرافق.",
        aEn: "Simply submit your information in the quick form below or message us via WhatsApp. Our team will issue a digital QR guest pass directly to your phone.",
      },
      {
        qAr: "ما هي سياسة تجميد (إيقاف) الاشتراك في حال السفر أو الظروف الخاصة؟",
        qEn: "What is the membership freeze policy for travel or medical reasons?",
        aAr: "تتيح باقات 6 أشهر وسنة خاصية تجميد العضوية مجاناً (من 30 إلى 60 يوماً حسب الباقة)، ويمكن تفعيلها بسهولة عبر التواصل مع مكتب خدمة الأعضاء.",
        aEn: "Semi-annual and annual memberships include complimentary freeze allowances (30 to 60 days depending on your tier), activatable anytime via WhatsApp.",
      },
      {
        qAr: "هل تتوفر مواقف سيارات خاصة للمشتركين؟",
        qEn: "Is on-site parking available for members?",
        aAr: "نعم، يوفر النادي مواقف سيارات فسيحة ومظللة مجاناً لجميع الأعضاء، مع خدمة صف السيارات (Valet Parking) لحاملي باقات الـ VIP.",
        aEn: "Yes, spacious covered parking is complimentary for all members, with complimentary valet concierge for VIP tier holders.",
      },
      {
        qAr: "هل تتضمن الاشتراكات استشارات غذائية وتدريبية؟",
        qEn: "Are nutrition guidance and body composition scans included?",
        aAr: "نعم، يحصل كل عضو جديد على جلسة فحص تركيب الجسم InBody واستشارة تقييم أولي مع كوتش معتمد لتحديد الجدول المناسب لاحتياجه.",
        aEn: "Yes, every member receives a complimentary InBody clinical scan and initial goal-setting assessment with a certified coach upon onboarding.",
      },
    ],
  },
  calculator: {
    badgeAr: "محاكي التحول البدني الذكي",
    badgeEn: "Smart Transformation Simulator",
    titleAr: "محاكاة نتائج التحول البدني لخطة 8 أسابيع",
    titleEn: "8-Week Body Transformation & Calorie Blueprint",
    subtitleAr:
      "تقدير علمي يعتمد على معادلة ميفلين سانت جور مع احتساب تأثير الحصة التدريبية المختارة ومستوى الالتزام الغذائي",
    subtitleEn:
      "Scientific estimation based on the Mifflin-St Jeor formula, factoring in your selected training class and nutritional commitment.",
    genderLabelAr: "الجنس",
    genderLabelEn: "Gender",
    maleAr: "ذكر",
    maleEn: "Male",
    femaleAr: "أنثى",
    femaleEn: "Female",
    ageLabelAr: "العمر (سنة)",
    ageLabelEn: "Age (Years)",
    heightLabelAr: "الطول (سم)",
    heightLabelEn: "Height (cm)",
    weightLabelAr: "الوزن الحالي (كجم)",
    weightLabelEn: "Current Weight (kg)",
    activityLabelAr: "مستوى النشاط اليومي",
    activityLabelEn: "Activity Level",
    activityLevels: [
      {
        value: "1.2",
        labelAr: "خامل (قليل الحركة أو عمل مكتبي)",
        labelEn: "Sedentary (Office work, little exercise)",
      },
      {
        value: "1.375",
        labelAr: "نشاط خفيف (تمارين 1-3 أيام أسبوعياً)",
        labelEn: "Light Activity (Exercise 1-3 days/wk)",
      },
      {
        value: "1.55",
        labelAr: "نشاط متوسط (تمارين 3-5 أيام أسبوعياً)",
        labelEn: "Moderate (Exercise 3-5 days/wk)",
      },
      {
        value: "1.725",
        labelAr: "نشاط عالي (تمارين شاقة 6-7 أيام أسبوعياً)",
        labelEn: "Very Active (Hard exercise 6-7 days/wk)",
      },
    ],
    goalLabelAr: "الهدف البدني الرئيسي",
    goalLabelEn: "Primary Goal",
    goals: [
      {
        id: "cut",
        labelAr: "خسارة دهون وتنشيف (عجز سعرات مدروس)",
        labelEn: "Fat Loss & Cut (Targeted Deficit)",
      },
      {
        id: "maintain",
        labelAr: "المحافظة على الوزن وتحسين اللياقة",
        labelEn: "Weight Maintenance & Conditioning",
      },
      {
        id: "bulk",
        labelAr: "زيادة كتلة عضلية وبناء (فائض سعرات مُحكم)",
        labelEn: "Lean Muscle Bulk (Controlled Surplus)",
      },
    ],

    // انتخاب کلاس باشگاه و تأثیر فیزیولوژیک
    classLabelAr: "الحصة التدريبية بالنادي",
    classLabelEn: "Selected Gym Class",
    classSubtextAr: "تأثير مباشر على البناء العضلي ومعدل الحرق",
    classSubtextEn: "Direct impact on muscle hypertrophy & metabolic burn",
    defaultClassOptionAr: "حصص اللياقة العامة",
    defaultClassOptionEn: "General Fitness Classes",

    // گزینه‌های تعهد به رژیم غذایی
    dietLabelAr: "الخطة والنظام الغذائي",
    dietLabelEn: "Nutrition & Diet Plan",

    dietOptions: [
      {
        id: "pro",
        labelAr: "نظام غذائي بإشراف المدرب + مكملات (أعلى فاعلية)",
        labelEn: "Coach Diet + Supplements (Maximum Output)",
      },
      {
        id: "standard",
        labelAr: "نظام غذائي منزلي منضبط (تقدم متوازن)",
        labelEn: "Controlled Home Diet (Balanced Progress)",
      },
      {
        id: "none",
        labelAr: "بدون نظام محدد / وجبات عادية (نتائج محدودة)",
        labelEn: "No Strict Diet / Casual (Minimal Progress)",
      },
    ],

    calculateBtnAr: "محاكاة خارطة التحول وحساب المؤشرات",
    calculateBtnEn: "Simulate Transformation Roadmap & Metrics",
    resultsBadgeAr: "النتائج الفسيولوجية التقديرية بنهاية 8 أسابيع",
    resultsBadgeEn: "Projected 8-Week Physiological Outcomes",
    projectedWeightLabelAr: "وزنك التقديري الجديد بنهاية الأسبوع الثامن",
    projectedWeightLabelEn: "Projected New Weight by Week 8",
    weightUnitAr: "كجم",
    weightUnitEn: "kg",
    weightChangeRangeTextAr: "تغير تقديري بين {min} إلى {max} كجم",
    weightChangeRangeTextEn: "Projected shift between {min} to {max} kg",

    // نقشه راه ۴ فازه تحول (Roadmap)
    roadmapTitleAr: "خارطة طريق التحول التدريجي (Milestone Roadmap)",
    roadmapTitleEn: "Step-by-Step Transformation Roadmap",
    milestonePhasePrefixAr: "الأسبوع {week} من 8",
    milestonePhasePrefixEn: "Week {week} of 8",
    milestones: {
      week2: {
        titleAr: "الأسبوع 2: مرحلة التكيف العضلي",
        titleEn: "Week 2: Muscular Adaptation",
        bulkNoteAr: "زيادة الشهية، تعزيز تدفق الجليكوجين وارتفاع طاقة الجسم",
        bulkNoteEn:
          "Increased appetite, glycogen uptake & elevated workout energy",
        cutNoteAr: "طرد احتباس السوائل الزائدة والشعور بخفة بدنية واضحة",
        cutNoteEn:
          "Shedding excess water retention & noticeable body lightness",
      },
      week4: {
        titleAr: "الأسبوع 4: مرحلة التثبيت الأيضي",
        titleEn: "Week 4: Metabolic Stabilization",
        bulkNoteAr:
          "ارتفاع ملحوظ في أوزان التمارين وبدء امتلاء الألياف العضلية",
        bulkNoteEn: "Notable strength gains & initial muscle fiber fullness",
        cutNoteAr: "انخفاض مقاسات محيط الخصر وتحسن كبير في كفاءة التنفس",
        cutNoteEn: "Visible waistline reduction & enhanced aerobic endurance",
      },
      week6: {
        titleAr: "الأسبوع 6: مرحلة بروز المعالم البدنية",
        titleEn: "Week 6: Aesthetic Definition",
        bulkNoteAr: "بروز تقسيم عضلات الأكتاف والذراعين مع زيادة كثافة العضل",
        bulkNoteEn: "Defined shoulder & arm lines with denser muscle mass",
        cutNoteAr: "ظهور خطوط عضلات البطن وتحسن ملحوظ في نقاء ومرونة الجلد",
        cutNoteEn: "Abdominal definition emerges with firmer skin quality",
      },
      week8: {
        titleAr: "الأسبوع 8: ذروة التحول وتثبيت النتائج",
        titleEn: "Week 8: Peak Transformation",
        bulkNoteAr:
          "تثبيت الكتلة العضلية المكتسبة وزيادة دائمية في القوة البدنية",
        bulkNoteEn:
          "Stabilizing newly gained muscle mass with lasting peak strength",
        cutNoteAr: "الوصول لأفضل نسبة دهون مع أقصى وضوح وتقسيم عضلي",
        cutNoteEn:
          "Achieving target body fat percentage with peak muscle definition",
      },
    },

    // کارت‌های متریک
    bmiLabelAr: "مؤشر كتلة الجسم الحالي (BMI)",
    bmiLabelEn: "Current BMI Index",
    targetBmiLabelAr: "BMI المستهدف بالأسبوع 8",
    targetBmiLabelEn: "Target BMI by Week 8",
    caloriesLabelAr: "السعرات اليومية المستهدفة",
    caloriesLabelEn: "Target Daily Calories",
    tdeeLabelAr: "إجمالي الأيض اليومي (TDEE)",
    tdeeLabelEn: "Total Daily Expenditure (TDEE)",
    proteinLabelAr: "البروتين اليومي الموصى به",
    proteinLabelEn: "Suggested Daily Protein",
    dailyUnitAr: "سعرة / يوم",
    dailyUnitEn: "kcal / day",
    proteinUnitAr: "جرام / يوم",
    proteinUnitEn: "g / day",

    // برچسب‌های تفکیک نوع تمرین
    strengthTagAr: "تركيز فائق على التضخيم العضلي وزيادة القوة (Hypertrophy)",
    strengthTagEn: "High-focus on hypertrophy & mechanical tension",
    cardioTagAr: "تركيز عالي على حرق الدهون ورفع اللياقة اللاهوائية (HIIT)",
    cardioTagEn: "Maximum metabolic conditioning & peak calorie burn",
    mobilityTagAr: "تركيز على تقوية عضلات الجذع، المرونة وتعديل القوام",
    mobilityTagEn: "Core stabilization, posture alignment & flexibility",
    generalTagAr: "تمارين شاملة لرفع اللياقة البدنية والتحمل",
    generalTagEn: "General physical conditioning & functional fitness",

    // اکشن‌ها
    bookClassBtnTextAr: "حجز مقعد في حصة {title}",
    bookClassBtnTextEn: "Book Seat in {title}",
    sendWhatsappBtnAr: "إرسال تقرير التحول للمدرب عبر واتساب",
    sendWhatsappBtnEn: "Send Transformation Report to Coach via WhatsApp",
  },
};
