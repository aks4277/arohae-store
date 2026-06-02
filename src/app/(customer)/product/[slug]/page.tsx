"use client";

import { useState, use, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, Check, Share2, Plus, Minus } from "lucide-react";

// Mock Product Data
const MOCK_PRODUCT = {
  id: "PRD-1234",
  name: "SILK BLEND ASYMMETRIC TUNIC",
  price: 12500,
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "Ivory", hex: "#FFFFF0" },
    { name: "Burgundy", hex: "#800020" }
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  description: "A masterclass in modern minimalism. This asymmetric tunic is crafted from a fluid silk blend that drapes elegantly across the silhouette. Featuring an architectural high neck, concealed zip fastening, and elongated sleeves with structured cuffs. Unlined for maximum fluidity.",
  composition: "78% Viscose, 22% Silk. Dry clean only.",
  images: [
    "/images/products/tunic_1_1780252701842.png",
    "/images/products/tunic_2_1780252716722.png",
    "/images/products/tunic_3_1780252733370.png"
  ]
};

const CROSS_SELLS = [
  { id: 1, name: "TAILORED WIDE-LEG TROUSERS", price: 8900, image: "/images/products/trousers_1780252755043.png" },
  { id: 2, name: "STRUCTURAL LEATHER TOTE", price: 24500, image: "/images/products/tote_1780252769115.png" },
  { id: 3, name: "SCULPTURAL HOOP EARRINGS", price: 4200, image: "/images/products/earrings_1780252782529.png" },
  { id: 4, name: "LEATHER MULES", price: 11000, image: "/images/products/mules_1780252800480.png" }
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-sm">Loading...</div>}>
      <ProductClient params={params} />
    </Suspense>
  );
}

function ProductClient({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  const [selectedColor, setSelectedColor] = useState(MOCK_PRODUCT.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeSection, setActiveSection] = useState<'description' | 'composition'>('description');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": MOCK_PRODUCT.name,
    "image": MOCK_PRODUCT.images,
    "description": MOCK_PRODUCT.description,
    "sku": MOCK_PRODUCT.id,
    "offers": {
      "@type": "Offer",
      "url": "https://arohae.com/product/" + MOCK_PRODUCT.id,
      "brand": {
        "@type": "Brand",
        "name": "Arohae"
      },
      "priceCurrency": "INR",
      "price": MOCK_PRODUCT.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-32 md:pb-0 pt-[80px]">
      
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white cursor-zoom-out overflow-y-auto overflow-x-hidden flex items-center justify-center"
            onClick={() => setZoomedImage(null)}
          >
            <img 
              src={zoomedImage}
              alt="Zoomed"
              className="w-full max-w-[1200px] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto">
        
        {/* Left: Scrollable Massive Images */}
        <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col gap-1 p-1 sm:p-4">
          {MOCK_PRODUCT.images.map((img, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[3/4.5] bg-gray-100 cursor-zoom-in group overflow-hidden"
              onClick={() => setZoomedImage(img)}
            >
              <img 
                src={img}
                alt={`${MOCK_PRODUCT.name} View ${idx + 1}`}
                className="object-cover w-full h-full transition-transform duration-[10000ms] group-hover:scale-110 ease-out"
              />
            </div>
          ))}
        </div>

        {/* Right: Sticky Product Details */}
        <div className="w-full lg:w-[35%] xl:w-[30%] px-6 sm:px-12 py-12 lg:py-24">
          <div className="sticky top-[120px] max-w-[400px]">
            
            {/* Breadcrumb & Share */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                <Link href="/" className="hover:text-black transition-colors">HOME</Link>
                <span className="mx-2">/</span>
                <Link href="/clothing" className="hover:text-black transition-colors">CLOTHING</Link>
              </div>
              <button className="text-gray-400 hover:text-black transition-colors"><Share2 className="w-4 h-4" /></button>
            </div>

            {/* Title & Price */}
            <h1 className="text-[22px] font-bold tracking-[0.05em] uppercase mb-4 leading-tight">{MOCK_PRODUCT.name}</h1>
            <p className="text-[13px] text-gray-600 mb-12">₹{MOCK_PRODUCT.price.toLocaleString('en-IN')}</p>

            {/* Color Selection */}
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-4">COLOR <span className="text-gray-400 ml-2">{selectedColor.name}</span></p>
              <div className="flex gap-4">
                {MOCK_PRODUCT.colors.map(color => (
                  <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border ${selectedColor.name === color.name ? 'border-black scale-110 shadow-md' : 'border-gray-200'} transition-all`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em]">SIZE</p>
                <button className="text-[9px] uppercase tracking-[0.1em] text-gray-400 hover:text-black border-b border-transparent hover:border-black transition-all">SIZE GUIDE</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {MOCK_PRODUCT.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-[11px] font-bold uppercase tracking-wider border transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-black hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Add to Cart */}
            <div className="hidden md:flex gap-2 mb-16">
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                {isAdding ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Plus className="w-4 h-4" /></motion.div> : "ADD TO CART"}
              </button>
              <button className="w-14 border border-gray-200 flex items-center justify-center hover:border-black transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200">
              <div 
                className="py-6 border-b border-gray-200 cursor-pointer flex justify-between items-center group"
                onClick={() => setActiveSection(activeSection === 'description' ? 'composition' : 'description')}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.1em]">DESCRIPTION & DETAILS</span>
                {activeSection === 'description' ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              </div>
              <AnimatePresence>
                {activeSection === 'description' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="py-6 text-[12px] leading-relaxed text-gray-600 pr-4">{MOCK_PRODUCT.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <div 
                className="py-6 border-b border-gray-200 cursor-pointer flex justify-between items-center group"
                onClick={() => setActiveSection(activeSection === 'composition' ? 'description' : 'composition')}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.1em]">COMPOSITION & CARE</span>
                {activeSection === 'composition' ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              </div>
              <AnimatePresence>
                {activeSection === 'composition' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="py-6 text-[12px] leading-relaxed text-gray-600 pr-4">{MOCK_PRODUCT.composition}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-12 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
              <Check className="w-3 h-3 text-green-500" /> COMPLIMENTARY SHIPPING & RETURNS
            </div>
          </div>
        </div>
      </div>

      {/* Cross Selling Section */}
      <div className="w-full px-4 sm:px-8 mt-24 lg:mt-32 mb-12">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] mb-8 text-center border-b border-black pb-4 inline-block w-full">COMPLETE THE LOOK</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {CROSS_SELLS.map((item) => (
            <Link href={`/product/cross-sell-${item.id}`} key={item.id} className="group block mb-8">
              <div className="relative aspect-[3/4.5] overflow-hidden bg-gray-100 mb-3">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="object-cover w-full h-full transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col px-1">
                <h3 className="text-[10px] font-semibold tracking-[0.05em] uppercase text-black mb-1 leading-tight group-hover:underline underline-offset-4">{item.name}</h3>
                <p className="text-[11px] text-gray-500">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Sticky Add To Cart */}
      <div className="md:hidden fixed bottom-16 left-0 w-full bg-white border-t border-gray-100 p-4 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2"
        >
          {isAdding ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Plus className="w-4 h-4" /></motion.div> : "ADD TO CART"}
        </button>
      </div>

    </div>
  );
}
