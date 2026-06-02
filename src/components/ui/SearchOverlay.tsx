"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling when open
    } else {
      document.body.style.overflow = "unset";
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#FAF9F6] text-stone-900"
        >
          {/* Header area */}
          <div className="flex items-center justify-between px-6 py-8 md:px-12 md:py-12">
            <div className="text-xs tracking-[0.2em] uppercase font-semibold text-[#947156]">
              Search Arohae
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:opacity-50 transition-opacity flex items-center gap-2 group"
            >
              <span className="text-[11px] font-medium tracking-[0.1em] border-b border-transparent group-hover:border-current pb-0.5 uppercase hidden sm:block">Close</span>
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Search Input Area */}
          <div className="flex-1 flex flex-col items-center justify-start mt-20 px-6">
            <div className="w-full max-w-4xl relative group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 text-stone-300 group-focus-within:text-[#947156] transition-colors" strokeWidth={1.5} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-b-2 border-stone-200 focus:border-[#947156] text-3xl md:text-5xl lg:text-7xl font-serif py-6 pl-12 md:pl-16 lg:pl-20 focus:outline-none transition-colors placeholder:text-stone-300"
                autoFocus
              />
            </div>

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-4xl mt-16"
            >
              <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-stone-500 mb-6">Popular Searches</h3>
              <div className="flex flex-wrap gap-4">
                {["Linen Dresses", "Silk Sarees", "Festive Edit", "Gold Accessories", "Summer Collection"].map(term => (
                  <button 
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-6 py-2 border border-stone-200 rounded-full text-sm font-light hover:border-[#947156] hover:text-[#947156] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
