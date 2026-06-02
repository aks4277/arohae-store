"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Cart", href: "/cart", icon: ShoppingBag, badge: 2 },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Account", href: "/account", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-lg border-t border-stone-200 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="relative flex flex-col items-center justify-center w-full h-full text-stone-500 hover:text-stone-900 transition-colors">
              <div className="relative">
                <item.icon className={`w-5 h-5 mb-1 transition-colors ${isActive ? 'text-[#947156]' : ''}`} strokeWidth={isActive ? 2 : 1.5} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-1 py-0.5 text-[9px] font-bold leading-none text-white bg-[#947156] rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-wide ${isActive ? 'text-[#947156] font-semibold' : 'font-medium'}`}>{item.name}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="mobileNavIndicator"
                  className="absolute top-0 w-8 h-[2px] bg-[#947156] rounded-b-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
