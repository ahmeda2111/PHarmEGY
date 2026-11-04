"use client";

import MainText from "../MainTextComponent";

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ record }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <MainText className="font-semibold text-slate-900">
            {record.name}
          </MainText>
          <div className="mt-1 flex items-center gap-3">
            <StarRating rating={record.rating} />
            <MainText className="text-sm text-slate-500">
              {record.date}
            </MainText>
          </div>
        </div>
      </div>
      <MainText as="p" className="flex-1 text-slate-600">
        {record.comment}
      </MainText>
    </div>
  );
}
