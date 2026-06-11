'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import { Star } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '@/lib/data';
import { fetchCategoriesFromFirestore, DEFAULT_CATEGORIES, Category } from '@/lib/categories';

const bestsellers = MOCK_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

const categoryColors = [
  '#1a6b44', // german silver
  '#8b4513', // festive
  '#1a3a6b', // corporate
  '#6b1a4a', // wedding
  '#6b4a1a', // price-based
  '#1a6b60', // subcategories
];

const stats = [
  { number: '2000+', label: 'Happy Customers' },
  { number: '5000+', label: 'Gifts Delivered' },
  { number: '4.9★',  label: 'Avg. Rating' },
  { number: '100%',  label: 'Pure Silver' },
];

export default function HomePageClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategoriesFromFirestore();
        setCategories(fetchedCategories.length > 0 ? fetchedCategories : DEFAULT_CATEGORIES);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCategories(DEFAULT_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Format categories for display (show main categories + key subcategories)
  const displayCategories = categories
    .filter((cat) => cat.name !== '999 Silver') // Filter out unwanted categories if needed
    .slice(0, 6)
    .map((cat, idx) => {
      // For categories with subcategories, show first subcat, otherwise show main category
      const link = cat.subcategories.length > 0 
        ? `/shop/${cat.slug}/${cat.subcategories[0]?.slug || ''}`
        : `/shop/${cat.slug}`;
      
      return {
        name: cat.name,
        href: link,
        accent: categoryColors[idx % categoryColors.length],
      };
    });
  return (
    <>
      {/* ── Stats Banner ── */}
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <AnimatedElement key={i} delay={i * 80}>
                <div>
                  <div className="text-2xl md:text-3xl font-heading font-bold text-white mb-1">{s.number}</div>
                  <div className="text-xs uppercase tracking-widest text-white/70 font-paragraph">{s.label}</div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Categories ── */}
      <section className="py-16 md:py-20 bg-[#f5f3ee] border-y border-[#e5e0d5]">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
              Browse By
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              Top Categories
            </h2>
          </AnimatedElement>

          {loading ? (
            <div className="text-center py-12 text-muted font-paragraph">
              Loading categories...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {displayCategories.map((cat, i) => (
                <AnimatedElement key={i} delay={i * 70}>
                  <Link href={cat.href} className="group block relative overflow-hidden">

                    {/* Tall card — barn14 aspect ratio */}
                    <div className="relative aspect-[3/4] overflow-hidden">

                      {/* Dark background using accent color */}
                      <div
                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundColor: cat.accent }}
                      />

                      {/* Logo as faded texture in center */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                        <div className="relative w-3/4 h-3/4">
                          <Image
                            src="/logo.jpeg"
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* Gold shimmer overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition-colors duration-500" />

                      {/* Gold top border that slides in */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] bg-[#d4af37] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
                      />

                      {/* Category name — bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                        <span className="block text-white font-heading font-bold text-sm md:text-base tracking-wide group-hover:text-[#d4af37] transition-colors duration-300">
                          {cat.name}
                        </span>
                        <span className="block mt-1 text-white/60 text-[10px] tracking-[0.2em] uppercase font-paragraph group-hover:text-[#d4af37]/80 transition-colors duration-300">
                          Shop Now
                        </span>
                      </div>
                    </div>

                  </Link>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bestsellers ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
              Top Picks
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-3">
              Bestsellers
            </h2>
            <p className="text-sm text-muted font-paragraph">Shop our top-rated products</p>
          </AnimatedElement>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {bestsellers.map((product, idx) => (
              <AnimatedElement key={product._id} delay={idx * 100}>
                <ProductCard product={product} />
              </AnimatedElement>
            ))}
          </div>

          <AnimatedElement className="text-center mt-12" delay={200}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary text-sm font-paragraph font-semibold uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300"
            >
              View All Products
            </Link>
          </AnimatedElement>
        </div>
      </section>

      {/* ── Why Neev Gifting ── */}
      <section className="py-16 md:py-24 bg-[#f5f3ee] border-y border-[#e5e0d5]">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
              Why Us
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              The Neev Gifting Difference
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✦',
                title: 'Pure Silver Craftsmanship',
                desc: 'Every product is crafted from genuine pure silver, ensuring lasting quality and timeless beauty.',
              },
              {
                icon: '◈',
                title: 'Personalized Touch',
                desc: 'From custom engraving to bespoke gift sets — we tailor every gift to your vision.',
              },
              {
                icon: '◉',
                title: 'Worldwide Delivery',
                desc: 'Safely packaged and shipped globally, your precious gift arrives exactly as envisioned.',
              },
            ].map((item, i) => (
              <AnimatedElement key={i} delay={i * 120}>
                <div className="text-center group">
                  <div className="w-14 h-14 rounded-full border-2 border-[#d4af37]/40 group-hover:border-[#d4af37] flex items-center justify-center mx-auto mb-5 text-xl text-[#d4af37] transition-all duration-300 group-hover:bg-[#d4af37]/10">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted font-paragraph leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
<section className="py-16 md:py-24 bg-primary">
  <div className="container mx-auto px-4 max-w-7xl">
    <AnimatedElement className="text-center mb-12">
      <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
        Happy Customers
      </span>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-2">
        What Our Customers Say
      </h2>
    </AnimatedElement>

    <ReviewsCarousel />   {/* ← bas yeh ek line */}

  </div>
</section>
      {/* ── CTA Banner ── */}
      <section className="py-20 bg-[#f5f3ee] border-y border-[#e5e0d5]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <AnimatedElement>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-[80px] bg-[#d4af37]/40" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
                Bulk Orders Welcome
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-[#d4af37]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-5">
              Need a Custom Gift?
            </h2>
            <p className="text-muted font-paragraph text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Talk to us about corporate gifting, wedding collections, or any bespoke request.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-primary text-white text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300"
              >
                Contact Us
              </Link>
              <a
                href="https://wa.me/919712979856"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-[#d4af37] text-[#b8960c] text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#d4af37]/10 transition-all duration-300"
              >
                WhatsApp Us
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
}