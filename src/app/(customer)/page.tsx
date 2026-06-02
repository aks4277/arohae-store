"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const containerRef = useRef(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase.from('products').select('*').limit(4);
      if (data) setFeaturedProducts(data);
    }
    fetchFeatured();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-stone-100 selection:bg-[#947156] selection:text-white" ref={containerRef}>
      
      {/* 8K Cinematic Hero Section with Parallax */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <img 
            src="/images/products/tunic_1_1780252701842.png" 
            alt="Hero Fashion" 
            className="object-cover w-full h-full opacity-60 mix-blend-overlay"
          />
          {/* Subtle noise texture overlay for filmic feel */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"></div>
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] opacity-80"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center justify-center h-full pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-8 max-w-5xl"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 font-light">
              THE ART OF <br /> ELEVATION
            </h1>
            <p className="text-stone-300 text-lg md:text-2xl max-w-2xl mx-auto font-light tracking-wide uppercase letter-spacing-2">
              Autumn / Winter Collection 2026
            </p>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
              className="pt-12"
            >
              <Button variant="outline" size="lg" className="text-white border-white/30 bg-white/5 hover:bg-white hover:text-black transition-all duration-500 rounded-full px-10 py-6 text-sm tracking-[0.2em] uppercase backdrop-blur-sm" asChild>
                <Link href="/women">Explore Collection</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Editorial AI Recommendations */}
      <section className="py-32 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <motion.div variants={itemVariant} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-white mb-4">Curated For You</h2>
              <p className="text-stone-400 text-lg font-light leading-relaxed">Algorithmic precision meets haute couture. Discover pieces specifically selected for your aesthetic profile.</p>
            </div>
            <Link href="/collections/for-you" className="text-sm tracking-widest uppercase text-[#947156] hover:text-white transition-colors pb-2 border-b border-transparent hover:border-white">
              View Complete Edit
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {featuredProducts.length === 0 ? (
               <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center py-10 text-stone-500 animate-pulse uppercase tracking-widest text-xs">Loading Curated Selection...</div>
            ) : featuredProducts.map((prod, index) => (
              <motion.div key={prod.id || index} variants={itemVariant} className="group cursor-pointer">
                <Link href={`/product/${prod.slug}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 mb-6">
                    <img 
                      src={prod.image_url} 
                      alt={prod.name} 
                      className="object-cover w-full h-full transition-all duration-1000 group-hover:scale-110 group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                      <button className="text-xs tracking-[0.2em] uppercase text-white bg-white/10 backdrop-blur-md border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        Quick Add
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-lg text-stone-200 group-hover:text-white transition-colors uppercase">{prod.name}</h3>
                    <p className="text-stone-400 text-sm tracking-wide">₹{prod.price.toLocaleString('en-IN')}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Cinematic Categories */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-4 text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-light text-white">The Collections</h2>
        </div>
        
        <div className="flex flex-col md:flex-row w-full h-[70vh]">
          {[
            { cat: 'Women', title: "Women's Collection", img: '/images/products/tunic_1_1780252701842.png', link: '/women' },
            { cat: 'Accessories', title: 'Accessories', img: '/images/products/earrings_1780252782529.png', link: '/accessories' },
            { cat: 'Sale', title: 'Archive Sale', img: '/images/products/mules_1780252800480.png', link: '/sale' }
          ].map(({ cat, title, img, link }) => (
            <Link href={link} key={cat} className="relative flex-1 overflow-hidden group">
              <img 
                src={img}
                alt={title}
                className="object-cover w-full h-full opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <h3 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide mb-4">{title}</h3>
                <span className="opacity-0 group-hover:opacity-100 text-xs tracking-[0.2em] uppercase text-white transition-opacity duration-700 delay-100 border-b border-white/50 pb-1">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
