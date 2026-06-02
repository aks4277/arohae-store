const fs = require('fs');
const pages = ['women', 'accessories', 'sale', 'contact', 'careers', 'press', 'faq', 'shipping', 'returns', 'track-order', 'privacy', 'terms'];

pages.forEach(p => {
  const dir = `src/app/(customer)/${p}`;
  fs.mkdirSync(dir, { recursive: true });
  
  const title = p.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const content = `export default function Page() { 
  return ( 
    <div className="min-h-screen bg-[#FAF9F6] pt-48 px-6 flex flex-col items-center text-center"> 
      <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6">${title}</h1> 
      <p className="text-stone-500 max-w-2xl text-lg font-light leading-relaxed"> 
        This premium page is currently being thoughtfully crafted by our editorial team. Please check back soon for our latest updates and collections. 
      </p> 
    </div> 
  ); 
}`;
  
  fs.writeFileSync(`${dir}/page.tsx`, content);
  console.log(`Created ${p}`);
});
