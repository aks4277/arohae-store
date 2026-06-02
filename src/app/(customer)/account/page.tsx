"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Package, User, MapPin, LogOut, ChevronRight, Download } from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  const orders = [
    { id: "ORD-94302", date: "Oct 24, 2026", status: "Delivered", total: 10498, items: 2 },
    { id: "ORD-89211", date: "Sep 12, 2026", status: "Processing", total: 24500, items: 1 },
    { id: "ORD-75409", date: "Aug 05, 2026", status: "Returned", total: 6999, items: 1 },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans pt-[120px] pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-3xl font-serif font-light tracking-tight">My Account</h1>
          <p className="text-sm text-stone-500 mt-2">Welcome back, Ajay.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-4 text-sm tracking-wide transition-colors ${activeTab === 'orders' ? 'bg-white font-semibold shadow-sm text-black' : 'text-stone-500 hover:bg-stone-100 hover:text-black'}`}
              >
                <div className="flex items-center gap-3"><Package className="w-4 h-4" /> Orders</div>
                {activeTab === 'orders' && <ChevronRight className="w-4 h-4" />}
              </button>
              
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between p-4 text-sm tracking-wide transition-colors ${activeTab === 'profile' ? 'bg-white font-semibold shadow-sm text-black' : 'text-stone-500 hover:bg-stone-100 hover:text-black'}`}
              >
                <div className="flex items-center gap-3"><User className="w-4 h-4" /> Profile Details</div>
                {activeTab === 'profile' && <ChevronRight className="w-4 h-4" />}
              </button>

              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-4 text-sm tracking-wide transition-colors ${activeTab === 'addresses' ? 'bg-white font-semibold shadow-sm text-black' : 'text-stone-500 hover:bg-stone-100 hover:text-black'}`}
              >
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> Addresses</div>
                {activeTab === 'addresses' && <ChevronRight className="w-4 h-4" />}
              </button>

              <button className="w-full flex items-center justify-between p-4 text-sm tracking-wide text-red-500 hover:bg-red-50 transition-colors mt-8">
                <div className="flex items-center gap-3"><LogOut className="w-4 h-4" /> Log Out</div>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {activeTab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <h2 className="text-sm font-bold tracking-[0.1em] uppercase border-b border-stone-200 pb-4 mb-6">Order History</h2>
                  
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-stone-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-mono text-sm font-semibold text-[#947156]">{order.id}</span>
                              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 ${
                                order.status === 'Delivered' ? 'bg-green-50 text-green-700' :
                                order.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                                'bg-red-50 text-red-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-xs text-stone-500">{order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}</p>
                          </div>
                          
                          <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                            <div className="text-right">
                              <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">Total</p>
                              <p className="text-sm font-semibold">₹{order.total.toLocaleString('en-IN')}</p>
                            </div>
                            <button className="text-xs font-bold uppercase tracking-widest border-b border-black hover:text-[#947156] hover:border-[#947156] transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-24 bg-white border border-stone-200">
                      <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                      <h3 className="text-lg font-serif mb-2">No orders yet</h3>
                      <p className="text-sm text-stone-500 mb-6">When you place an order, it will appear here.</p>
                      <Link href="/women" className="inline-block bg-black text-white px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors">
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-sm font-bold tracking-[0.1em] uppercase border-b border-stone-200 pb-4 mb-6">Profile Details</h2>
                  <div className="bg-white border border-stone-200 p-8 max-w-2xl space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">First Name</label>
                        <input type="text" defaultValue="Ajay" className="w-full border-b border-stone-300 py-2 text-sm focus:outline-none focus:border-black transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Last Name</label>
                        <input type="text" defaultValue="Karakoti" className="w-full border-b border-stone-300 py-2 text-sm focus:outline-none focus:border-black transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
                      <input type="email" defaultValue="ajay@example.com" className="w-full border-b border-stone-300 py-2 text-sm focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Phone Number</label>
                      <input type="tel" defaultValue="+91 98765 43210" className="w-full border-b border-stone-300 py-2 text-sm focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <button className="bg-black text-white px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors mt-4">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div key="addresses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
                    <h2 className="text-sm font-bold tracking-[0.1em] uppercase">Saved Addresses</h2>
                    <button className="text-xs font-bold uppercase tracking-widest text-[#947156] hover:text-black transition-colors">
                      + Add New
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-black p-6 relative">
                      <div className="absolute top-4 right-4 bg-black text-white text-[9px] uppercase tracking-widest px-2 py-1 font-bold">Default</div>
                      <h3 className="font-semibold text-sm mb-1">Ajay Karakoti</h3>
                      <p className="text-xs text-stone-500 leading-relaxed mb-4">
                        123 Fashion Street, Cyber Hub<br />
                        Gurugram, Haryana 122002<br />
                        India
                      </p>
                      <div className="flex gap-4">
                        <button className="text-[10px] uppercase tracking-widest font-bold border-b border-stone-300 hover:border-black transition-colors">Edit</button>
                        <button className="text-[10px] uppercase tracking-widest font-bold text-red-500 border-b border-transparent hover:border-red-500 transition-colors">Delete</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
