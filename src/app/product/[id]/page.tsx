import { MOCK_PRODUCTS } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import ProductDetailClient from '@/components/pages/ProductDetailClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ id: p._id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p._id === params.id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.itemName} — Neev Gifting`,
    description: product.itemDescription,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p._id === params.id);
  if (!product) notFound();

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
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </div>
  );
}
