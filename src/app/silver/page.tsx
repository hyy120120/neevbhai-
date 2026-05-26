import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import SilverClient from '@/components/pages/SilverClient';

export const metadata = {
  title: '999 Silver — Neev Gifting',
  description: 'Shop our pure 999 silver collection — idols, clocks, frames and more.',
};

export default function SilverPage() {
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
      <Header />
      <Cart />
      <main className="flex-grow">
        <SilverClient />
      </main>
      <Footer />
    </div>
  );
}
