import EditorialLayout from "@/components/layout/EditorialLayout";

export default function Page() {
  const sidebarLinks = [
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

  return (
    <EditorialLayout title="Shipping & Delivery" sidebarLinks={sidebarLinks}>
      
      <section>
        <h2 className="text-2xl font-serif text-stone-900 mb-4">Domestic Shipping</h2>
        <p className="mb-4">We offer complementary standard shipping on all orders above 2000 and below 2000 a flat fee of Rs 50.</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Standard Shipping:</strong> 3-5 business days</li>
          <li><strong>Express Shipping:</strong> 1-2 business days (Rs 150)</li>
        </ul>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">International Shipping</h2>
        <p className="mb-6">Pls talk to our Customer Service Manager</p>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">Order Tracking</h2>
        <p>Once your order has been dispatched, you will receive a confirmation email containing your tracking number. You can use this number on our Track Order page or directly on the carrier's website to monitor your shipment's progress.</p>
      </section>
    
    </EditorialLayout>
  );
}