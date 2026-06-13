"use client";

import Link from "next/link";
import AnimatedElement from "@/components/AnimatedElement";
import ProductCard from "@/components/ProductCard";
import { FirebaseProduct } from "@/lib/firebaseProducts";
import { Category } from "@/lib/categories";

const features = [
  {
    icon: "💍",
    title: "Elegant Return Favours",
    desc: "Pure silver keepsakes your guests will cherish forever — customized with your names and date.",
  },
  {
    icon: "🎁",
    title: "Luxury Wedding Gifts",
    desc: "From silver idols to showpieces — the perfect gift for the couple, family, and loved ones.",
  },
  {
    icon: "🪔",
    title: "Ritual Essentials",
    desc: "Pure silver items for all wedding rituals — crafted with tradition and elegance in mind.",
  },
];

export default function WeddingClient({
  initialProducts,
  weddingCategory,
}: {
  initialProducts: FirebaseProduct[];
  weddingCategory?: Category;
}) {
  const products = initialProducts;
  const subcategories =
    weddingCategory?.subcategories.map((sub) => ({
      name: sub.name,
      href: `/wedding/${sub.slug}`,
    })) ?? [];

  const weddingProducts = products.filter((p) =>
    p.category?.toLowerCase().includes("wedding"),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0f2d1e] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
            Celebrate Together
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">
            Wedding Collection
          </h1>
          <p className="text-white/65 font-paragraph text-base md:text-lg max-w-xl mx-auto">
            Make every wedding moment unforgettable with our pure silver gifting
            collection — from elegant return favours to ritual essentials.
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

      {/* Features */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              Your Perfect Wedding Partner
            </h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <AnimatedElement key={i} delay={i * 120}>
                <div className="text-center group">
                  <div className="w-16 h-16 rounded-full border-2 border-[#d4af37]/40 group-hover:border-[#d4af37] flex items-center justify-center mx-auto mb-5 text-2xl transition-all duration-300 group-hover:bg-[#d4af37]/10">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted font-paragraph leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#faf8f3] to-[#f5f3ee] border-t border-[#e5e0d5]">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedElement className="text-center mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
              Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              Wedding Picks
            </h2>
          </AnimatedElement>

          {weddingProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {weddingProducts.map((product, idx) => (
                <AnimatedElement key={product._id} delay={idx * 60}>
                  <ProductCard product={product} />
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-heading text-xl text-foreground mb-4">
                Collection coming soon!
              </p>
              <p className="text-muted font-paragraph text-sm mb-8">
                Contact us for our full wedding catalogue.
              </p>
              <a
                href="https://wa.me/919712979856?text=Hi! I am looking for wedding gifting options from Neev Gifting. Please share your catalogue."
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
      {/* CTA */}
{/* CTA */}
<section className="py-16 bg-gradient-to-r from-[#fef8e7] to-[#fdf3d5] border-t border-[#e6d5a8]">
  <div className="container mx-auto px-4 max-w-4xl text-center">
    <AnimatedElement>
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#8B6914] mb-4">
        Planning a Wedding?
      </h2>
      <p className="text-[#6b4e0e]/80 font-paragraph text-sm mb-6 max-w-xl mx-auto">
        We specialize in bulk wedding orders — return favours, gifting sets, and ritual items. Let us make your special day even more memorable.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/contact"
          className="px-8 py-3.5 bg-[#d4af37] text-[#3d2b00] text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#c9a12b] transition-all duration-300"
        >
          Contact Us
        </Link>
        <a
          href="https://wa.me/919712979856?text=Hi! I am interested in wedding gifting from Neev Gifting. Please share details."
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 border border-[#d4af37] text-[#d4af37] text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#d4af37]/10 transition-all duration-300"
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
