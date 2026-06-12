'use client';

import Link from 'next/link';
import { TrendingUp, Star } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import ProductCard from '@/components/ProductCard';
import { FirebaseProduct } from '@/lib/firebaseProducts';

const stats = [
  { number: '2000+', label: 'Happy Customers' },
  { number: '5000+', label: 'Products Sold' },
  { number: '4.9/5', label: 'Average Rating' },
];

export default function BestsellersClient({ initialProducts }: { initialProducts: FirebaseProduct[] }) {
  const bestsellers = initialProducts.filter((p) => p.isBestseller);

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0f2d1e] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <TrendingUp className="h-8 w-8 text-[#d4af37]" />
            <Star className="h-7 w-7 text-[#d4af37] fill-[#d4af37]" />
          </div>
          <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
            Most Loved
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">
            Our Bestsellers
          </h1>
          <p className="text-white/65 font-paragraph text-base md:text-lg max-w-xl mx-auto">
            Shop our most loved and top-rated pure silver products, chosen by thousands of happy customers.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f5f3ee] border-b border-[#e5e0d5] py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((s, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">{s.number}</div>
                <div className="text-xs uppercase tracking-widest text-muted font-paragraph">{s.label}</div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {bestsellers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {bestsellers.map((product, idx) => (
                <AnimatedElement key={product._id} delay={idx * 60}>
                  <ProductCard product={product} showBadge={true} />
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-heading text-xl text-foreground">No bestsellers available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0f2d1e]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-5">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/65 font-paragraph text-base mb-8 max-w-xl mx-auto">
              Explore our full collection or customize your own unique gift experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="px-8 py-3.5 bg-[#d4af37] text-[#0a1f13] text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#c9a12b] transition-all duration-300"
              >
                Browse All Products
              </Link>
              <Link
                href="/customization"
                className="px-8 py-3.5 border border-white/30 text-white text-sm font-paragraph font-semibold uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
              >
                Customize Your Gift
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
}
