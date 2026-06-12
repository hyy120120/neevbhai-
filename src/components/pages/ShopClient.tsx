'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import ProductCard from '@/components/ProductCard';
import { FirebaseProduct } from '@/lib/firebaseProducts';

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A–Z' },
];

export default function ShopClient({ initialProducts }: { initialProducts: FirebaseProduct[] }) {
  const products = initialProducts;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.itemName.toLowerCase().includes(q) || p.itemDescription.toLowerCase().includes(q)
      );
    }
    if (category !== 'All') {
      list = list.filter((p) => p.category === category);
    }
    if (sort === 'price-low') list.sort((a, b) => a.itemPrice - b.itemPrice);
    else if (sort === 'price-high') list.sort((a, b) => b.itemPrice - a.itemPrice);
    else if (sort === 'name') list.sort((a, b) => a.itemName.localeCompare(b.itemName));
    return list;
  }, [products, search, category, sort]);

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
            Our Collection
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">
            Shop All Products
          </h1>
          <p className="text-white/65 font-paragraph text-base md:text-lg max-w-xl mx-auto">
            Discover exquisite pure silver gifts and personalized items for every occasion.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 bg-white border-b border-[#e5e0d5] py-4 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#e5e0d5] text-sm font-paragraph outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 sm:flex-none border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-primary bg-white"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="flex-1 sm:flex-none border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-primary bg-white"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-sm text-muted font-paragraph mb-10">
            <span className="font-bold text-foreground">{filtered.length}</span> products found
          </p>
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
              <p className="font-heading text-xl text-foreground mb-4">No products found.</p>
              <p className="text-muted font-paragraph text-sm">Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
