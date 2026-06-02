const fs = require('fs');

const collections = {
  women: {
    title: "Women's Collection",
    description: "Discover our latest silhouettes designed for the modern woman. Effortless drape, uncompromising quality.",
    heroImage: "/images/story/story_community_1780259939780.png",
    products: `[
      { id: "1", name: "The Ivory Silk Saree", price: "$495", category: "Ethnic", image: "/images/products/saree_1780252875954.png" },
      { id: "2", name: "Midnight Linen Tunic", price: "$225", category: "Clothing", image: "/images/products/tunic_2_1780252716722.png" },
      { id: "3", name: "Blush Georgette Suit", price: "$350", category: "Ethnic", image: "/images/products/tunic_3_1780252733370.png" },
      { id: "4", name: "Classic Pleated Skirt", price: "$180", category: "Clothing", image: "/images/products/skirt_1780252899435.png" },
      { id: "5", name: "The Essential Blazer", price: "$320", category: "Clothing", image: "/images/products/tunic_2_1780252716722.png" },
      { id: "6", name: "Emerald Evening Saree", price: "$550", category: "Ethnic", image: "/images/products/saree_1780252875954.png" },
      { id: "7", name: "Linen Wide-Leg Trouser", price: "$195", category: "Clothing", image: "/images/products/tunic_3_1780252733370.png" },
      { id: "8", name: "Silk Chiffon Dupatta", price: "$120", category: "Accessories", image: "/images/products/skirt_1780252899435.png" },
    ]`
  },
  accessories: {
    title: "Accessories",
    description: "The perfect finishing touches. Handcrafted pieces that elevate your everyday ensemble.",
    heroImage: "/images/story/story_hero_1780259912224.png",
    products: `[
      { id: "101", name: "The Signature Leather Tote", price: "$450", category: "Bags", image: "/images/products/tote_1780252769115.png" },
      { id: "102", name: "Gold Hammered Hoops", price: "$125", category: "Jewellery", image: "/images/products/tote_1780252769115.png" },
      { id: "103", name: "Woven Silk Scarf", price: "$95", category: "Scarves", image: "/images/products/tote_1780252769115.png" },
      { id: "104", name: "Suede Ankle Boots", price: "$380", category: "Shoes", image: "/images/products/tote_1780252769115.png" }
    ]`
  },
  sale: {
    title: "Archive Sale",
    description: "Last chance to own pieces from past seasons at exceptional prices.",
    heroImage: "/images/story/story_hero_1780259912224.png",
    products: `[
      { id: "201", name: "Oversized Cotton Shirt", price: "$95", category: "Clothing", image: "/images/products/tunic_2_1780252716722.png" },
      { id: "202", name: "Printed Silk Tunic", price: "$150", category: "Clothing", image: "/images/products/tunic_3_1780252733370.png" },
      { id: "203", name: "Velvet Clutch", price: "$120", category: "Bags", image: "/images/products/tote_1780252769115.png" }
    ]`
  }
};

Object.keys(collections).forEach(key => {
  const data = collections[key];
  const fileContent = 'import CollectionLayout from "@/components/layout/CollectionLayout";\n\n' +
    'export default function Page() {\n' +
    '  const products = ' + data.products + ';\n\n' +
    '  return (\n' +
    '    <CollectionLayout \n' +
    '      title="' + data.title + '"\n' +
    '      description="' + data.description + '"\n' +
    '      heroImage="' + data.heroImage + '"\n' +
    '      products={products}\n' +
    '    />\n' +
    '  );\n' +
    '}';

  fs.writeFileSync('src/app/(customer)/' + key + '/page.tsx', fileContent);
  console.log('Updated ' + key);
});
