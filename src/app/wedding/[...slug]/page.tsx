import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import WeddingCategoryClient from '@/components/pages/WeddingCategoryClient';
import { getCategories, getProducts } from '@/lib/serverData';

// Pre-render known "Wedding" subcategory pages — derived from Firestore at
// build time. New subcategories added later still render fine via the
// default dynamic fallback (dynamicParams defaults to true).
export async function generateStaticParams() {
  const categories = await getCategories();
  const wedding = categories.find((c) => c.slug === 'wedding');
  return (wedding?.subcategories ?? []).map((sub) => ({ slug: [sub.slug] }));
}

export default async function WeddingCategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
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
        <WeddingCategoryClient slug={slug} initialProducts={products} />
      </main>
      <Footer />
    </div>
  );
}
