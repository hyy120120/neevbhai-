import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import SilverCategoryClient from '@/components/pages/SilverCategoryClient';

export function generateStaticParams() {
  return [
    { slug: ['chowki'] },
    { slug: ['clock'] },
    { slug: ['flower-vase'] },
    { slug: ['frame-idols'] },
    { slug: ['god-idols'] },
    { slug: ['photoframe'] },
    { slug: ['traditional-showpiece'] },
    { slug: ['others'] },
  ];
}

export default function SilverCategoryPage({ params }: { params: { slug: string[] } }) {
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
        <SilverCategoryClient slug={params.slug} />
      </main>
      <Footer />
    </div>
  );
}
