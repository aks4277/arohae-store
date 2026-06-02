import CollectionLayout from "@/components/layout/CollectionLayout";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every minute

export default async function Page() {
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', '%Women%')
    .limit(8);

  const products = (dbProducts || []).map(p => ({
    id: p.slug, // using slug as ID for linking in the cart/UI
    name: p.name,
    price: `₹${p.price.toLocaleString('en-IN')}`,
    category: p.category,
    image: p.image_url
  }));

  return (
    <CollectionLayout 
      title="Women's Collection"
      description="Discover our latest silhouettes designed for the modern woman. Effortless drape, uncompromising quality."
      heroImage="/images/story/story_community_1780259939780.png"
      products={products}
    />
  );
}