const fs = require('fs');

const categories = [
  'Women', 'Accessories', 'Sale', 
  'Clothing / Dresses', 'Clothing / Shirts & Tops', 'Clothing / Trousers', 'Clothing / Jeans',
  'Ethnic / Sarees', 'Ethnic / Kurtas', 'Ethnic / Lehengas',
  'Accessories / Shoes', 'Accessories / Bags', 'Accessories / Jewellery'
];

const images = [
  "/images/products/tunic_1_1780252701842.png",
  "/images/products/trousers_1780252755043.png",
  "/images/products/tote_1780252769115.png",
  "/images/products/tunic_3_1780252733370.png",
  "/images/products/earrings_1780252782529.png",
  "/images/products/mules_1780252800480.png",
  "/images/products/tunic_2_1780252716722.png"
];

let sql = `
-- 1. Create the products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    price INTEGER NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Allow anonymous read access (so your website can fetch them)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
ON public.products
FOR SELECT
TO public
USING (true);

-- 3. Insert Dummy Products
INSERT INTO public.products (name, slug, price, category, image_url) VALUES 
`;

const products = [];
let counter = 1;

categories.forEach(cat => {
  const hash = cat.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const shortName = cat.split('/').pop().trim();
  
  // Generate 8 products per category
  for(let i = 0; i < 8; i++) {
    const name = `${shortName.toUpperCase()} - DESIGN ${i + 1}`;
    const slug = `premium-${shortName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')}-design-${i + 1}-${hash}`;
    const price = Math.floor(3000 + ((i + hash) * 750) % 15000);
    const image_url = images[(i + hash) % images.length];
    
    products.push(`('${name}', '${slug}', ${price}, '${cat}', '${image_url}')`);
    counter++;
  }
});

sql += products.join(',\n') + ';';

fs.writeFileSync('supabase_seed.sql', sql);
console.log('Generated supabase_seed.sql');
