'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Images served directly from Unsplash CDN with their own ?w=&q= optimisation.
// We intentionally keep resolution at 1200px (down from 1600) to cut bandwidth
// without any visible quality loss on typical screens.
const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1200&q=75',
    tag: 'Festive Collection',
    heading: 'The Art of\nMeaningful Gifting',
    sub: "Handcrafted pure silver pieces that celebrate life's most precious moments.",
    cta: { label: 'Explore Collection', href: '/shop' },
    ctaSecondary: { label: 'Customize Now', href: '/contact' },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=75',
    tag: 'Luxury Silver Gifts',
    heading: 'Crafted for\nCherished Bonds',
    sub: "From diyas to showpieces — every piece tells a story of love and elegance.",
    cta: { label: 'Shop Bestsellers', href: '/bestsellers' },
    ctaSecondary: { label: 'Know More', href: '/contact' },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?w=1200&q=75',
    tag: 'Corporate Gifting',
    heading: 'Make Every\nOccasion Unforgettable',
    sub: 'Bulk orders, custom branding, and bespoke hampers for corporate excellence.',
    cta: { label: 'Bulk Orders', href: '/contact' },
    ctaSecondary: { label: 'Contact Us', href: '/contact' },
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=75',
    tag: 'Wedding Season',
    heading: 'Gift Love,\nGift Silver',
    sub: 'Timeless silver creations that bless every new beginning with lasting beauty.',
    cta: { label: 'Wedding Gifts', href: '/wedding' },
    ctaSecondary: { label: 'Get Quote', href: '/contact' },
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1602526433888-5e0f7ab9b8e4?w=1200&q=75',
    tag: 'Personalized Gifts',
    heading: 'Your Vision,\nOur Craftsmanship',
    sub: 'From engraving to custom idols — we bring your gifting ideas to life.',
    cta: { label: 'Customize Yours', href: '/contact' },
    ctaSecondary: { label: 'View All', href: '/shop' },
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: 'min(100vh, 750px)' }}>
      {/* Background Images — all pre-rendered in DOM; CSS opacity handles transitions */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={s.image}
            alt={s.tag}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="text-[#d4af37] text-sm tracking-[3px] uppercase mb-4 font-medium">
              {slide.tag}
            </div>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 whitespace-pre-line">
              {slide.heading}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10">
              {slide.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={slide.cta.href} className="px-8 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-wider hover:bg-amber-600 transition">
                {slide.cta.label}
              </Link>
              <Link href={slide.ctaSecondary.href} className="px-8 py-4 border border-white text-white font-medium uppercase tracking-wider hover:bg-white/10 transition">
                {slide.ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-4 rounded-full transition"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-4 rounded-full transition"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-[#d4af37] scale-125' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
