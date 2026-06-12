'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import ProductCard from '@/components/ProductCard';
import { FirebaseProduct } from '@/lib/firebaseProducts';

import { Category } from '@/lib/categories';

export default function WeddingCategoryClient({
  slug,
  initialProducts,
  weddingCategory,
}: {
  slug: string[];
  initialProducts: FirebaseProduct[];
  weddingCategory?: Category;
}) {
  const products = initialProducts;

  const key = slug.join('/');
  const sub = weddingCategory?.subcategories.find((s) => s.slug === key);

  const title = sub?.name || 'Wedding Collection';
  const description = sub
    ? `Explore our ${sub.name} collection for your special day.`
    : 'Explore our premium wedding silver gifting collection.';

  // Filter: category contains "wedding" AND subcategory matches the
  // cloud-defined subcategory name (by slug) — fully data-driven, no
  // hardcoded local subcategory list.
  const filtered = products.filter((p) => {
    const isWedding = !!p.category?.toLowerCase().includes('wedding');
    if (!sub) return isWedding;
    return isWedding && p.subcategory?.toLowerCase() === sub.name.toLowerCase();
  });
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
            Wedding Collection
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
            <Link href="/wedding" className="hover:text-primary transition-colors">Wedding</Link>
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
            <Link
              href="/wedding"
              className="inline-flex items-center gap-1.5 text-xs font-paragraph text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Wedding
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
              <p className="text-muted font-paragraph text-sm mb-8">Contact us for our wedding catalogue.</p>
              <a
                href="https://wa.me/919712979856?text=Hi! I am looking for wedding gifting options. Please share details."
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
              Planning a Wedding?
            </h2>
            <p className="text-muted font-paragraph text-sm mb-6">
              We specialize in bulk wedding orders. Let us make your special day memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="px-8 py-3.5 bg-primary text-white text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300">
                Contact Us
              </Link>
              <a href="https://wa.me/919712979856?text=Hi! I am interested in wedding gifting from Neev Gifting. Please share details." target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 border border-[#d4af37] text-[#b8960c] text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#d4af37]/10 transition-all duration-300">
                WhatsApp Us
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
}
