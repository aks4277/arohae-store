import { Button } from "@/components/ui/button";

export default function TrackOrder() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-40 pb-24 text-stone-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-12 shadow-sm border border-stone-100 text-center">
        <h1 className="text-3xl font-serif mb-4">Track Your Order</h1>
        <p className="text-stone-500 text-sm font-light mb-8">Enter your order details below to see the latest shipping updates.</p>
        
        <form className="space-y-6 text-left">
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Order Number</label>
            <input type="text" placeholder="e.g. AR-10294" className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#947156] transition-colors bg-transparent" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
            <input type="email" placeholder="Email used for purchase" className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#947156] transition-colors bg-transparent" />
          </div>
          <Button type="button" className="w-full bg-[#947156] text-white rounded-none py-6 tracking-[0.2em] uppercase text-xs hover:bg-stone-900 transition-colors mt-4">Track Now</Button>
        </form>
      </div>
    </div>
  );
}