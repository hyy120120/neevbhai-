'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialCarousel = () => {
  const reviews = [
    {
      id: 1,
      name: "Rahul Mehta",
      role: "Event Management Company",
      review: "Ordered 500 silver coins for a corporate event. The finishing was consistent across all pieces and packaging was professional. Delivery was on time and the team handled our volume requirements well.",
      rating: 4,
      date: "Jan 2026",
      initials: "RM",
    },
    {
      id: 2,
      name: "Ananya Bose",
      role: "Corporate Client",
      review: "We purchased return gifts for a large corporate event with over 300 attendees. The quality was good and the team was responsive throughout the process. Received positive feedback from most of our clients.",
      rating: 4,
      date: "Nov 2025",
      initials: "AB",
    },
    {
      id: 3,
      name: "Deepika Nair",
      role: "Wedding Planner",
      review: "Needed wedding gifts for multiple families on a tight timeline and Neev Gifting managed to deliver on schedule. The silver items looked elegant and matched the theme of the event perfectly.",
      rating: 5,
      date: "Mar 2026",
      initials: "DN",
    },
    {
      id: 4,
      name: "Vikram Shah",
      role: "Entrepreneur",
      review: "Ordered silver idols for a large housewarming ceremony. The detailing was impressive and the weight felt genuine. Would definitely consider ordering again for future events.",
      rating: 5,
      date: "Feb 2026",
      initials: "VS",
    },
    {
      id: 5,
      name: "Priya Kapoor",
      role: "Interior Designer",
      review: "The photo frames I ordered for multiple projects looked beautiful in person. The website images were accurate and the gifts arrived securely packed. Happy with the experience.",
      rating: 4,
      date: "Dec 2025",
      initials: "PK",
    },
    {
      id: 6,
      name: "Rudra Kapadia",
      role: "Corporate HR",
      review: "Ordered gifts for our annual employee recognition program with 200+ team members. The products were appreciated by everyone and the ordering process was fairly smooth.",
      rating: 4,
      date: "Jan 2026",
      initials: "AM",
    },
    {
      id: 7,
      name: "Sneha Reddy",
      role: "Homemaker",
      review: "I was looking for traditional silver pooja sets for multiple family members. Found exactly what I needed. The finish was clean and the product felt premium without being overly flashy.",
      rating: 5,
      date: "Feb 2026",
      initials: "SR",
    },
    {
      id: 8,
      name: "Kunal Patel",
      role: "Chartered Accountant",
      review: "Good collection and reasonable pricing for the quantity we needed. Customer support answered my queries quickly before I placed the large order.",
      rating: 4,
      date: "Oct 2025",
      initials: "KP",
    },
    {
      id: 9,
      name: "Neha Verma",
      role: "Teacher",
      review: "Purchased silver gifts for my sister's engagement and other family occasions. The product was exactly as described. Packaging could have been slightly better, but the gift itself was lovely.",
      rating: 3,
      date: "Nov 2025",
      initials: "NV",
    },
    {
      id: 10,
      name: "Rohit Jain",
      role: "Retail Store Owner",
      review: "This was my second large purchase from Neev Gifting. Consistent quality and reliable delivery for all items. That's mainly why I keep coming back.",
      rating: 5,
      date: "Jan 2026",
      initials: "RJ",
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
    <section className="py-12 md:py-16 bg-gradient-to-br from-[#1a6b44] via-[#1a5a3a] to-[#0d3d26] relative overflow-hidden">
      {/* Luxurious background accents */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#C9A84C] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#C9A84C] blur-3xl" />
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes subtleGlow {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(201, 168, 76, 0.1);
          }
          50% {
            box-shadow: 0 12px 40px rgba(201, 168, 76, 0.2);
          }
        }

        .card-enter {
          animation: fadeInUp 0.7s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
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
          transition: all 0.6s cubic-bezier(0.34, 1.2, 0.64, 1);
          position: relative;
          overflow: hidden;
          animation: subtleGlow 3s ease-in-out infinite;
        }

        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.15), transparent);
          transition: left 0.6s ease;
          pointer-events: none;
        }

        .testimonial-card:hover::before {
          left: 100%;
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          border-color: rgba(201, 168, 76, 0.5);
        }

        .testimonial-card:hover .star-container {
          transform: scale(1.08);
        }

        .testimonial-card:hover .accent-line {
          width: 60px;
          opacity: 1;
        }

        .testimonial-card:hover .review-text {
          color: #f5f1e8;
        }

        .accent-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #C9A84C, #C9A84C80);
          transition: all 0.6s cubic-bezier(0.34, 1.2, 0.64, 1);
          opacity: 0.8;
        }

        .star-container {
          transition: transform 0.6s cubic-bezier(0.34, 1.2, 0.64, 1);
          display: flex;
          gap: 6px;
          justify-content: center;
        }

        .review-text {
          transition: color 0.6s cubic-bezier(0.34, 1.2, 0.64, 1);
        }

        .nav-button {
          transition: all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
        }

        .nav-button:hover {
          background: linear-gradient(135deg, #C9A84C 0%, #b8960c 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(201, 168, 76, 0.3);
        }

        .dot-button {
          transition: all 0.6s cubic-bezier(0.34, 1.2, 0.64, 1);
        }

        .dot-button.active {
          animation: none;
        }

        .dot-button:not(.active):hover {
          transform: scale(1.4);
          background: #C9A84C;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center md:mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#C9A84C] to-[#C9A84C]/40" />
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-[#C9A84C]">
              Customer Testimonials
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-[#C9A84C] to-[#C9A84C]/40" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            What Our Customers Say
          </h2>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-5" />

          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light">
            Discover why discerning customers choose Neev Gifting for their special moments
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
          {visibleCards.map((review, idx) => (
            <div key={`${currentIndex}-${idx}`} className="card-enter">
              <div className="testimonial-card group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-9 h-full flex flex-col justify-between border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 shadow-xl">
                {/* Top gold accent */}
                <div className="absolute top-6 right-6 w-1 h-1 rounded-full bg-[#C9A84C] group-hover:w-1.5 group-hover:h-1.5 transition-all duration-500" />

                {/* Star Rating */}
                <div className="star-container mb-5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                  ))}
                </div>

                {/* Gold Accent Line */}
                <div className="accent-line mb-5" />

                {/* Review Text */}
                <p className="review-text flex-1 text-white/80 text-sm md:text-base leading-relaxed font-light mb-7">
                  "{review.review}"
                </p>

                {/* Elegant Divider */}
                <div className="w-full h-px bg-gradient-to-r from-[#C9A84C]/30 via-[#C9A84C]/10 to-transparent mb-6" />

                {/* Customer Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/30 to-[#C9A84C]/10 rounded-full" />
                      <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center">
                        <span className="text-[#C9A84C] font-semibold text-sm">{review.initials}</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm">{review.name}</p>
                      <p className="text-[#C9A84C] text-xs font-medium">{review.role}</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs">{review.date}</p>
                </div>

                {/* Gold shimmer on border */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#C9A84C]/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
          <button
            onClick={prev}
            className="nav-button w-12 h-12 rounded-full border-2 border-[#C9A84C]/40 bg-white/10 backdrop-blur-sm text-[#C9A84C] flex items-center justify-center hover:text-white hover:border-[#C9A84C]"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Elegant Dots */}
          <div className="flex items-center gap-4">
            {Array.from({ length: maxSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`dot-button rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? 'w-10 h-1 bg-gradient-to-r from-[#C9A84C] to-[#C9A84C]/60 active'
                    : 'w-2 h-2 bg-[#C9A84C]/30 hover:bg-[#C9A84C]/60'
                }`}
                aria-label={`Go to testimonial group ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="nav-button w-12 h-12 rounded-full border-2 border-[#C9A84C]/40 bg-white/10 backdrop-blur-sm text-[#C9A84C] flex items-center justify-center hover:text-white hover:border-[#C9A84C]"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-[#C9A84C]/20">
            <span className="text-[#C9A84C] text-lg">★</span>
            <span className="text-white/70 text-xs font-medium tracking-wide">Trusted by 700+ Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;