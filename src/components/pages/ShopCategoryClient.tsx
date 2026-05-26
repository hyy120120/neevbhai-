'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS, Product } from '@/lib/data';

// ─── Category Config ──────────────────────────────────────────────────────────

const categoryConfig: Record<string, {
  title: string;
  description: string;
  filter: (p: Product) => boolean;
}> = {
  // German Silver
  'german-silver': {
    title: 'German Silver',
    description: 'Explore our exquisite German Silver collection — handcrafted pieces for every occasion.',
    filter: (p) => p.category?.toLowerCase().includes('silver') || p.category?.toLowerCase().includes('chowki') || p.category?.toLowerCase().includes('frame') || p.category?.toLowerCase().includes('diya'),
  },
  'german-silver/urlis': {
    title: "Urli's",
    description: 'Beautiful German Silver Urlis for home decor and gifting.',
    filter: (p) => p.category?.toLowerCase().includes('urli'),
  },
  'german-silver/chowkis': {
    title: "Chowki's",
    description: 'Pure German Silver Chowkis with traditional motifs.',
    filter: (p) => p.category?.toLowerCase().includes('chowki'),
  },
  'german-silver/dry-fruit-boxes': {
    title: 'Dry Fruit Boxes & Jars',
    description: 'Elegant German Silver dry fruit boxes perfect for gifting.',
    filter: (p) => p.category?.toLowerCase().includes('dry fruit') || p.category?.toLowerCase().includes('box'),
  },
  'german-silver/traditional-showpieces': {
    title: 'Traditional Showpieces',
    description: 'Stunning traditional German Silver showpieces for your home.',
    filter: (p) => p.category?.toLowerCase().includes('showpiece'),
  },
  'german-silver/photoframes-mirrors': {
    title: 'Photoframes & Mirrors',
    description: 'Elegant German Silver photo frames and mirrors.',
    filter: (p) => p.category?.toLowerCase().includes('frame'),
  },
  'german-silver/pooja-items': {
    title: 'Pooja Items',
    description: 'Sacred German Silver pooja items for your home temple.',
    filter: (p) => p.category?.toLowerCase().includes('pooja') || p.category?.toLowerCase().includes('diya'),
  },
  'german-silver/candles': {
    title: 'Candles & Candle Holders',
    description: 'Beautiful German Silver candle holders for every occasion.',
    filter: (p) => p.category?.toLowerCase().includes('candle'),
  },
  'german-silver/gifting': {
    title: 'Gifting',
    description: 'Perfect German Silver gifts for every celebration.',
    filter: (p) => p.isBestseller,
  },

  // Festive
  'festive': {
    title: 'Festive Gifts',
    description: 'Celebrate every festival with our premium silver gifting collection.',
    filter: (p) => p.category?.toLowerCase().includes('diya') || p.isBestseller,
  },
  'festive/diwali': {
    title: 'Diwali',
    description: 'Light up Diwali with our pure silver diyas and gifting sets.',
    filter: (p) => p.category?.toLowerCase().includes('diya'),
  },
  'festive/holi': {
    title: 'Holi',
    description: 'Celebrate Holi with colorful and pure silver gifts.',
    filter: (p) => p.isBestseller,
  },
  'festive/ganesh-chaturthi': {
    title: 'Ganesh Chaturthi',
    description: 'Pure silver Ganesh idols and gifting for Ganesh Chaturthi.',
    filter: (p) => p.category?.toLowerCase().includes('showpiece') || p.itemName?.toLowerCase().includes('ganesh'),
  },
  'festive/janmashtami': {
    title: 'Janmashtami',
    description: 'Pure silver gifts to celebrate Janmashtami.',
    filter: (p) => p.isBestseller,
  },

  // Corporate
  'corporate-gifts': {
    title: 'Corporate Gifts',
    description: 'Premium silver corporate gifting solutions for every occasion.',
    filter: (p) => p.category?.toLowerCase().includes('corporate'),
  },

  // Baby
  'baby-announcement': {
    title: 'Baby Announcement',
    description: 'Pure silver gifts to celebrate the arrival of your little one.',
    filter: (p) => p.isBestseller,
  },

  // More
  'premium': {
    title: 'Premium Gifts',
    description: 'Our most luxurious silver gifts for the most special occasions.',
    filter: (p) => p.itemPrice >= 5000,
  },
  'budget': {
    title: 'Budget Friendly',
    description: 'Beautiful silver gifts that are easy on the pocket.',
    filter: (p) => p.itemPrice <= 2500,
  },
  'brass-copper': {
    title: 'Pure Brass / Copper Gifts',
    description: 'Traditional brass and copper gifts crafted with care.',
    filter: (p) => p.isBestseller,
  },

  // Price
  'price/150': {
    title: 'Upto ₹150',
    description: 'Affordable silver gifts under ₹150.',
    filter: (p) => p.itemPrice <= 150,
  },
  'price/500': {
    title: 'Upto ₹500',
    description: 'Beautiful silver gifts under ₹500.',
    filter: (p) => p.itemPrice <= 500,
  },
  'price/1000': {
    title: 'Upto ₹1000',
    description: 'Premium silver gifts under ₹1000.',
    filter: (p) => p.itemPrice <= 1000,
  },
  'price/1500': {
    title: 'Upto ₹1500',
    description: 'Exquisite silver gifts under ₹1500.',
    filter: (p) => p.itemPrice <= 1500,
  },
  'price/above-1500': {
    title: '₹1500 & Above',
    description: 'Luxury silver gifts for every special occasion.',
    filter: (p) => p.itemPrice >= 1500,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShopCategoryClient({ slug }: { slug: string[] }) {
  const key = slug.join('/');
  const config = categoryConfig[key];

  const title = config?.title || slug[slug.length - 1]?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Shop';
  const description = config?.description || 'Explore our premium silver gifting collection.';
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
            Collection
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
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            {slug.map((s, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                <span className={i === slug.length - 1 ? 'text-foreground font-semibold' : 'hover:text-primary transition-colors cursor-pointer'}>
                  {s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Count */}
          <div className="flex items-center justify-between mb-10">
            <p className="text-sm text-muted font-paragraph">
              <span className="font-bold text-foreground">{products.length}</span> products found
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-paragraph text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Products
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
              <p className="font-heading text-xl text-foreground mb-4">
                Collection coming soon!
              </p>
              <p className="text-muted font-paragraph text-sm mb-8">
                Contact us directly for this collection.
              </p>
              <a
                href="https://wa.me/919712979856?text=Hi! I am looking for products in the category: ${title}. Please share details."
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
              Can't Find What You Need?
            </h2>
            <p className="text-muted font-paragraph text-sm mb-6">
              Contact us for custom orders, bulk pricing, or our full catalogue.
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
