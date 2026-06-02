import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import MobileNav from '@/components/layout/MobileNav';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </SmoothScroll>
  );
}
