import EditorialLayout from "@/components/layout/EditorialLayout";

export default function Page() {
  const sidebarLinks = [
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

  return (
    <EditorialLayout title="Terms of Service" sidebarLinks={sidebarLinks}>
      
      <section>
        <h2 className="text-2xl font-serif text-stone-900 mb-4">1. General Overview</h2>
        <p className="mb-6">This website is operated by Arohae. Throughout the site, the terms “we”, “us” and “our” refer to Arohae. Arohae offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">2. Products & Services</h2>
        <p className="mb-4">Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>
        <p className="mb-6">We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">3. Modifications to the Service and Prices</h2>
        <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
      </section>
    
    </EditorialLayout>
  );
}