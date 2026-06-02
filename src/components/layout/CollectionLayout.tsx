"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  category: string;
}

interface CollectionLayoutProps {
  title: string;
  description: string;
  products: Product[];
  heroImage: string;
}

export default function CollectionLayout({ title, description, products, heroImage }: CollectionLayoutProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Parse price string (e.g. "$495" -> 495)
    const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ''), 10) || 0;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: numericPrice,
      size: "One Size",
      color: "Standard",
      image: product.image
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 pb-32">
      {/* Collection Hero */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt={title} className="object-cover object-[center_10%] w-full h-full opacity-70 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl pt-20">
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight mb-6 drop-shadow-lg">{title}</h1>
          <p className="text-stone-200 text-lg font-light drop-shadow-md">{description}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6 md:px-12 lg:px-24 pt-24">
        <div className="flex justify-between items-center mb-12 text-sm uppercase tracking-widest text-stone-500 border-b border-stone-200 pb-4">
          <span>{products.length} Results</span>
          <div className="flex gap-8">
            <button className="hover:text-stone-900 transition-colors">Filter</button>
            <button className="hover:text-stone-900 transition-colors">Sort</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-16">
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] mb-4 bg-stone-100 overflow-hidden">
                <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0" />
                {product.hoverImage ? (
                  <img src={product.hoverImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                ) : (
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 scale-105" />
                )}
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button 
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="w-full bg-white/90 backdrop-blur text-stone-900 py-3 text-xs tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start mt-auto">
                <div>
                  <h3 className="text-sm font-medium text-stone-900 group-hover:text-[#947156] transition-colors">{product.name}</h3>
                  <p className="text-xs text-stone-500 mt-1">{product.category}</p>
                </div>
                <span className="text-sm font-serif text-stone-900">{product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
