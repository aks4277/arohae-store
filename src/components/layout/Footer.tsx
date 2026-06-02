import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          <div className="lg:col-span-3 space-y-6">
            <Logo className="h-16 w-auto text-stone-50 -ml-4" />
            <p className="text-[15px] font-serif italic text-stone-400 leading-relaxed max-w-sm tracking-wide">
              "Inspired by love, grace, and the journey of self-expression. A celebration of the modern woman who rises with confidence and elegance."
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-stone-50 font-medium mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/women" className="hover:text-stone-50 transition-colors">Women</Link></li>
              <li><Link href="/accessories" className="hover:text-stone-50 transition-colors">Accessories</Link></li>
              <li><Link href="/sale" className="hover:text-stone-50 transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-stone-50 font-medium mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/our-story" className="hover:text-stone-50 transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-stone-50 transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-stone-50 transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-stone-50 transition-colors">Press</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-stone-50 font-medium mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className="hover:text-stone-50 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-stone-50 transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-stone-50 transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-stone-50 transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/track-order" className="hover:text-stone-50 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-stone-50 font-medium mb-6 uppercase tracking-wider text-sm">Join Our Newsletter</h4>
            <p className="text-sm mb-4 text-stone-400">Subscribe for exclusive offers, new arrivals, and styling tips.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-stone-800 border-none text-stone-300 px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#947156]"
              />
              <button 
                type="submit" 
                className="bg-[#947156] text-white px-4 py-2 hover:bg-[#83634a] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
        
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Arohae. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-stone-50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-50 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
