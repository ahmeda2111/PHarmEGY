"use client";

import { useState, useEffect } from "react";
import MainText from "../MainTextComponent";
import MainButton from "../MainButton";
import QuantitySelector from "./QuantitySelector";
import { useSidebar } from "../../../hooks/useSidebar";

export default function ProductPurchaseSection({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const { openSidebar } = useSidebar();

  useEffect(() => {
    if (!product.offerExpiry) return;

    const targetDate = new Date(product.offerExpiry);
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [product.offerExpiry]);

  const handleAddToCart = () => {
    console.log("Add to cart:", product.id, quantity);
  };

  const handleBuyNow = () => {
    openSidebar("buyNow", { product, quantity });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Product Title */}
      <MainText as="h1" className="text-3xl font-bold text-slate-900">
        {product.name}
      </MainText>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <MainText className="text-3xl font-bold text-blue-600">
          LE {product.price || "0.00"}
        </MainText>
        <MainText className="text-sm text-slate-600">EGP</MainText>
      </div>

      {/* Quantity and Offer Section */}
      <div className="flex gap-4">
        <QuantitySelector onChange={setQuantity} />
        
        {/* Promotional Offer */}
        {product.offerExpiry ? (
          <div className="flex-1 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <span className="text-red-600">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </span>
              <MainText className="text-sm font-semibold text-red-600">
                {product.offerText || "Special Offer"}
              </MainText>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
              <MainText className="font-mono">
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </MainText>
              <MainText>remaining</MainText>
            </div>
          </div>
        ) : null}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <MainButton variant="primary" fullWidth onClick={handleAddToCart}>
          <MainText>Add to Cart</MainText>
        </MainButton>
        <MainButton variant="secondary" fullWidth onClick={handleBuyNow}>
          <MainText>Buy Now</MainText>
        </MainButton>
      </div>

      {/* Share */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <button onClick={handleShare} className="flex items-center gap-2 text-slate-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <MainText className="text-sm">Share Product</MainText>
        </button>
      </div>
    </div>
  );
}
