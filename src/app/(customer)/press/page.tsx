export default function Press() {
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
}