"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, Tag, BarChart, Search, Bell, Menu, Plus, FileText, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [cmdKSearch, setCmdKSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdKOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCmdKOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { name: "Go to Dashboard", icon: LayoutDashboard, action: () => router.push('/admin') },
    { name: "Go to Products", icon: Package, action: () => router.push('/admin/products') },
    { name: "Go to Orders", icon: ShoppingCart, action: () => router.push('/admin/orders') },
    { name: "Go to Customers", icon: Users, action: () => router.push('/admin/customers') },
    { name: "View Analytics", icon: BarChart, action: () => router.push('/admin/analytics') },
    { name: "Store Settings", icon: Settings, action: () => router.push('/admin/settings') },
  ];

  const filteredCommands = commands.filter(c => c.name.toLowerCase().includes(cmdKSearch.toLowerCase()));

  const executeCommand = (action: () => void) => {
    action();
    setIsCmdKOpen(false);
    setCmdKSearch("");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Tag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  ];

  return (
    <div className="flex h-screen bg-[#FDFCFB] overflow-hidden text-stone-900 font-sans selection:bg-[#947156]/20">
      
      {/* Ultra-Premium Sidebar */}
      <aside className="w-[260px] bg-white border-r border-stone-100 flex-col hidden md:flex shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.01)] z-20">
        <div className="h-24 flex items-center px-8 border-b border-stone-50">
          <Link href="/admin" className="text-stone-900 tracking-tight flex items-center gap-2">
            <Logo className="h-12 w-auto text-[#947156]" />
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4 px-4">Overview</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group">
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#947156]/10 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-[#947156]' : 'text-stone-400 group-hover:text-stone-600'}`} />
                  <span className={`relative z-10 transition-colors ${isActive ? 'text-[#947156] font-semibold' : 'text-stone-600 group-hover:text-stone-900'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 px-4 mb-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 mb-4">
            <div className="text-xs font-medium text-stone-500 mb-2">Storage Used</div>
            <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#947156] w-3/4 rounded-full"></div>
            </div>
            <div className="text-[10px] text-stone-400 mt-2 text-right">75% capacity</div>
          </div>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors">
            <Settings className="w-5 h-5 text-stone-400" /> Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Glassmorphic Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 flex items-center justify-between px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-stone-400 hover:text-stone-900 transition-colors"><Menu className="w-5 h-5"/></button>
            <div className="relative hidden sm:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search commands, products..." 
                onClick={() => setIsCmdKOpen(true)}
                readOnly
                className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-transparent hover:border-stone-200 focus:bg-white focus:border-[#947156] focus:ring-2 focus:ring-[#947156]/10 rounded-lg outline-none transition-all cursor-pointer"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-medium text-stone-400">
                <span className="px-1.5 py-0.5 rounded bg-stone-200/50 border border-stone-200">⌘</span>
                <span className="px-1.5 py-0.5 rounded bg-stone-200/50 border border-stone-200">K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-stone-400 hover:text-stone-900 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-stone-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-stone-900 group-hover:text-[#947156] transition-colors">Admin User</div>
                <div className="text-[11px] text-stone-500">Store Owner</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#947156] to-stone-400 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-transparent group-hover:ring-[#947156]/30 transition-all">
                AU
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#FDFCFB]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Global Command Palette (Cmd+K) */}
      <AnimatePresence>
        {isCmdKOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCmdKOpen(false)}
              className="fixed inset-0 bg-stone-900/60 z-[100] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-xl shadow-2xl z-[101] overflow-hidden border border-stone-200"
            >
              <div className="flex items-center px-4 py-3 border-b border-stone-100">
                <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Type a command or search..." 
                  value={cmdKSearch}
                  onChange={(e) => setCmdKSearch(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-stone-900 placeholder:text-stone-400 text-lg"
                />
                <div className="text-[10px] font-semibold text-stone-400 bg-stone-100 px-2 py-1 rounded-md shrink-0">ESC</div>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">Quick Actions</div>
                    {filteredCommands.map((cmd, i) => (
                      <button 
                        key={i}
                        onClick={() => executeCommand(cmd.action)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-stone-50 text-stone-700 hover:text-[#947156] transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-stone-100 group-hover:bg-[#947156]/10 rounded-md transition-colors">
                            <cmd.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-sm">{cmd.name}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center">
                    <Search className="w-8 h-8 text-stone-300 mx-auto mb-3" />
                    <p className="text-stone-500 font-medium text-sm">No commands found.</p>
                    <p className="text-stone-400 text-xs mt-1">Try searching for "Orders" or "Products"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
