import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import ProductDetailClient from '@/components/pages/ProductDetailClient';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { FirebaseProduct } from '@/lib/firebaseProducts';

// Dynamic route — product data comes from Firestore at request time.
export const dynamic = 'force-dynamic';

async function getProduct(id: string): Promise<FirebaseProduct | null> {
  try {
    const ref = doc(db, 'products', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { _id: snap.id, ...snap.data() } as FirebaseProduct;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
async function getRelatedProducts(category: string, subcategory: string, currentId: string): Promise<FirebaseProduct[]> {
  try {
    const results: FirebaseProduct[] = [];

    // Pehle same subcategory ke products
    if (subcategory) {
      const subQuery = query(
        collection(db, 'products'),
        where('category', '==', category),
        where('subcategory', '==', subcategory),
        limit(6)
      );
      const subSnap = await getDocs(subQuery);
      subSnap.docs.forEach((d) => {
        if (d.id !== currentId) results.push({ _id: d.id, ...d.data() } as FirebaseProduct);
      });
    }

    // Phir same category ke products (jo already nahi aaye)
    if (results.length < 5) {
      const catQuery = query(
        collection(db, 'products'),
        where('category', '==', category),
        limit(10)
      );
      const catSnap = await getDocs(catQuery);
      catSnap.docs.forEach((d) => {
        if (d.id !== currentId && !results.find((r) => r._id === d.id)) {
          results.push({ _id: d.id, ...d.data() } as FirebaseProduct);
        }
      });
    }

    return results.slice(0, 8);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.itemName} — Neev Gifting`,
    description: product.itemDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  const relatedProducts = await getRelatedProducts(
    product!.category,
    product!.subcategory || '',
    id
  );

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
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </div>
  );
}
