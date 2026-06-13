'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Star, ArrowLeft, MessageCircle, Shield, Truck, Award } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { FirebaseProduct } from '@/lib/firebaseProducts';
import AnimatedElement from '@/components/AnimatedElement';

export default function ProductDetailClient({ product, relatedProducts = [] }: { product: FirebaseProduct; relatedProducts?: FirebaseProduct[] }) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
const [quantity, setQuantity] = useState(1);
const [activeImg, setActiveImg] = useState(0);
const [fade, setFade] = useState(true);
const images = product.itemImages?.length ? product.itemImages : product.itemImage ? [product.itemImage] : [];

useEffect(() => {
  if (images.length <= 1) return;
  const timer = setInterval(() => {
    setFade(false);
    setTimeout(() => {
      setActiveImg((i) => (i === images.length - 1 ? 0 : i + 1));
      setFade(true);
    }, 300);
  }, 3000);
  return () => clearInterval(timer);
}, [images.length]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product._id,
        name: product.itemName,
        price: product.itemPrice,
        image: product.itemImage,
        category: product.category,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi! I am interested in ordering "${product.itemName}". Please share pricing and availability details. Thank you!`
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#f5f3ee] border-b border-[#e5e0d5] py-3">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-2 text-xs font-paragraph text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{product.itemName}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

            {/* Left — Image Slideshow */}
            <AnimatedElement>
              <div className="flex flex-col gap-3">
                {/* Main Image */}
                <div className="relative aspect-square bg-[#f5f3ee] overflow-hidden">
                  <Image
  src={images[activeImg] || '/logo.jpeg'}
  alt={product.itemName}
  fill
  className={`object-cover transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
  priority
  unoptimized
/>
                  {product.isBestseller && (
                    <div className="absolute top-4 left-4 bg-[#d4af37] text-[#0a1f13] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      Bestseller
                    </div>
                  )}
                  {/* Left Arrow */}
                  {images.length > 1 && (
                    <button
                      onClick={() => setActiveImg((i) => (i === 0 ? images.length - 1 : i - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors rounded-full"
                    >
                      ‹
                    </button>
                  )}
                  {/* Right Arrow */}
                  {images.length > 1 && (
                    <button
                      onClick={() => setActiveImg((i) => (i === images.length - 1 ? 0 : i + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors rounded-full"
                    >
                      ›
                    </button>
                  )}
                </div>
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImg(idx)}
                        className={`relative w-16 h-16 flex-shrink-0 border-2 rounded overflow-hidden transition-colors ${
                          activeImg === idx ? 'border-[#1a6b44]' : 'border-[#e5e0d5]'
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedElement>

            {/* Right — Info */}
            <AnimatedElement delay={100}>
              <div className="flex flex-col gap-6">

                {/* Category */}
                {product.category && (
                  <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-paragraph font-semibold">
                    {product.category}
                  </p>
                )}

                {/* Name */}
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                  {product.itemName}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-heading font-bold text-primary">As Per MOQ</span>
<span className="text-xs text-muted font-paragraph">Contact us for pricing based on quantity</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e5e0d5]" />

                {/* Description */}
                <p className="text-muted font-paragraph text-sm leading-relaxed">
                  {product.itemDescription}
                </p>

                

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-paragraph font-semibold text-foreground">Quantity:</span>
                  <div className="flex items-center gap-3 border border-[#e5e0d5] px-3 py-1.5">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-lg font-bold text-muted hover:text-primary transition-colors w-6 text-center"
                    >
                      −
                    </button>
                    <span className="text-sm font-paragraph font-bold w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-lg font-bold text-muted hover:text-primary transition-colors w-6 text-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-paragraph font-bold uppercase tracking-wider transition-all duration-300 ${
                      added
                        ? 'bg-green-600 text-white'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {added ? 'Added to Cart!' : 'Add to Cart'}
                  </button>
                  <a
                    href={`https://wa.me/919712979856?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-[#d4af37] text-[#b8960c] text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#d4af37]/10 transition-all duration-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Order via WhatsApp
                  </a>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { icon: Shield, text: '999 Silver' },
                    { icon: Truck, text: 'Ships Worldwide' },
                    { icon: Award, text: 'Premium Quality' },
                  ].map((badge, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 p-3 bg-[#f5f3ee] text-center">
                      <badge.icon className="h-5 w-5 text-[#d4af37]" />
                      <span className="text-[10px] font-paragraph text-muted font-semibold uppercase tracking-wide">
                        {badge.text}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </AnimatedElement>
          </div>

          {/* Back button */}
          <div className="mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-paragraph text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <Link
                    key={p._id}
                    href={`/product/${p._id}`}
                    className="group bg-white border border-[#e5e0d5] hover:border-[#1a6b44] transition-colors overflow-hidden"
                  >
                    <div className="relative aspect-square bg-[#f5f3ee] overflow-hidden">
                      <Image
                        src={p.itemImages?.[0] || p.itemImage || '/logo.jpeg'}
                        alt={p.itemName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      {p.isBestseller && (
                        <div className="absolute top-2 left-2 bg-[#d4af37] text-[#0a1f13] text-[9px] font-bold uppercase tracking-wider px-2 py-1">
                          ★ Bestseller
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-[#d4af37] font-paragraph font-semibold uppercase tracking-wider mb-1">
                        {p.subcategory || p.category}
                      </p>
                      <h3 className="text-sm font-heading font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {p.itemName}
                      </h3>
                      <p className="text-sm font-bold text-primary mt-2">As Per MOQ</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
