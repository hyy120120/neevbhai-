'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS, Product } from '@/lib/data';

const categoryConfig: Record<string, {
  title: string;
  description: string;
  filter: (p: Product) => boolean;
}> = {
  'chowki': {
    title: '999 Silver Chowki',
    description: 'Pure 999 silver chowkis with traditional motifs for worship and gifting.',
    filter: (p) => p.category?.toLowerCase().includes('chowki'),
  },
  'clock': {
    title: '999 Silver Clocks',
    description: 'Elegant pure silver wall and table clocks — a timeless statement piece.',
    filter: (p) => p.category?.toLowerCase().includes('clock'),
  },
  'flower-vase': {
    title: 'Flower Vase & Candle Stand',
    description: 'Pure silver flower vases and candle stands for elegant home decor.',
    filter: (p) => p.category?.toLowerCase().includes('candle') || p.category?.toLowerCase().includes('vase'),
  },
  'frame-idols': {
    title: 'Frame Idols',
    description: 'Pure 999 silver frame idols for your home temple and gifting.',
    filter: (p) => p.category?.toLowerCase().includes('frame'),
  },
  'god-idols': {
    title: 'God Idols',
    description: 'Sacred pure 999 silver god idols crafted with devotion and precision.',
    filter: (p) => p.category?.toLowerCase().includes('showpiece') || p.itemName?.toLowerCase().includes('ganesh'),
  },
  'photoframe': {
    title: 'Photoframes',
    description: 'Pure silver photo frames — preserve your precious memories in silver.',
    filter: (p) => p.category?.toLowerCase().includes('frame'),
  },
  'traditional-showpiece': {
    title: 'Traditional Showpieces',
    description: 'Handcrafted traditional 999 silver showpieces for home and gifting.',
    filter: (p) => p.category?.toLowerCase().includes('showpiece'),
  },
  'others': {
    title: 'Others',
    description: 'More pure 999 silver products for every occasion.',
    filter: (p) => p.isBestseller,
  },
};

export default function SilverCategoryClient({ slug }: { slug: string[] }) {
  const key = slug.join('/');
  const config = categoryConfig[key];

  const title = config?.title || '999 Silver Collection';
  const description = config?.description || 'Explore our pure 999 silver collection.';
  const products = config ? MOCK_PRODUCTS.filter(config.filter) : MOCK_PRODUCTS;

  return (
    <>
      {/* Hero */}
      <section className="relative py-14 md:py-20 bg-[#0f2d1e] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
            999 Pure Silver
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">
            {title}
          </h1>
          <p className="text-white/65 font-paragraph text-base max-w-xl mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#f5f3ee] border-b border-[#e5e0d5] py-3">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-2 text-xs font-paragraph text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/silver" className="hover:text-primary transition-colors">999 Silver</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{title}</span>
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <p className="text-sm text-muted font-paragraph">
              <span className="font-bold text-foreground">{products.length}</span> products found
            </p>
            <Link
              href="/silver"
              className="inline-flex items-center gap-1.5 text-xs font-paragraph text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Silver
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product, idx) => (
                <AnimatedElement key={product._id} delay={idx * 60}>
                  <ProductCard product={product} />
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-heading text-xl text-foreground mb-4">Coming soon!</p>
              <p className="text-muted font-paragraph text-sm mb-8">Contact us for this collection.</p>
              <a
                href="https://wa.me/919712979856"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-primary text-white text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300"
              >
                WhatsApp for Catalogue
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f5f3ee] border-t border-[#e5e0d5]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <AnimatedElement>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Looking for Something Special?
            </h2>
            <p className="text-muted font-paragraph text-sm mb-6">
              Contact us for custom 999 silver pieces or bulk orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="px-8 py-3.5 bg-primary text-white text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300">
                Contact Us
              </Link>
              <a href="https://wa.me/919712979856" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 border border-[#d4af37] text-[#b8960c] text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#d4af37]/10 transition-all duration-300">
                WhatsApp Us
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
}
