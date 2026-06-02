const fs = require('fs');

const contactContent = `import { Button } from "@/components/ui/button";

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
}`;

const faqContent = `export default function FAQ() {
  const faqs = [
    { q: "How long does shipping take?", a: "Domestic orders typically take 3-5 business days. International shipping can take between 7-14 business days depending on customs." },
    { q: "Can I change my order after placing it?", a: "We process orders very quickly, but if you contact us within 1 hour of placing your order, we will do our best to accommodate any changes." },
    { q: "Do you offer international shipping?", a: "Yes, we ship to over 100 countries worldwide. Duties and taxes are calculated at checkout." },
    { q: "How do I care for my silk garments?", a: "We recommend dry cleaning for all silk pieces to maintain their luster and drape. For minor wrinkles, a gentle steam is best." },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-40 pb-24 text-stone-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Frequently Asked Questions</h1>
          <p className="text-stone-500 text-lg font-light">Find answers to our most common inquiries below.</p>
        </div>
        
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-stone-200 pb-8">
              <h3 className="text-2xl font-serif mb-4 text-[#947156]">{faq.q}</h3>
              <p className="text-stone-600 font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const trackOrderContent = `import { Button } from "@/components/ui/button";

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
}`;

const careersContent = `export default function Careers() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-40 pb-24 text-stone-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Join the Movement</h1>
          <p className="text-stone-500 text-lg font-light leading-relaxed">We are always looking for passionate, creative, and ambitious individuals to join the Arohae family. Discover our open roles and help us redefine modern elegance.</p>
        </div>
        
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-8 border-b border-stone-200 pb-4">Open Positions</h2>
        
        <div className="space-y-4">
          {[
            { title: "Senior Pattern Maker", dept: "Atelier", loc: "New York, NY" },
            { title: "E-Commerce Manager", dept: "Digital", loc: "Remote" },
            { title: "Retail Stylist", dept: "Retail", loc: "Los Angeles, CA" },
            { title: "Marketing Coordinator", dept: "Marketing", loc: "New York, NY" }
          ].map((job, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-stone-100 hover:border-[#947156] transition-colors cursor-pointer group">
              <div>
                <h3 className="text-xl font-serif group-hover:text-[#947156] transition-colors">{job.title}</h3>
                <p className="text-stone-500 text-sm mt-1">{job.dept}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-6">
                <span className="text-sm font-light text-stone-400">{job.loc}</span>
                <span className="text-xs tracking-[0.2em] uppercase text-stone-900">Apply &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const pressContent = `export default function Press() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-40 pb-24 text-stone-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-6xl font-serif mb-16 text-center">Press & Media</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { mag: "VOGUE", title: "Arohae: The New Definition of Elegant Occasion Wear", date: "Oct 2025" },
            { mag: "HARPER'S BAZAAR", title: "How Vini Karakoti is Redefining the Silk Saree", date: "Aug 2025" },
            { mag: "ELLE", title: "5 Minimalist Brands to Watch This Summer", date: "Jun 2025" },
            { mag: "THE CUT", title: "The Rise of Arohae in the Global Fashion Scene", date: "Feb 2025" },
            { mag: "WWD", title: "Arohae Secures Series A to Expand Retail Footprint", date: "Jan 2025" }
          ].map((article, i) => (
            <div key={i} className="bg-white p-8 border border-stone-100 flex flex-col justify-between aspect-square group cursor-pointer hover:shadow-lg transition-all">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#947156] mb-4">{article.mag}</p>
                <h3 className="text-2xl font-serif leading-snug group-hover:text-[#947156] transition-colors">{article.title}</h3>
              </div>
              <p className="text-sm text-stone-400 font-light">{article.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

fs.writeFileSync('src/app/(customer)/contact/page.tsx', contactContent);
fs.writeFileSync('src/app/(customer)/faq/page.tsx', faqContent);
fs.writeFileSync('src/app/(customer)/track-order/page.tsx', trackOrderContent);
fs.writeFileSync('src/app/(customer)/careers/page.tsx', careersContent);
fs.writeFileSync('src/app/(customer)/press/page.tsx', pressContent);
console.log('Interactive pages updated.');
