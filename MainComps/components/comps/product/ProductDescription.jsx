"use client";

import { useState } from "react";
import MainText from "../MainTextComponent";

export default function ProductDescription({ product }) {
  const [openSection, setOpenSection] = useState("description");

  const sections = [
    {
      id: "description",
      title: "Description",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: product.description ? (
        <MainText as="p" className="text-base leading-relaxed text-slate-600">
          {product.description}
        </MainText>
      ) : (
        <MainText className="text-slate-500">No description available</MainText>
      ),
    },
    {
      id: "benefits",
      title: "Key Benefits",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      content: product.benefits && product.benefits.length > 0 ? (
        <ul className="space-y-2 text-base text-slate-600">
          {product.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-600" />
              <MainText>{benefit}</MainText>
            </li>
          ))}
        </ul>
      ) : (
        <MainText className="text-slate-500">No benefits information available</MainText>
      ),
    },
    {
      id: "ingredients",
      title: "Active Ingredients",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      content: product.ingredients && product.ingredients.length > 0 ? (
        <ul className="space-y-2 text-base text-slate-600">
          {product.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-600" />
              <MainText>{ingredient}</MainText>
            </li>
          ))}
        </ul>
      ) : (
        <MainText className="text-slate-500">No ingredients information available</MainText>
      ),
    },
    {
      id: "usage",
      title: "How To Use",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      content: product.usageInstructions ? (
        <MainText as="p" className="text-base leading-relaxed text-slate-600">
          {product.usageInstructions}
        </MainText>
      ) : (
        <MainText className="text-slate-500">No usage instructions available</MainText>
      ),
    },
  ];

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Accordion Sections */}
        <div className="space-y-2">
          {sections.map((section) => (
            <div key={section.id} className="border border-slate-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-600">{section.icon}</span>
                  <MainText className="font-semibold text-slate-900">{section.title}</MainText>
                </div>
                <svg
                  className={`h-5 w-5 text-slate-600 transition-transform ${
                    openSection === section.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openSection === section.id && (
                <div className="px-6 pb-4">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
