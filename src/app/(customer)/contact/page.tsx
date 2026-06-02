import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-40 pb-24 text-stone-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif mb-8">Get in Touch</h1>
            <p className="text-stone-500 text-lg font-light mb-12">Whether you have a question about an order, styling advice, or just want to say hello, we'd love to hear from you.</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-stone-400 mb-2">Customer Care</h3>
                <p className="text-lg">care@arohae.com</p>
                <p className="text-stone-500 font-light">+1 (800) 123-4567</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-stone-400 mb-2">Flagship Store</h3>
                <p className="text-lg">123 Fashion Avenue<br/>New York, NY 10012</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-100">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">First Name</label>
                  <input type="text" className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#947156] transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Last Name</label>
                  <input type="text" className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#947156] transition-colors bg-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
                <input type="email" className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#947156] transition-colors bg-transparent" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Message</label>
                <textarea rows={4} className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#947156] transition-colors bg-transparent resize-none"></textarea>
              </div>
              <Button type="button" className="w-full bg-stone-900 text-white rounded-none py-6 tracking-[0.2em] uppercase text-xs hover:bg-[#947156] transition-colors mt-8">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}