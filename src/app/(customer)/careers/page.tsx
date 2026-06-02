export default function Careers() {
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
}