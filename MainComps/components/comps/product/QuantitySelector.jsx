"use client";

import { useState } from "react";
import MainText from "../MainTextComponent";

export default function QuantitySelector({ initialQuantity = 1, onChange }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange?.(newQuantity);
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 p-2">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <MainText className="min-w-[40px] text-center text-lg font-medium text-slate-900">
        {quantity}
      </MainText>
      <button
        onClick={handleIncrease}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600"
        aria-label="Increase quantity"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
