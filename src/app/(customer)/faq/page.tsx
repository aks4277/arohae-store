export default function FAQ() {
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
}