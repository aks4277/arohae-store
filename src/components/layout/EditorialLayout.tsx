"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLink {
  label: string;
  href: string;
}

interface EditorialLayoutProps {
  title: string;
  sidebarLinks: SidebarLink[];
  children: React.ReactNode;
}

export default function EditorialLayout({ title, sidebarLinks, children }: EditorialLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-40 pb-24 text-stone-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left border-b border-stone-200 pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight"
          >
            {title}
          </motion.h1>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full md:w-64 shrink-0"
          >
            <div className="sticky top-32">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-6">Directory</h3>
              <ul className="space-y-4">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className={`block text-sm tracking-wide transition-colors ${
                          isActive 
                            ? "text-[#947156] font-medium" 
                            : "text-stone-500 hover:text-stone-900"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex-1 space-y-8 text-stone-600 font-light leading-relaxed text-lg pb-32"
          >
            {children}
          </motion.main>

        </div>
      </div>
    </div>
  );
}
