import CollectionLayout from "@/components/layout/CollectionLayout";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function Page() {
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', '%Accessories%')
    .limit(8);

  const products = (dbProducts || []).map(p => ({
    id: p.slug,
    name: p.name,
    price: `₹${p.price.toLocaleString('en-IN')}`,
    category: p.category,
    image: p.image_url
  }));

  return (
    <CollectionLayout 
      title="Accessories"
      description="The perfect finishing touches. Handcrafted pieces that elevate your everyday ensemble."
      heroImage="/images/story/story_hero_1780259912224.png"
      products={products}
    />
  );
}