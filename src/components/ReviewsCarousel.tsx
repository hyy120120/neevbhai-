'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialCarousel = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rahul Mehta',
      role: 'Business Owner',
      review: 'Ordered a customized silver frame for our anniversary. The team at Neev Gifting was so helpful throughout the process. The final product exceeded our expectations.',
      rating: 5,
      date: 'Jan 2026',
      initials: 'RM',
    },
    {
      id: 2,
      name: 'Ananya Bose',
      role: 'Corporate Client',
      review: 'Got the Ganesh showpiece for Diwali gifting. It is pure silver and the weight and quality speak for themselves. Highly recommend Neev Gifting for premium gifting needs.',
      rating: 5,
      date: 'Nov 2025',
      initials: 'AB',
    },
    {
      id: 3,
      name: 'Deepika Nair',
      role: 'Wedding Planner',
      review: 'Ordered a wedding gift hamper and everyone at the wedding loved it! The packaging was luxurious and the silver items were of exceptional quality.',
      rating: 5,
      date: 'Mar 2026',
      initials: 'DN',
    },
    {
      id: 4,
      name: 'Vikram Shah',
      role: 'Entrepreneur',
      review: 'The craftsmanship on the silver idols is truly remarkable. Every detail was perfect and the delivery was prompt. Neev Gifting has become my go-to for premium gifts.',
      rating: 5,
      date: 'Feb 2026',
      initials: 'VS',
    },
    {
      id: 5,
      name: 'Priya Kapoor',
      role: 'Interior Designer',
      review: 'I gifted a silver photo frame to my parents on their anniversary and they were absolutely delighted. The quality is outstanding and the packaging made it feel truly special.',
      rating: 5,
      date: 'Dec 2025',
      initials: 'PK',
    },
    {
      id: 6,
      name: 'Arjun Menon',
      role: 'Corporate HR',
      review: 'We ordered bulk corporate gifts from Neev Gifting and the entire experience was seamless. Professional team, premium quality, and timely delivery. Highly recommended.',
      rating: 5,
      date: 'Jan 2026',
      initials: 'AM',
    },
    {
      id: 7,
      name: 'Sneha Reddy',
      role: 'Homemaker',
      review: 'The silver pooja set I ordered was absolutely divine. The intricate detailing and finish were beyond what I expected. Neev Gifting truly delivers luxury at its finest.',
      rating: 5,
      date: 'Feb 2026',
      initials: 'SR',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const total = reviews.length;
  const cardsPerSlide = 3;
  const maxSlides = Math.ceil(total / cardsPerSlide);

  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % maxSlides);
    }, 7000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, maxSlides]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const next = () => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % maxSlides);
  };

  const goToSlide = (index: number) => {
    pauseAutoPlay();
    setCurrentIndex(index);
  };

  const visibleCards = reviews.slice(currentIndex * cardsPerSlide, (currentIndex + 1) * cardsPerSlide);

  return (
    <section className="py-20 md:py-28 bg-[#F5F1E8]">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmerGold {
          0%, 100% {
            background-position: -1000px 0;
          }
          50% {
            background-position: 1000px 0;
          }
        }

        .card-enter {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }

        .card-enter:nth-child(1) {
          animation-delay: 0.1s;
        }

        .card-enter:nth-child(2) {
          animation-delay: 0.2s;
        }

        .card-enter:nth-child(3) {
          animation-delay: 0.3s;
        }

        .testimonial-card {
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.6s ease;
          pointer-events: none;
        }

        .testimonial-card:hover::before {
          left: 100%;
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 0 1px rgba(201, 168, 76, 0.3) inset;
        }

        .testimonial-card:hover .star-container {
          transform: scale(1.05);
        }

        .testimonial-card:hover .accent-line {
          width: 40px;
          opacity: 1;
        }

        .testimonial-card:hover .review-text {
          color: #1a3a2a;
        }

        .accent-line {
          width: 24px;
          height: 2px;
          background: linear-gradient(90deg, #C9A84C, #C9A84C80);
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0.6;
        }

        .star-container {
          transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          gap: 4px;
          justify-content: center;
        }

        .review-text {
          transition: color 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-button {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-button:hover {
          background: linear-gradient(135deg, #2D7A52 0%, #1a5a3a 100%);
          box-shadow: 0 12px 24px rgba(45, 122, 82, 0.25);
          transform: translateY(-2px);
        }

        .dot-button {
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .dot-button.active {
          animation: none;
        }

        .dot-button:not(.active):hover {
          transform: scale(1.3);
          box-shadow: 0 4px 12px rgba(201, 168, 76, 0.3);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-[#C9A84C]/40" />
            <span className="text-xs tracking-[0.2em] uppercase font-medium text-[#C9A84C]">
              Customer Reviews
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-[#C9A84C] to-[#C9A84C]/40" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a2a] mb-3 tracking-tight">
            Trusted by Luxury Seekers
          </h2>

          <p className="text-[#6b5e52] text-base md:text-lg max-w-2xl mx-auto">
            Experience exceptional craftsmanship and premium quality that has delighted discerning customers
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
          {visibleCards.map((review, idx) => (
            <div key={`${currentIndex}-${idx}`} className="card-enter">
              <div className="testimonial-card group relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-9 h-full flex flex-col justify-between border border-[#C9A84C]/15 hover:border-[#C9A84C]/30">
                {/* Top accent dot */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#C9A84C]/40 group-hover:bg-[#C9A84C]/70 transition-colors duration-700" />

                {/* Star Rating */}
                <div className="star-container mb-5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                  ))}
                </div>

                {/* Accent Line */}
                <div className="accent-line mb-5" />

                {/* Review Text */}
                <p className="review-text flex-1 text-[#4a3f37] text-sm md:text-base leading-relaxed font-light mb-7">
                  "{review.review}"
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-[#C9A84C]/20 via-[#C9A84C]/10 to-transparent mb-6" />

                {/* Customer Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2D7A52]/20 to-[#C9A84C]/10 rounded-full" />
                      <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#2D7A52]/15 to-[#C9A84C]/20 border border-[#C9A84C]/20 flex items-center justify-center">
                        <span className="text-[#2D7A52] font-semibold text-xs">{review.initials}</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#1a3a2a] font-semibold text-sm">{review.name}</p>
                      <p className="text-[#2D7A52] text-xs font-medium">{review.role}</p>
                    </div>
                  </div>
                  <p className="text-[#9b8b7e] text-xs">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
          <button
            onClick={prev}
            className="nav-button w-11 h-11 rounded-full border border-[#2D7A52]/30 bg-white/80 backdrop-blur-sm text-[#2D7A52] flex items-center justify-center hover:text-white"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-4">
            {Array.from({ length: maxSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`dot-button rounded-full transition-all duration-700 ${
                  idx === currentIndex
                    ? 'w-8 h-3 bg-gradient-to-r from-[#2D7A52] to-[#2D7A52]/80 shadow-lg shadow-[#2D7A52]/20 active'
                    : 'w-3 h-3 bg-[#C9A84C]/40 hover:bg-[#C9A84C]/60'
                }`}
                aria-label={`Go to testimonial group ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="nav-button w-11 h-11 rounded-full border border-[#2D7A52]/30 bg-white/80 backdrop-blur-sm text-[#2D7A52] flex items-center justify-center hover:text-white"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
