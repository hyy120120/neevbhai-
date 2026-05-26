'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/data';

const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category)))];
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A–Z' },
];

export default function ShopClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS];
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
  }, [search, category, sort]);

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
      <section className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm font-paragraph border border-gray-200 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-paragraph font-semibold uppercase tracking-wide transition-all duration-200 ${
                    category === cat
                      ? 'bg-primary text-white'
                      : 'border border-gray-200 text-muted hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <SlidersHorizontal className="h-4 w-4 text-muted" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm font-paragraph border border-gray-200 px-3 py-2 focus:outline-none focus:border-primary cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-sm text-muted font-paragraph mb-8">
            Showing <strong className="text-foreground">{filtered.length}</strong> products
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filtered.map((product, idx) => (
                <AnimatedElement key={product._id} delay={idx * 50}>
                  <ProductCard product={product} />
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-heading font-semibold text-xl text-foreground mb-2">No products found</p>
              <p className="text-sm text-muted font-paragraph">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
