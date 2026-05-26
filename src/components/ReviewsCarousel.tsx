'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_REVIEWS } from '@/lib/data';

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = MOCK_REVIEWS.length;

  // How many cards visible based on screen — JS fallback, CSS handles visually
  const visibleCount = 3; // desktop shows 3

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  // Get visible reviews (circular)
  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(MOCK_REVIEWS[(current + i) % total]);
    }
    return items;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500">
        {getVisible().map((review, idx) => (
          <div
            key={`${review._id}-${idx}`}
            className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 flex flex-col h-full hover:bg-white/15 transition-all duration-300"
            style={{
              opacity: 1,
              animation: 'fadeSlide 0.5s ease forwards',
            }}
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < review.rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-white/20'}`}
                />
              ))}
            </div>

            <div className="text-4xl font-serif text-[#d4af37]/50 leading-none select-none mb-3">"</div>
            <p className="text-white/85 text-sm font-paragraph leading-relaxed flex-1 italic">
              {review.reviewText}
            </p>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-white font-heading font-semibold text-sm">{review.reviewerName}</span>
              <span className="text-white/40 text-[10px] font-paragraph">
                {new Date(review.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next buttons */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {MOCK_REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-1.5 bg-[#d4af37]'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-200"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <style jsx global>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}