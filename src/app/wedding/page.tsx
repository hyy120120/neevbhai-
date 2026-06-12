import HeaderWrapper from '@/components/HeaderWrapper';
import { getCategories, getProducts } from '@/lib/serverData';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import WeddingClient from '@/components/pages/WeddingClient';

export const metadata = {
  title: 'Wedding — Neev Gifting',
  description: 'Elegant silver gifting for weddings — return favours, gifting & rituals.',
};

export default async function WeddingPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const weddingCategory = categories.find((c) => c.slug === 'wedding');
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-[#0f2d1e] text-white py-2.5 px-4 text-center flex flex-col sm:flex-row items-center justify-center gap-3 z-50 relative">
        <span className="text-xs tracking-wide text-white/80 font-paragraph">
          ✨ No order is too big — place your <strong>bulk orders</strong> with us
        </span>
        <a href="/contact" className="bg-[#d4af37] text-[#0a1f13] px-4 py-1 text-[10px] uppercase tracking-widest font-bold hover:bg-[#c9a12b] transition-colors whitespace-nowrap">
          Click Here
        </a>
      </div>
      <HeaderWrapper />
      <Cart />
      <main className="flex-grow">
        <WeddingClient initialProducts={products} weddingCategory={weddingCategory} />
      </main>
      <Footer />
    </div>
  );
}
