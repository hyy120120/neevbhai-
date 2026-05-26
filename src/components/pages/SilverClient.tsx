'use client';

import Link from 'next/link';
import AnimatedElement from '@/components/AnimatedElement';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/data';

const silverProducts = MOCK_PRODUCTS.filter((p) =>
  p.category?.toLowerCase().includes('silver')
);

const subcategories = [
  { name: 'Chowki', href: '/silver/chowki' },
  { name: 'Clock', href: '/silver/clock' },
  { name: 'Flower Vase & Candle Stand', href: '/silver/flower-vase' },
  { name: 'Frame Idols', href: '/silver/frame-idols' },
  { name: 'God Idols', href: '/silver/god-idols' },
  { name: 'Photoframe', href: '/silver/photoframe' },
  { name: 'Traditional Showpiece', href: '/silver/traditional-showpiece' },
  { name: 'Others', href: '/silver/others' },
];

export default function SilverClient() {
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
          <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
            Pure & Precious
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">
            999 Silver Collection
          </h1>
          <p className="text-white/65 font-paragraph text-base md:text-lg max-w-xl mx-auto">
            Crafted from the finest 999 pure silver — timeless pieces for gifting, worship, and home decor.
          </p>
        </div>
      </section>

      {/* Subcategories */}
      <section className="bg-[#f5f3ee] border-b border-[#e5e0d5] py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3">
            {subcategories.map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="px-5 py-2 border border-[#d4af37]/40 bg-white text-sm font-paragraph text-foreground hover:bg-[#d4af37] hover:text-[#0a1f13] hover:border-[#d4af37] transition-all duration-200 font-semibold"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
              Our Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              999 Pure Silver
            </h2>
          </AnimatedElement>

          {silverProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {silverProducts.map((product, idx) => (
                <AnimatedElement key={product._id} delay={idx * 60}>
                  <ProductCard product={product} />
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-heading text-xl text-foreground mb-4">Collection coming soon!</p>
              <p className="text-muted font-paragraph text-sm">Contact us for our full 999 silver catalogue.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0f2d1e]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-5">
              Looking for Something Special?
            </h2>
            <p className="text-white/65 font-paragraph text-base mb-8 max-w-xl mx-auto">
              Get in touch for custom 999 silver pieces, bulk orders, or exclusive gifting collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#d4af37] text-[#0a1f13] text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#c9a12b] transition-all duration-300"
              >
                Contact Us
              </Link>
              <a
                href="https://wa.me/919712979856"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-white/30 text-white text-sm font-paragraph font-semibold uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
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
