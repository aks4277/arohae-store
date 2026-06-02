import EditorialLayout from "@/components/layout/EditorialLayout";

export default function Page() {
  const sidebarLinks = [
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

  return (
    <EditorialLayout title="Returns & Exchanges" sidebarLinks={sidebarLinks}>
      
      <section>
        <h2 className="text-2xl font-serif text-stone-900 mb-4">Our Policy</h2>
        <p className="mb-6">We want you to be completely satisfied with your Arohae purchase. If for any reason you are not, we gladly accept returns of unworn, unwashed, undamaged or defective merchandise purchased online for a full refund or exchange within 14 days of original delivery.</p>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">How to Initiate a Return</h2>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li>Ensure the item is in its original condition with all tags attached.</li>
          <li>Visit our online Returns Portal and enter your order number.</li>
          <li>Select the item(s) you wish to return and print your prepaid shipping label.</li>
          <li>Pack the item(s) securely and attach the label to the outside of the package.</li>
          <li>Drop off the package at any authorized carrier location.</li>
        </ol>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">Refund Processing</h2>
        <p>Refunds will be processed to the original method of payment within 5-7 business days of our warehouse receiving your return. Original shipping charges are non-refundable.</p>
      </section>
    
    </EditorialLayout>
  );
}