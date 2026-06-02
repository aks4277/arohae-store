"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import SearchOverlay from "@/components/ui/SearchOverlay";
import { useCart } from "@/context/CartContext";

const megaMenuData = {
  CLOTHING: {
    categories: [
      {
        title: "SHOP BY CATEGORY",
        links: ["Dresses", "Shirts & Tops", "T-shirts", "Trousers", "Jeans", "Shorts", "Skirts", "Knitwear", "Jackets", "Coats"]
      },
      {
        title: "COLLECTIONS",
        links: ["Linen Collection", "Partywear", "Office Edit", "Basics"]
      }
    ],
    featured: {
      title: "SPRING SUMMER '26",
      image: "/images/products/tunic_2_1780252716722.png",
      link: "/collections/ss26"
    }
  },
  ETHNIC: {
    categories: [
      {
        title: "TRADITIONAL",
        links: ["Sarees", "Kurtas", "Lehengas", "Suit Sets", "Dupattas"]
      }
    ],
    featured: {
      title: "THE FESTIVE EDIT",
      image: "/images/products/tunic_3_1780252733370.png",
      link: "/collections/festive"
    }
  },
  ACCESSORIES: {
    categories: [
      {
        title: "ALL ACCESSORIES",
        links: ["Shoes", "Bags", "Jewellery", "Belts", "Sunglasses"]
      }
    ],
    featured: {
      title: "NEW ARRIVALS",
      image: "/images/products/tote_1780252769115.png",
      link: "/collections/accessories"
    }
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const isMenuOpen = activeMenu !== null;
  const isDarkThemePage = pathname === '/' || pathname === '/our-story' || pathname === '/women' || pathname === '/accessories' || pathname === '/sale';
  const forceDarkText = !isDarkThemePage;
  
  const navStyle = (isScrolled || isMenuOpen || forceDarkText) ? 'bg-white shadow-sm' : 'bg-transparent';
  const textStyle = (isScrolled || isMenuOpen || forceDarkText) ? 'text-black' : 'text-white';

  return (
    <motion.header 
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${navStyle}`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="w-full px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Menu Icon */}
          <div className="flex-1 md:hidden">
            <button className={`${textStyle} p-1`} aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation - Left */}
          <nav className="hidden md:flex flex-1 items-center space-x-8">
            {['NEW IN', 'CLOTHING', 'ETHNIC', 'ACCESSORIES', 'BEAUTY'].map((item) => (
              <div 
                key={item} 
                className="h-full flex items-center py-6"
                onMouseEnter={() => setActiveMenu(megaMenuData[item as keyof typeof megaMenuData] ? item : null)}
              >
                <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className={`text-[11px] font-medium tracking-[0.1em] transition-colors ${textStyle} hover:opacity-50`}>
                  {item}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-center group">
            <Link href="/" className={`transition-all duration-500 ${textStyle} flex items-center group-hover:text-[#947156] group-hover:drop-shadow-[0_0_15px_rgba(148,113,86,0.5)] group-hover:scale-105`}>
              <Logo className="h-12 sm:h-16 w-auto transition-transform duration-500" />
            </Link>
          </div>

          {/* Icons - Right */}
          <div className="flex flex-1 items-center justify-end space-x-4 sm:space-x-6">
            <Link href="/our-story" className={`hidden md:block transition-colors ${textStyle} hover:opacity-50 text-[11px] font-medium tracking-[0.1em] mr-2`}>
              OUR STORY
            </Link>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`transition-colors ${textStyle} hover:opacity-50 flex items-center gap-2`} 
              aria-label="Search"
            >
              <span className="hidden sm:inline text-[11px] font-medium tracking-[0.1em] border-b border-current pb-0.5">SEARCH</span>
              <Search className="h-4 w-4 sm:hidden" strokeWidth={1.5} />
            </button>
            <Link href="/account" className={`hidden sm:block transition-colors ${textStyle} hover:opacity-50`} aria-label="Account">
              <User className="h-[18px] w-[18px]" strokeWidth={1.2} />
            </Link>
            <Link href="/cart" className={`transition-colors ${textStyle} hover:opacity-50 relative`} aria-label="Cart">
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.2} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#947156] text-white text-[9px] w-[14px] h-[14px] flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
        </div>
      </div>

      {/* Ultra-Minimal Mega Menu Dropdown */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border-t border-black/5 overflow-hidden shadow-2xl"
          >
            <div className="w-full px-8 py-16 flex justify-between max-w-[1600px] mx-auto">
              
              {/* Categories */}
              <div className="flex gap-24">
                {megaMenuData[activeMenu as keyof typeof megaMenuData]?.categories.map((cat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h3 className="text-[11px] font-bold text-black tracking-[0.1em] mb-6">{cat.title}</h3>
                    <ul className="space-y-3">
                      {cat.links.map((link, i) => (
                        <li key={i}>
                          <Link href={`/${activeMenu.toLowerCase()}/${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-[12px] text-gray-500 hover:text-black hover:underline underline-offset-4 transition-colors">
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Editorial Feature */}
              <div className="w-[300px] xl:w-[400px]">
                {megaMenuData[activeMenu as keyof typeof megaMenuData]?.featured && (
                  <Link href={megaMenuData[activeMenu as keyof typeof megaMenuData]!.featured.link} className="group block relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                    <img 
                      src={megaMenuData[activeMenu as keyof typeof megaMenuData]!.featured.image} 
                      alt={megaMenuData[activeMenu as keyof typeof megaMenuData]!.featured.title} 
                      className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center">
                      <span className="text-white text-[11px] font-bold tracking-[0.15em]">{megaMenuData[activeMenu as keyof typeof megaMenuData]!.featured.title}</span>
                    </div>
                  </Link>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.header>
  );
}
