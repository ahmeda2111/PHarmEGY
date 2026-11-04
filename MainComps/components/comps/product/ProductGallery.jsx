"use client";

import { useState } from "react";
import MainText from "../MainTextComponent";

export default function ProductGallery({ images = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentImages = images.length > 0 ? images : [];
  const hasImages = currentImages.length > 0;
  const currentImage = hasImages ? currentImages[currentImageIndex] : null;

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-50">
        {hasImages ? (
          <img
            src={currentImage}
            alt="Product"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <MainText className="text-gray-400">Product has no image</MainText>
          </div>
        )}

        {/* Navigation Arrows */}
        {hasImages && currentImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-md hover:bg-white"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-md hover:bg-white"
              aria-label="Next image"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Zoom Icon */}
        {hasImages && (
          <button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-md hover:bg-white"
            aria-label="Zoom"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && currentImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {currentImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 aspect-square w-20 rounded-lg border-2 object-cover ${
                index === currentImageIndex
                  ? "border-[#A66D2B]"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
