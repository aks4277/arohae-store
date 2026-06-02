"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CreditCard, Lock, Check } from "lucide-react";

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');

  const orderItems = [
    { id: 1, name: "Embroidered Silk Blend Straight Kurta", size: "M", price: 6999, image: "/images/products/tunic_1_1780252701842.png", qty: 1 },
    { id: 2, name: "Minimalist High-Waist Trousers", size: "S", price: 3499, image: "/images/products/trousers_1780252755043.png", qty: 2 }
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-stone-50 font-sans pt-[80px] pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Side: Checkout Flow */}
        <div className="flex-1 space-y-12">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-serif font-light tracking-tight mb-2">Checkout</h1>
            <p className="text-sm text-stone-500">Secure encrypted payment.</p>
          </div>

          {/* 1. Contact & Shipping */}
          <section className={`transition-opacity duration-500 ${step !== 1 && step > 1 ? 'opacity-50' : ''}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold tracking-[0.1em] uppercase">1. Shipping Details</h2>
              {step > 1 && <button onClick={() => setStep(1)} className="text-xs uppercase tracking-widest text-[#947156] hover:text-black">Edit</button>}
            </div>
            
            {step === 1 ? (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="col-span-1 w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                  <input type="text" placeholder="Last Name" className="col-span-1 w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Street Address" className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="col-span-1 w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                  <input type="text" placeholder="Postal Code" className="col-span-1 w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                </div>
                <button onClick={() => setStep(2)} className="w-full md:w-auto mt-6 bg-black text-white px-12 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                  Continue to Delivery
                </button>
              </motion.div>
            ) : (
              <div className="text-sm text-stone-600 bg-white p-6 border border-stone-200">
                <p>Ajay Karakoti</p>
                <p>123 Fashion Street, Cyber Hub</p>
                <p>Gurugram, 122002</p>
              </div>
            )}
          </section>

          {/* 2. Delivery Method */}
          <section className={`transition-opacity duration-500 ${step !== 2 && step > 2 ? 'opacity-50' : ''} ${step < 2 ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className="flex items-center justify-between mb-6 border-t border-stone-200 pt-12">
              <h2 className="text-sm font-bold tracking-[0.1em] uppercase">2. Delivery Method</h2>
              {step > 2 && <button onClick={() => setStep(2)} className="text-xs uppercase tracking-widest text-[#947156] hover:text-black">Edit</button>}
            </div>
            
            {step === 2 ? (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-black bg-white cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-[4px] border-black" />
                    <div>
                      <p className="text-sm font-semibold text-black">Express Delivery</p>
                      <p className="text-xs text-stone-500 mt-1">Delivered in 2-3 business days</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">Free</span>
                </label>
                <button onClick={() => setStep(3)} className="w-full md:w-auto mt-6 bg-black text-white px-12 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                  Continue to Payment
                </button>
              </motion.div>
            ) : (
              step > 2 && (
                <div className="text-sm text-stone-600 bg-white p-6 border border-stone-200 flex justify-between">
                  <span>Express Delivery (2-3 business days)</span>
                  <span className="font-semibold text-black">Free</span>
                </div>
              )
            )}
          </section>

          {/* 3. Payment */}
          <section className={`transition-opacity duration-500 ${step < 3 ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className="flex items-center justify-between mb-6 border-t border-stone-200 pt-12">
              <h2 className="text-sm font-bold tracking-[0.1em] uppercase flex items-center gap-2">
                3. Payment <Lock className="w-4 h-4 text-stone-400" />
              </h2>
            </div>
            
            {step === 3 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
                
                {/* Payment Tabs */}
                <div className="flex border-b border-stone-200">
                  <button onClick={() => setPaymentMethod('card')} className={`flex-1 py-4 text-xs font-bold tracking-[0.1em] uppercase border-b-2 transition-colors ${paymentMethod === 'card' ? 'border-black text-black' : 'border-transparent text-stone-400 hover:text-stone-700'}`}>Credit Card</button>
                  <button onClick={() => setPaymentMethod('upi')} className={`flex-1 py-4 text-xs font-bold tracking-[0.1em] uppercase border-b-2 transition-colors ${paymentMethod === 'upi' ? 'border-black text-black' : 'border-transparent text-stone-400 hover:text-stone-700'}`}>UPI</button>
                  <button onClick={() => setPaymentMethod('cod')} className={`flex-1 py-4 text-xs font-bold tracking-[0.1em] uppercase border-b-2 transition-colors ${paymentMethod === 'cod' ? 'border-black text-black' : 'border-transparent text-stone-400 hover:text-stone-700'}`}>Cash on Delivery</button>
                </div>

                {/* Card Payment Form (Scaffolded Razorpay/Stripe UI) */}
                {paymentMethod === 'card' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
                    <div className="relative">
                      <input type="text" placeholder="Card Number" className="w-full bg-white border border-stone-200 p-4 pl-12 text-sm focus:outline-none focus:border-black transition-colors" />
                      <CreditCard className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="col-span-1 w-full bg-white border border-stone-200 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                      <input type="text" placeholder="CVC" className="col-span-1 w-full bg-white border border-stone-200 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <input type="text" placeholder="Name on Card" className="w-full bg-white border border-stone-200 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                  </motion.div>
                )}

                {paymentMethod === 'upi' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 text-center py-8">
                    <p className="text-sm text-stone-500 mb-6">Scan the QR code with any UPI app to pay securely.</p>
                    <div className="w-48 h-48 bg-stone-200 mx-auto rounded-lg flex items-center justify-center text-stone-400">QR CODE MOCK</div>
                  </motion.div>
                )}

                <div className="pt-8">
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-4">By clicking place order, you agree to our Terms & Conditions.</p>
                  <button className="w-full bg-black text-white px-12 py-5 text-sm font-bold tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 group">
                    Place Order 
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </motion.div>
            )}
          </section>

        </div>

        {/* Right Side: Sticky Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="sticky top-[120px] bg-white border border-stone-200 p-6 sm:p-8">
            <h2 className="text-sm font-bold tracking-[0.1em] uppercase mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {orderItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 aspect-[3/4] bg-stone-100 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-[11px] text-stone-500 mb-2">Size: {item.size} • Qty: {item.qty}</p>
                    <p className="text-sm font-semibold">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-stone-200 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-black font-semibold uppercase text-xs tracking-wider">Free</span>
              </div>
              <div className="flex justify-between text-lg font-serif pt-4 border-t border-stone-200 mt-4">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

// Arrow component inline
function ArrowRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
