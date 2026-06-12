'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import ProductCard from '@/components/ProductCard';
import { FirebaseProduct } from '@/lib/firebaseProducts';
import { Category } from '@/lib/categories';

function buildCategoryConfig(
  categories: Category[]
): Record<string, { title: string; description: string; filter: (p: FirebaseProduct) => boolean }> {
  const config: Record<string, { title: string; description: string; filter: (p: FirebaseProduct) => boolean }> = {};

  categories.forEach((cat) => {
    config[cat.slug] = {
      title: cat.name,
      description: `Explore our ${cat.name} collection.`,
      filter: (p) => p.category?.toLowerCase() === cat.name.toLowerCase(),
    };
    cat.subcategories.forEach((sub) => {
      config[`${cat.slug}/${sub.slug}`] = {
        title: sub.name,
        description: `Browse our ${sub.name} collection.`,
        filter: (p) =>
          p.category?.toLowerCase() === cat.name.toLowerCase() &&
          p.subcategory?.toLowerCase() === sub.name.toLowerCase(),
      };
    });
  });

  // Price ranges (static)
  config['price/150'] = { title: 'Upto ₹150', description: 'Affordable gifts under ₹150.', filter: (p) => p.itemPrice <= 150 };
  config['price/500'] = { title: 'Upto ₹500', description: 'Beautiful gifts under ₹500.', filter: (p) => p.itemPrice <= 500 };
  config['price/1000'] = { title: 'Upto ₹1000', description: 'Premium gifts under ₹1000.', filter: (p) => p.itemPrice <= 1000 };
  config['price/1500'] = { title: 'Upto ₹1500', description: 'Exquisite gifts under ₹1500.', filter: (p) => p.itemPrice <= 1500 };
  config['price/above-1500'] = { title: '₹1500 & Above', description: 'Luxury gifts for every occasion.', filter: (p) => p.itemPrice >= 1500 };

  return config;
}

export default function ShopCategoryClient({
  slug,
  initialCategories,
  initialProducts,
}: {
  slug?: string[];
  initialCategories: Category[];
  initialProducts: FirebaseProduct[];
}) {
  const categories = initialCategories;
  const products = initialProducts;

  if (!slug || slug.length === 0) return null;

  const key = slug.join('/');
  const config = buildCategoryConfig(categories)[key];

  const title = config?.title || slug[slug.length - 1]?.replace(/-/g, ' ') || 'Collection';
  const description = config?.description || `Explore our ${title} collection.`;
  const filtered = config ? products.filter(config.filter) : products;

  return (
    <>
      {/* Hero */}
      <section className="relative py-14 md:py-20 bg-[#0f2d1e] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
            {slug[0]?.replace(/-/g, ' ')}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">{title}</h1>
          <p className="text-white/65 font-paragraph text-base max-w-xl mx-auto">{description}</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#f5f3ee] border-b border-[#e5e0d5] py-3">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-2 text-xs font-paragraph text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
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
              <span className="font-bold text-foreground">{filtered.length}</span> products found
            </p>
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-paragraph text-muted hover:text-primary transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> All Products
            </Link>
          </div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filtered.map((product, idx) => (
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
                href={`https://wa.me/919712979856?text=Hi! I am looking for products in: ${title}. Please share details.`}
                target="_blank" rel="noopener noreferrer"
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
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Looking for Something Special?</h2>
            <p className="text-muted font-paragraph text-sm mb-6">Contact us for custom pieces or bulk orders.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="px-8 py-3.5 bg-primary text-white text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300">Contact Us</Link>
              <a href="https://wa.me/919712979856" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 border border-[#d4af37] text-[#b8960c] text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#d4af37]/10 transition-all duration-300">WhatsApp Us</a>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
}
