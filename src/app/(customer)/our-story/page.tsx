"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Pinyon_Script } from "next/font/google";

const signatureFont = Pinyon_Script({ weight: "400", subsets: ["latin"] });

export default function OurStory() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  // Color transitions for legibility while scrolling over the light background
  const titleColor = useTransform(scrollYProgress, [0, 0.15], ["#ffffff", "#1c1917"]);
  const subtitleColor = useTransform(scrollYProgress, [0, 0.15], ["#1c1917", "#947156"]);
  const captionColor = useTransform(scrollYProgress, [0, 0.15], ["#1c1917", "#1c1917"]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="bg-[#FAF9F6] text-stone-900 selection:bg-[#947156] selection:text-white" ref={containerRef}>
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-900 group">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img 
            src="/images/story/story_hero_1780259912224.png" 
            alt="Arohae Editorial" 
            className="object-cover object-[center_30%] w-full h-full opacity-80 mix-blend-luminosity transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FAF9F6] opacity-90 transition-opacity duration-1000"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl pt-32">
          <motion.h1 style={{ y: textY, opacity: textOpacity, color: titleColor }} className="text-6xl md:text-8xl font-serif tracking-tight mb-6 drop-shadow-sm">
            More Than Fashion.
          </motion.h1>
          <motion.div style={{ y: textY, opacity: textOpacity, color: subtitleColor }} className="text-4xl md:text-7xl font-serif italic mb-12 font-light drop-shadow-lg">
            A Celebration of Womanhood.
          </motion.div>
          <motion.p style={{ y: textY, opacity: textOpacity, color: captionColor }} className="text-sm md:text-base tracking-[0.3em] uppercase font-medium drop-shadow-md">
            Inspired by love, grace, and self-expression.
          </motion.p>
        </div>
      </section>

      {/* 2. Founder Vision Section */}
      <section className="py-32 md:py-48 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="order-2 lg:order-1 space-y-8"
          >
            <motion.h2 variants={fadeInUp} className="text-sm tracking-[0.3em] uppercase text-[#947156] font-semibold">The Vision</motion.h2>
            <motion.h3 variants={fadeInUp} className="text-4xl md:text-5xl font-serif leading-tight text-stone-800">
              "We created <span className="italic text-[#947156]">Arohae</span> for women who embrace every chapter of their journey with elegance, courage, and unwavering confidence."
            </motion.h3>
            <motion.div variants={fadeInUp} className="space-y-6 text-stone-600 text-lg font-light leading-relaxed">
              <p>
                Arohae was born out of a desire to redefine luxury ethnic wear. We noticed a gap between traditional craftsmanship and the dynamic, fast-paced life of the contemporary woman. 
              </p>
              <p>
                Our vision is to empower women through fashion. When you wear Arohae, you are not just wearing a garment; you are wearing a piece of art that respects your heritage while celebrating your ambition.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="pt-12 pl-4">
              <p className={`text-6xl md:text-7xl text-stone-800 -rotate-2 origin-left ${signatureFont.className}`}>Vini Karakoti</p>
              <p className="text-xs tracking-[0.2em] uppercase text-[#947156] mt-4 ml-2">Founder & Creative Director</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
            className="order-1 lg:order-2 relative aspect-[4/5] rounded-t-full rounded-b-[2rem] overflow-hidden shadow-2xl shadow-stone-900/10 border-8 border-white group"
          >
            <img 
              src="/images/story/vini-karakoti.jpg" 
              alt="Vini Karakoti - Founder" 
              className="object-cover w-full h-full scale-105 transition-all duration-1000 group-hover:scale-100"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. The Meaning of Arohae */}
      <section className="py-32 bg-stone-900 text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">The Philosophy of Arohae</h2>
            <p className="text-stone-400 text-lg font-light leading-relaxed">
              The name Arohae is not just a label; it is a philosophy built on five foundational pillars that guide everything we create.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 divide-y md:divide-y-0 md:divide-x divide-stone-800">
            {[
              { title: "Love", desc: "The passion poured into every stitch and the self-love our garments inspire." },
              { title: "Grace", desc: "An effortless elegance that moves with you, never restricting your flow." },
              { title: "Confidence", desc: "The quiet power you feel when you know you look absolutely stunning." },
              { title: "Self-expression", desc: "Fashion as a language, speaking your truth without a single word." },
              { title: "Individuality", desc: "Celebrating what makes you unique in a world of uniformity." }
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}
                className="pt-8 md:pt-0 md:px-6 flex flex-col items-center text-center first:pl-0 last:pr-0"
              >
                <h4 className="font-serif text-2xl italic text-[#947156] mb-4">{pillar.title}</h4>
                <p className="text-stone-400 text-sm font-light leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Woman Section */}
      <section className="py-32 md:py-48 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
              className="lg:w-1/2 relative aspect-square md:aspect-[4/3] lg:aspect-square w-full"
            >
              <img 
                src="/images/story/story_community_1780259939780.png" 
                alt="The Arohae Woman" 
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
              className="lg:w-1/2 space-y-8"
            >
              <motion.h2 variants={fadeInUp} className="text-5xl font-serif text-stone-800">The Arohae Woman</motion.h2>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                {['Independent', 'Ambitious', 'Elegant', 'Fearless', 'Authentic'].map(tag => (
                  <span key={tag} className="px-6 py-2 border border-stone-200 rounded-full text-stone-500 text-sm tracking-widest uppercase">
                    {tag}
                  </span>
                ))}
              </motion.div>
              <motion.p variants={fadeInUp} className="text-stone-600 text-lg font-light leading-relaxed pt-6">
                She is unapologetic in her ambition and uncompromising in her style. She commands the boardroom with the same grace she brings to a festive celebration. The Arohae woman doesn't follow trends; she sets the standard.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Design Philosophy & 6. Values */}
      <section className="py-32 bg-stone-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h3 variants={fadeInUp} className="text-3xl font-serif mb-12 text-stone-800">Design Philosophy</motion.h3>
              <div className="space-y-8">
                {[
                  { title: "Modern Silhouettes", desc: "Fluid, structure-meets-drape designs." },
                  { title: "Indian Craftsmanship", desc: "Honoring heritage techniques in contemporary ways." },
                  { title: "Timeless Elegance", desc: "Pieces designed to transcend seasonal trends." },
                  { title: "Versatile Wardrobe", desc: "Transition seamlessly from day to evening." }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="border-b border-stone-300 pb-6">
                    <h4 className="text-xl font-serif text-stone-800 mb-2">{item.title}</h4>
                    <p className="text-stone-500 font-light">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h3 variants={fadeInUp} className="text-3xl font-serif mb-12 text-stone-800">Our Values</motion.h3>
              <div className="space-y-8">
                {[
                  { title: "Premium Quality", desc: "Sourcing only the finest silks, cottons, and blends." },
                  { title: "Attention to Detail", desc: "Perfection in every seam, hem, and embroidery." },
                  { title: "Responsible Sourcing", desc: "Ethical partnerships with local artisans." },
                  { title: "Customer-First", desc: "An experience tailored to make you feel cherished." }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="border-b border-stone-300 pb-6">
                    <h4 className="text-xl font-serif text-stone-800 mb-2">{item.title}</h4>
                    <p className="text-stone-500 font-light">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 8. Hero Quote */}
      <section className="py-48 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-stone-800">
            "Every woman has a story.<br/>
            <span className="italic text-[#947156]">Arohae is the confidence she wears while writing it.</span>"
          </h2>
        </motion.div>
      </section>

      {/* 11. Future Vision */}
      <section className="py-32 bg-[#947156] text-white">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-sm tracking-[0.3em] uppercase mb-8">The Movement</motion.h2>
            <motion.p variants={fadeInUp} className="text-3xl md:text-4xl font-serif font-light leading-relaxed mb-12">
              Arohae is more than a clothing label. We are a celebration of modern femininity, a lifestyle destination for the woman who embraces her full, authentic self.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 12. Call to Action */}
      <section className="py-32 text-center bg-stone-900 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="container mx-auto px-6"
        >
          <h2 className="text-5xl font-serif mb-12">Ready to write your story?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-white text-black hover:bg-stone-200 rounded-full px-12 py-8 text-sm tracking-widest uppercase transition-all duration-300" asChild>
              <Link href="/women">Discover the Collection</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 hover:bg-white/10 text-white rounded-full px-12 py-8 text-sm tracking-widest uppercase transition-all duration-300" asChild>
              <Link href="/account">Join the Arohae Journey</Link>
            </Button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
 
