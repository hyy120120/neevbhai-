'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { FirebaseProduct } from '@/lib/firebaseProducts';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: FirebaseProduct;
  showBadge?: boolean;
}

export default function ProductCard({ product, showBadge = true }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem({
      id: product._id,
      name: product.itemName,
      price: product.itemPrice,
      image: product.itemImage,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link href={`/product/${product._id}`} className="group flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden mb-4 aspect-square bg-gray-50">
        <Image
          src={product.itemImage || '/logo.jpeg'}
          alt={product.itemName}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Bestseller badge */}
        {showBadge && product.isBestseller && (
          <div className="absolute top-2.5 left-2.5 bg-[#d4af37] text-[#0a1f13] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1">
            <Star className="h-2.5 w-2.5 fill-current" />
            Bestseller
          </div>
        )}

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 text-xs font-paragraph font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? 'bg-primary text-white'
                : 'bg-white/95 text-foreground hover:bg-[#d4af37] hover:text-[#0a1f13]'
            } shadow-lg backdrop-blur-sm`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="text-center flex-grow flex flex-col justify-between">
        <div>
          {product.category && (
            <p className="text-[10px] uppercase tracking-widest text-muted font-paragraph mb-1">
              {product.category}
            </p>
          )}
          <h3 className="text-sm font-paragraph font-semibold text-foreground mb-2 line-clamp-2 leading-snug hover:text-primary transition-colors cursor-pointer">
            {product.itemName}
          </h3>
        </div>
        
      </div>
    </Link>
  );
}
