import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import ShopCategoryClient from '@/components/pages/ShopCategoryClient';

// All known shop category slugs — pre-rendered at build time.
export function generateStaticParams() {
  const slugs = [
    ['german-silver'],
    ['german-silver', 'urlis'],
    ['german-silver', 'chowkis'],
    ['german-silver', 'dry-fruit-boxes'],
    ['german-silver', 'traditional-showpieces'],
    ['german-silver', 'photoframes-mirrors'],
    ['german-silver', 'pooja-items'],
    ['german-silver', 'candles'],
    ['german-silver', 'gifting'],
    ['festive'],
    ['festive', 'diwali'],
    ['festive', 'holi'],
    ['festive', 'ganesh-chaturthi'],
    ['festive', 'janmashtami'],
    ['corporate-gifts'],
    ['baby-announcement'],
    ['premium'],
    ['budget'],
    ['brass-copper'],
    ['price', '150'],
    ['price', '500'],
    ['price', '1000'],
    ['price', '1500'],
    ['price', 'above-1500'],
  ];
  return slugs.map((slug) => ({ slug }));
}

export default async function ShopCategoryPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  
  if (!slug || slug.length === 0) {
    return null; // or redirect to /shop
  }
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
        <ShopCategoryClient slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
