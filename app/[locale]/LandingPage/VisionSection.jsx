"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const VisionSection = () => {
  const t = useTranslations("vision");

  return (
    <section 
      id="vision"
      className="py-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-white to-teal-50 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 opacity-10 z-0">
          <Image
            src="/assets/images/ai-chip.png"
            alt="AI Chip"
            width={300}
            height={300}
            className="rotate-12"
          />
        </div>

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-teal-500 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative z-10">
          {t.raw("goals").map((goal, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-teal-400 p-6 text-right h-full"
            >
              <h3 className="text-xl font-bold text-indigo-900 mb-3">
                {goal.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {goal.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-indigo-900 rounded-2xl p-8 md:p-12 text-white relative z-10">
          <h4 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Numbers We're Proud Of
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {t.raw("stats").map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;