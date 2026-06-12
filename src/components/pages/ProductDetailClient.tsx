'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Star, ArrowLeft, MessageCircle, Shield, Truck, Award } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { FirebaseProduct } from '@/lib/firebaseProducts';
import AnimatedElement from '@/components/AnimatedElement';

export default function ProductDetailClient({ product }: { product: FirebaseProduct }) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
    `Hi! I am interested in ordering "${product.itemName}" (₹${product.itemPrice}). Please share more details. Thank you!`
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

            {/* Left — Image */}
            <AnimatedElement>
              <div className="relative aspect-square bg-[#f5f3ee] overflow-hidden">
                <Image
                  src={product.itemImage || '/logo.jpeg'}
                  alt={product.itemName}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isBestseller && (
                  <div className="absolute top-4 left-4 bg-[#d4af37] text-[#0a1f13] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 flex items-center gap-1">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    Bestseller
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
                  <span className="text-3xl font-heading font-bold text-primary">
                    {formatPrice(product.itemPrice)}
                  </span>
                  <span className="text-xs text-muted font-paragraph">(Incl. of all taxes)</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e5e0d5]" />

                {/* Description */}
                <p className="text-muted font-paragraph text-sm leading-relaxed">
                  {product.itemDescription}
                </p>

                {/* Stock */}
                {product.stock !== undefined && (
                  <p className="text-xs font-paragraph">
                    {product.stock > 0 ? (
                      <span className="text-green-600 font-semibold">✓ In Stock ({product.stock} available)</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Out of Stock</span>
                    )}
                  </p>
                )}

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
                    { icon: Shield, text: '100% Pure Silver' },
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
        </div>
      </section>
    </>
  );
}
