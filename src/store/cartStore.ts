'use client';

import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalPrice: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  totalPrice: 0,
  itemCount: 0,

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      let newItems: CartItem[];
      if (existing) {
        newItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...item, quantity: 1 }];
      }
      const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const itemCount = newItems.reduce((sum, i) => sum + i.quantity, 0);
      return { items: newItems, totalPrice, itemCount, isOpen: true };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const itemCount = newItems.reduce((sum, i) => sum + i.quantity, 0);
      return { items: newItems, totalPrice, itemCount };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        const newItems = state.items.filter((i) => i.id !== id);
        const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const itemCount = newItems.reduce((sum, i) => sum + i.quantity, 0);
        return { items: newItems, totalPrice, itemCount };
      }
      const newItems = state.items.map((i) => (i.id === id ? { ...i, quantity } : i));
      const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const itemCount = newItems.reduce((sum, i) => sum + i.quantity, 0);
      return { items: newItems, totalPrice, itemCount };
    });
  },

  clearCart: () => set({ items: [], totalPrice: 0, itemCount: 0 }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
}));
