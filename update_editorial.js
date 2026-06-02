const fs = require('fs');

const sidebarLinks = `[
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
]`;

const pages = {
  privacy: {
    title: "Privacy Policy",
    content: `
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
    `
  },
  terms: {
    title: "Terms of Service",
    content: `
      <section>
        <h2 className="text-2xl font-serif text-stone-900 mb-4">1. General Overview</h2>
        <p className="mb-6">This website is operated by Arohae. Throughout the site, the terms “we”, “us” and “our” refer to Arohae. Arohae offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">2. Products & Services</h2>
        <p className="mb-4">Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>
        <p className="mb-6">We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">3. Modifications to the Service and Prices</h2>
        <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
      </section>
    `
  },
  shipping: {
    title: "Shipping & Delivery",
    content: `
      <section>
        <h2 className="text-2xl font-serif text-stone-900 mb-4">Domestic Shipping</h2>
        <p className="mb-4">We offer complimentary standard shipping on all domestic orders over $250. For orders under $250, a flat rate of $15 applies.</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Standard Shipping:</strong> 3-5 business days</li>
          <li><strong>Express Shipping:</strong> 1-2 business days ($25)</li>
        </ul>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">International Shipping</h2>
        <p className="mb-6">Arohae proudly ships worldwide. International shipping rates are calculated at checkout based on the destination and the weight of your package. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.</p>
        
        <h2 className="text-2xl font-serif text-stone-900 mb-4 mt-12">Order Tracking</h2>
        <p>Once your order has been dispatched, you will receive a confirmation email containing your tracking number. You can use this number on our Track Order page or directly on the carrier's website to monitor your shipment's progress.</p>
      </section>
    `
  },
  returns: {
    title: "Returns & Exchanges",
    content: `
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
    `
  }
};

Object.keys(pages).forEach(key => {
  const data = pages[key];
  const fileContent = 'import EditorialLayout from "@/components/layout/EditorialLayout";\n\n' +
    'export default function Page() {\n' +
    '  const sidebarLinks = ' + sidebarLinks + ';\n\n' +
    '  return (\n' +
    '    <EditorialLayout title="' + data.title + '" sidebarLinks={sidebarLinks}>\n' +
    '      ' + data.content + '\n' +
    '    </EditorialLayout>\n' +
    '  );\n' +
    '}';

  fs.writeFileSync('src/app/(customer)/' + key + '/page.tsx', fileContent);
  console.log('Updated ' + key);
});
