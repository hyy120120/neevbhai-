import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import ShopCategoryClient from '@/components/pages/ShopCategoryClient';
import { getCategories, getProducts } from '@/lib/serverData';

const PRICE_SLUGS = [
  ['price', '150'],
  ['price', '500'],
  ['price', '1000'],
  ['price', '1500'],
  ['price', 'above-1500'],
];

// All shop category/subcategory slugs — derived from Firestore at build
// time. New categories/subcategories added later via the admin panel still
// render fine via the default dynamic fallback (dynamicParams defaults to true).
export async function generateStaticParams() {
  const categories = await getCategories();
  const slugs: string[][] = [...PRICE_SLUGS];

  for (const cat of categories) {
    slugs.push([cat.slug]);
    for (const sub of cat.subcategories) {
      slugs.push([cat.slug, sub.slug]);
    }
  }

  return slugs.map((slug) => ({ slug }));
}

export default async function ShopCategoryPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  
  if (!slug || slug.length === 0) {
    return null; // or redirect to /shop
  }

  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

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
        <ShopCategoryClient slug={slug} initialCategories={categories} initialProducts={products} />
      </main>
      <Footer />
    </div>
  );
}
