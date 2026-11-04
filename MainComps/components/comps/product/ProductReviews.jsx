"use client";

import MainText from "../MainTextComponent";
import List from "../ListComponent";

// TODO: Replace with actual API data when available
const mockReviews = [
  {
    id: 1,
    name: "Ahmed Mohamed",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent product! Very effective and exactly as described. Highly recommended.",
  },
  {
    id: 2,
    name: "Sara Ali",
    rating: 4,
    date: "2024-01-10",
    comment: "Good quality product. Shipping was fast and packaging was secure.",
  },
  {
    id: 3,
    name: "Omar Hassan",
    rating: 5,
    date: "2024-01-05",
    comment: "Amazing results! I've been using this for a month and it's perfect.",
  },
  {
    id: 4,
    name: "Nour Ahmed",
    rating: 4,
    date: "2024-01-02",
    comment: "Very satisfied with the quality. Will definitely order again.",
  },
  {
    id: 5,
    name: "Karim Mostafa",
    rating: 5,
    date: "2023-12-28",
    comment: "Best product I've used. Fast delivery and great customer service.",
  },
];

export default function ProductReviews() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
          <MainText className="text-xl font-semibold text-slate-900">
            Customer Reviews
          </MainText>
          <MainText className="text-sm text-slate-600">
            {mockReviews.length} reviews
          </MainText>
        </div>

        {/* Reviews List with Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-80"
            >
              <List
                view="cards"
                item="reviewCard"
                data={[review]}
                loading={false}
                empty=""
                layoutClassName="grid grid-cols-1"
                skeletonClassName="h-48"
              />
            </div>
          ))}
        </div>

        {/* Add Review Button */}
        <div className="mt-8 text-center">
          <MainText className="text-sm text-slate-500">
            More reviews coming soon...
          </MainText>
        </div>
      </div>
    </div>
  );
}
