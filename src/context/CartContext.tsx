"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, size: string, color: string, delta: number) => void;
  removeItem: (id: string, size: string, color: string) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("arohae_cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart data");
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("arohae_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCartItems(prev => {
      // Check if item with same id, size, and color exists
      const existing = prev.find(item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color);
      if (existing) {
        return prev.map(item => 
          (item.id === newItem.id && item.size === newItem.size && item.color === newItem.color)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, size: string, color: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.size === size && item.color === color) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id: string, size: string, color: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size && item.color === color)));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
