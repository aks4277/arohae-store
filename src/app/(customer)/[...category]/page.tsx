"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { supabase } from "@/lib/supabase";

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-sm">Loading...</div>}>
      <CategoryPageContent />
    </Suspense>
  );
}

function CategoryPageContent() {
  const pathname = usePathname();
  // Create a breadcrumb-style title from the nested route segments
  const segments = pathname.split('/').filter(Boolean);
  const categoryName = segments.join(' / ').replace(/-/g, ' ') || 'Women';
  const displayCategory = categoryName.toUpperCase();
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const searchCategory = segments[segments.length - 1]?.replace(/-/g, ' ') || 'Women';
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('category', `%${searchCategory}%`)
        .limit(16);
        
      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    }
    
    fetchProducts();
  }, [pathname]);


  return (
    <div className="min-h-screen bg-white text-black pt-[100px] pb-32 font-sans">
      
      {/* Editorial Header */}
      <div className="w-full px-4 sm:px-8 mb-12 flex flex-col items-center">
        <h1 className="text-4xl md:text-[5rem] font-serif tracking-tighter uppercase font-light text-center mb-6 leading-none">{displayCategory}</h1>
        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">{products.length} Items</div>
      </div>

      {/* Sticky Minimal Toolbar */}
      <div className="sticky top-[64px] sm:top-[80px] z-30 w-full bg-white border-y border-black/5">
        <div className="w-full px-4 sm:px-8 flex justify-between items-center h-12">
          <button 
            className="text-[11px] font-bold uppercase tracking-[0.1em] hover:opacity-50 transition-opacity flex items-center gap-2"
            onClick={() => setIsFiltersOpen(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            FILTERS
          </button>
          
          <div className="flex items-center gap-6">
            <select className="bg-transparent border-none text-[11px] font-bold uppercase tracking-[0.1em] outline-none cursor-pointer hover:opacity-50 transition-opacity appearance-none text-right">
              <option>RECOMMENDED</option>
              <option>NEWEST</option>
              <option>PRICE LOW TO HIGH</option>
              <option>PRICE HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* Extreme Minimal Product Grid (Zara style: massive images, tiny text) */}
      <div className="w-full px-2 sm:px-4 mt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-4">
        {isLoading ? (
          <div className="col-span-2 md:col-span-4 py-32 text-center text-[11px] font-bold tracking-widest uppercase animate-pulse">Loading Products...</div>
        ) : products.length === 0 ? (
          <div className="col-span-2 md:col-span-4 py-32 text-center text-[11px] font-bold tracking-widest uppercase">No products found in this category.</div>
        ) : (
          products.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.id} className="group block mb-8">
              <div className="relative aspect-[3/4.5] overflow-hidden bg-gray-100 mb-3">
                <img 
                  src={product.image_url || product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col px-1">
                <h3 className="text-[10px] font-semibold tracking-[0.05em] uppercase text-black mb-1 leading-tight group-hover:underline underline-offset-4">{product.name}</h3>
                <p className="text-[11px] text-gray-500">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </Link>
          ))
        )}
        </div>

        {/* Load More */}
        <div className="mt-16 mb-24 flex justify-center">
          <button className="text-[11px] font-bold uppercase tracking-[0.1em] border-b border-black pb-1 hover:opacity-50 transition-opacity">
            VIEW MORE
          </button>
        </div>
      </div>

      {/* Zara-style Slide-over Filters */}
      <AnimatePresence>
        {isFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              onClick={() => setIsFiltersOpen(false)}
              className="fixed inset-0 bg-black/20 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[400px] bg-white z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-8">
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase">FILTERS</span>
                <button onClick={() => setIsFiltersOpen(false)} className="hover:opacity-50 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-12">
                {/* Category */}
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-6">CATEGORY</h3>
                  <ul className="space-y-4">
                    {["Dresses", "Tops", "Knitwear", "Trousers", "Outerwear"].map(opt => (
                      <li key={opt}>
                        <button className="text-[12px] uppercase tracking-wide hover:underline underline-offset-4">{opt}</button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Color */}
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-6">COLOR</h3>
                  <div className="flex flex-wrap gap-4">
                    {[{n: "Black", c: "#000"}, {n: "White", c: "#fff"}, {n: "Beige", c: "#F5F5DC"}, {n: "Navy", c: "#000080"}].map(opt => (
                      <button key={opt.n} className="flex flex-col items-center gap-2 group">
                        <span className="w-6 h-6 rounded-full border border-gray-200 shadow-sm transition-transform group-hover:scale-110" style={{ backgroundColor: opt.c }}></span>
                        <span className="text-[9px] uppercase tracking-wider text-gray-500">{opt.n}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-6">PRICE</h3>
                  <ul className="space-y-4">
                    {["Under ₹5,000", "₹5,000 - ₹10,000", "Over ₹10,000"].map(opt => (
                      <li key={opt}>
                        <label className="flex items-center gap-4 cursor-pointer group">
                          <input type="checkbox" className="appearance-none w-4 h-4 border border-black rounded-sm checked:bg-black checked:border-black transition-colors" />
                          <span className="text-[12px] uppercase tracking-wide group-hover:opacity-70">{opt}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 flex gap-4">
                <button className="flex-1 py-4 text-[11px] font-bold tracking-[0.1em] uppercase border border-black hover:bg-black hover:text-white transition-colors" onClick={() => setIsFiltersOpen(false)}>
                  APPLY
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
