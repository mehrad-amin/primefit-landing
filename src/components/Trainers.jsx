"use client";

import { clubData } from "../config/clubData.js";
import { Award, CheckCircle, MessageSquare } from "lucide-react";

export default function Trainers({ lang = "ar", onSelectTrainer }) {
  if (!clubData.features.showTrainers) return null;

  const isAr = lang === "ar";
  const { trainers } = clubData;

  const handleTrainerClick = (trainer) => {
    const trainerName = isAr
      ? trainer.nameAr || trainer.name || trainer.nameEn
      : trainer.nameEn || trainer.name || trainer.nameAr;

    const trainerRole = isAr
      ? trainer.roleAr || trainer.role || trainer.roleEn
      : trainer.roleEn || trainer.role || trainer.roleAr;

    if (onSelectTrainer) {
      onSelectTrainer({
        id: trainer.id,
        title: isAr
          ? trainer.nameAr || trainer.name
          : trainer.nameEn || trainer.name,
        role: isAr
          ? trainer.roleAr || trainer.role
          : trainer.roleEn || trainer.role,
      });
    }
  };

  return (
    <section
      id="trainers"
      className="py-24 bg-dark-950 relative border-t border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* تیتر بخش */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-850 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>{isAr ? trainers.badgeAr : trainers.badgeEn}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? trainers.titleAr : trainers.titleEn}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {isAr ? trainers.subtitleAr : trainers.subtitleEn}
          </p>
        </div>

        {/* گرید کارت‌های مربیان */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.items.map((trainer) => {
            const displayName = isAr
              ? trainer.nameAr || trainer.name || trainer.nameEn
              : trainer.nameEn || trainer.name || trainer.nameAr;

            const displayRole = isAr
              ? trainer.roleAr || trainer.role || trainer.roleEn
              : trainer.roleEn || trainer.role || trainer.roleAr;

            const displaySpecialty = isAr
              ? trainer.specialtyAr || trainer.specialty || trainer.specialtyEn
              : trainer.specialtyEn || trainer.specialty || trainer.specialtyAr;

            return (
              <div
                key={trainer.id}
                className="bg-dark-900 border border-neutral-800/90 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="relative h-80 w-full overflow-hidden bg-dark-800">
                    <img
                      src={trainer.image}
                      alt={displayName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent" />

                    <span className="absolute bottom-4 start-4 px-3 py-1 rounded-lg bg-dark-950/80 backdrop-blur-md text-gold-400 text-xs font-bold border border-gold-500/30 font-english">
                      {isAr ? trainer.experienceAr : trainer.experienceEn}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-gold-400 transition-colors">
                        {displayName}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        {displayRole}
                      </p>
                      <p className="text-xs font-semibold text-accent-emerald mt-1.5">
                        {isAr
                          ? trainers.specialtyLabelAr
                          : trainers.specialtyLabelEn}
                        :{" "}
                        <span className="text-neutral-200">
                          {displaySpecialty}
                        </span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                      <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider font-english">
                        {isAr
                          ? trainers.credentialsLabelAr
                          : trainers.credentialsLabelEn}
                      </span>
                      <div className="space-y-1.5">
                        {trainer.credentials.map((cert, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                            <span className="text-xs text-neutral-300 font-english font-medium">
                              {cert}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => handleTrainerClick(trainer)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-dark-850 hover:bg-gold-500 text-neutral-200 hover:text-dark-950 border border-neutral-700 hover:border-gold-500 text-xs font-bold transition-all duration-200 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      {isAr
                        ? trainers.bookConsultBtnAr
                        : trainers.bookConsultBtnEn}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
