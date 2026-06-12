'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function Cart() {
  const { items, totalPrice, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const [bulkItems, setBulkItems] = useState<Record<string, boolean>>({});

  const toggleBulk = (id: string) => {
    setBulkItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const buildWhatsAppMessage = () => {
    const lines = items.map((item) => {
      if (bulkItems[item.id]) {
        return `• ${item.name} — *Bulk Order* (quantity TBD)`;
      }
      return `• ${item.name} x${item.quantity}`;
    });
    const message =
      `Hi! I would like to place an order from Neev Gifting:\n\n` +
      lines.join('\n') +
      `\n\nPlease confirm availability and pricing. Thank you!`;
    return `https://wa.me/919712979856?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="cart-overlay"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">Your Cart</h2>
            <p className="text-xs text-muted mt-0.5 font-paragraph">
              {items.length === 0 ? 'Empty' : `${items.length} item${items.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] px-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-gray-300" />
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground text-lg">Your cart is empty</p>
              <p className="text-sm text-muted mt-1 font-paragraph">Add some beautiful gifts!</p>
            </div>
            <button
              onClick={closeCart}
              className="px-6 py-2.5 bg-primary text-white text-sm font-paragraph rounded-sm hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-50 last:border-0">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-paragraph font-semibold text-sm text-foreground leading-snug line-clamp-2">
                      {item.name}
                    </h4>
                    {item.category && (
                      <p className="text-xs text-muted mt-0.5">{item.category}</p>
                    )}
                    <p className="text-primary font-bold text-sm mt-1">As Per MOQ</p>

                    {/* Quantity row */}
                    {!bulkItems[item.id] && (
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-paragraph w-6 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Bulk checked — show badge + delete */}
                    {bulkItems[item.id] && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] text-[#d4af37] font-paragraph font-semibold bg-[#d4af37]/10 px-2 py-1 rounded">
                          Bulk Order
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Bulk Order Checkbox — always below quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        id={`bulk-${item.id}`}
                        checked={!!bulkItems[item.id]}
                        onChange={() => toggleBulk(item.id)}
                        className="w-4 h-4 accent-[#d4af37] cursor-pointer"
                      />
                      <label
                        htmlFor={`bulk-${item.id}`}
                        className="text-xs text-muted font-paragraph cursor-pointer select-none"
                      >
                        Bulk Order
                      </label>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/60 sticky bottom-0">
              <div className="flex items-center justify-between mb-4">
                <span className="font-paragraph text-sm text-muted">Subtotal</span>
                <span className="font-heading font-bold text-xl text-primary">As Per MOQ</span>
              </div>
              <p className="text-xs text-muted font-paragraph mb-4 text-center">
                Taxes and shipping calculated at checkout
              </p>
              <a
                href={buildWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3.5 bg-primary text-white text-center text-sm font-paragraph font-semibold rounded-sm hover:bg-primary/90 transition-colors"
              >
                Checkout via WhatsApp
              </a>
              <button
                onClick={closeCart}
                className="block w-full py-2.5 mt-2 border border-gray-200 text-foreground text-center text-sm font-paragraph rounded-sm hover:bg-gray-100 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}