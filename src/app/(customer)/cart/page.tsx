"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, subtotal } = useCart();

  const tax = subtotal * 0.12; // 12% GST mock
  const shipping = subtotal === 0 ? 0 : subtotal >= 2000 ? 0 : 50;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-40 pb-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-12">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 bg-white border border-stone-200">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">Your cart is empty</h2>
            <p className="text-stone-500 mb-8 font-light">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/women">
              <Button variant="luxury" className="px-8">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 py-6 border-b border-stone-200">
                  <div className="w-28 h-36 shrink-0 bg-stone-100 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-stone-900 leading-snug">{item.name}</h3>
                        <p className="text-sm text-stone-500 mt-1 font-light">Size: {item.size} | Color: {item.color}</p>
                      </div>
                      <div className="font-medium text-stone-900 text-right shrink-0">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-stone-300">
                        <button onClick={() => updateQuantity(item.id, item.size, item.color, -1)} className="px-3 py-1 text-stone-500 hover:bg-stone-100 transition-colors"><Minus className="w-4 h-4" /></button>
                        <span className="px-4 py-1 text-sm font-medium border-x border-stone-300 min-w-[2.5rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.color, 1)} className="px-3 py-1 text-stone-500 hover:bg-stone-100 transition-colors"><Plus className="w-4 h-4" /></button>
                      </div>
                      <button onClick={() => removeItem(item.id, item.size, item.color)} className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 flex items-center transition-colors">
                        <Trash2 className="w-4 h-4 mr-2" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-8 border border-stone-200 h-fit sticky top-32 shadow-sm">
              <h2 className="text-xl font-serif mb-8 text-stone-900">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-8">
                <div className="flex justify-between text-stone-600 font-light">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600 font-light">
                  <span>Estimated Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-700' : 'text-stone-900'}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600 font-light">
                  <span>Estimated Tax (GST 12%)</span>
                  <span className="font-medium text-stone-900">₹{tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              </div>
              
              <div className="border-t border-stone-200 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-stone-900 text-lg uppercase tracking-widest text-xs">Total</span>
                  <span className="font-serif text-stone-900 text-2xl">₹{total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              </div>
              
              <Button className="w-full bg-[#947156] hover:bg-stone-900 text-white rounded-none py-7 text-xs uppercase tracking-[0.2em] transition-colors">
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 text-center">
                <Link href="/women" className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 border-b border-transparent hover:border-stone-900 transition-all pb-1">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
