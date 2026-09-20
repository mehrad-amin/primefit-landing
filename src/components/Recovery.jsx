import { clubData } from "../config/clubData.js";
import { Snowflake, Flame, Wind, Activity, Sparkles } from "lucide-react";

export default function Recovery({ lang = "ar" }) {
  if (!clubData.features.showRecovery) return null;

  const isAr = lang === "ar";
  const { recovery } = clubData;

  const iconMap = {
    snowflake: Snowflake,
    flame: Flame,
    wind: Wind,
    activity: Activity,
  };

  return (
    <section
      id="recovery"
      className="py-24 bg-dark-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* تیتر بخش */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-850 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? recovery.badgeAr : recovery.badgeEn}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? recovery.titleAr : recovery.titleEn}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {isAr ? recovery.subtitleAr : recovery.subtitleEn}
          </p>
        </div>

        {/* کارت‌های ۴ گانه خدمات ریکاوری */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recovery.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Activity;
            return (
              <div
                key={idx}
                className="bg-dark-900 border border-neutral-800/80 hover:border-gold-500/40 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-dark-950 transition-colors duration-300 mb-5">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
