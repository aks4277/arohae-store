import EditorialLayout from "@/components/layout/EditorialLayout";

export default function Page() {
  const sidebarLinks = [
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

  return (
    <EditorialLayout title="Privacy Policy" sidebarLinks={sidebarLinks}>
      
      <section>
        <h2 className="text-2xl font-serif text-stone-900 mb-4">1. Introduction</h2>
        <p className="mb-6">At Arohae, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">2. The Data We Collect</h2>
        <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
          <li><strong>Financial Data</strong> includes payment card details (processed securely via our partners).</li>
        </ul>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">3. How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to process your orders, manage your account, and provide you with a highly personalized shopping experience.</p>
      </section>
    
    </EditorialLayout>
  );
}