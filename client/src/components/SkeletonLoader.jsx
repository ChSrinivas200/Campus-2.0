import React from 'react';

export function SkeletonCard() {
  return (
    <div className="bg-white brutal-border rounded-2xl p-5 space-y-4 shadow-[4px_4px_0px_#121212]">
      {/* Top Header Row */}
      <div className="flex justify-between items-start">
        <div className="w-28 h-6 bg-stone-200 rounded-full animate-pulse brutal-border-2" />
        <div className="w-16 h-6 bg-stone-200 rounded-full animate-pulse brutal-border-2" />
      </div>

      {/* Title */}
      <div className="w-3/4 h-7 bg-stone-200 rounded-lg animate-pulse" />

      {/* Description */}
      <div className="space-y-2">
        <div className="w-full h-3.5 bg-stone-100 rounded animate-pulse" />
        <div className="w-5/6 h-3.5 bg-stone-100 rounded animate-pulse" />
      </div>

      {/* Venue & Timing */}
      <div className="pt-2 space-y-2 border-t-2 border-dashed border-stone-200">
        <div className="w-1/2 h-3.5 bg-stone-100 rounded animate-pulse" />
        <div className="w-2/3 h-3.5 bg-stone-100 rounded animate-pulse" />
      </div>

      {/* Prize Box */}
      <div className="p-3 bg-[#F8F5EE] rounded-xl space-y-2 brutal-border-2">
        <div className="w-1/3 h-3.5 bg-stone-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 bg-stone-200 rounded animate-pulse" />
          <div className="h-8 bg-stone-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="pt-2 flex gap-2">
        <div className="flex-1 h-9 bg-stone-200 rounded-xl animate-pulse brutal-border-2" />
        <div className="w-20 h-9 bg-stone-200 rounded-xl animate-pulse brutal-border-2" />
      </div>
    </div>
  );
}

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
