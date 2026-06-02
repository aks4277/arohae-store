import CollectionLayout from "@/components/layout/CollectionLayout";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function Page() {
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', '%Sale%')
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
      title="Archive Sale"
      description="Last chance to own pieces from past seasons at exceptional prices."
      heroImage="/images/story/story_hero_1780259912224.png"
      products={products}
    />
  );
}