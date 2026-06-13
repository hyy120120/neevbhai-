import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export interface Subcategory {
  name: string;
  slug: string;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

// Fetch all categories from Firestore
export async function fetchCategoriesFromFirestore(): Promise<Category[]> {
  try {
    const snap = await getDocs(collection(db, 'categories'));
    if (snap.empty) {
      console.warn('No categories found in Firestore');
      return [];
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
  } catch (error) {
    console.error('Error fetching categories from Firestore:', error);
    return [];
  }
}

// Convert categories to navigation structure for Header
export function categoriesToNavigation(categories: Category[]) {
  const columns = [];

  const germanSilver = categories.find((c) => c.slug === 'german-silver');
  const festive = categories.find((c) => c.slug === 'festive');
  const imported = categories.find((c) => c.slug === 'imported');
  const others = categories.filter(
    (c) => c.slug !== 'german-silver' && c.slug !== 'festive' && c.slug !== 'imported'
  );

  if (germanSilver) {
    columns.push({
      heading: 'GERMAN SILVER',
      href: '/shop/german-silver',
      items: germanSilver.subcategories.map((sub) => ({
        label: sub.name,
        href: `/shop/german-silver/${sub.slug}`,
      })),
    });
  }

  if (festive) {
    columns.push({
      heading: 'FESTIVE GIFTS',
      href: '/shop/festive',
      items: festive.subcategories.map((sub) => ({
        label: sub.name,
        href: `/shop/festive/${sub.slug}`,
      })),
    });
  }

  if (imported) {
    columns.push({
      heading: 'IMPORTED',
      href: '/shop/imported',
      items: imported.subcategories.map((sub) => ({
        label: sub.name,
        href: `/shop/imported/${sub.slug}`,
      })),
    });
  }

  if (others.length > 0) {
    columns.push({
      heading: 'MORE',
      href: '/shop/more',
      items: others.map((cat) => ({
        label: cat.name,
        href: `/shop/${cat.slug}`,
      })),
    });
  }

  return columns;
}

// Default categories for fallback (used if Firestore is empty)
export const DEFAULT_CATEGORIES: Category[] = [
  {
    name: 'German Silver',
    slug: 'german-silver',
    subcategories: [
      { name: "Urli's", slug: 'urlis' },
      { name: "Chowki's", slug: 'chowkis' },
      { name: 'Dry Fruit Boxes & Jars', slug: 'dry-fruit-boxes' },
      { name: 'Traditional Showpieces', slug: 'traditional-showpieces' },
      { name: 'Photoframes & Mirrors', slug: 'photoframes-mirrors' },
      { name: 'Pooja Items', slug: 'pooja-items' },
      { name: 'Candles & Candle Holders', slug: 'candles' },
      { name: 'Gifting', slug: 'gifting' },
    ],
  },
  {
    name: 'Festive Gifts',
    slug: 'festive',
    subcategories: [
      { name: 'Diwali', slug: 'diwali' },
      { name: 'Holi', slug: 'holi' },
      { name: 'Ganesh Chaturthi', slug: 'ganesh-chaturthi' },
      { name: 'Janmashtami', slug: 'janmashtami' },
    ],
  },
  { name: 'Corporate Gifts', slug: 'corporate-gifts', subcategories: [] },
  { name: 'Baby Announcement', slug: 'baby-announcement', subcategories: [] },
  {
    name: '999 Silver',
    slug: 'silver',
    subcategories: [
      { name: 'Chowki', slug: 'chowki' },
      { name: 'Clock', slug: 'clock' },
      { name: 'Flower Vase & Candle Stand', slug: 'flower-vase' },
      { name: 'Frame Idols', slug: 'frame-idols' },
      { name: 'God Idols', slug: 'god-idols' },
      { name: 'Photoframe', slug: 'photoframe' },
      { name: 'Traditional Showpiece', slug: 'traditional-showpiece' },
      { name: 'Others', slug: 'others' },
    ],
  },
  {
    name: 'Wedding',
    slug: 'wedding',
    subcategories: [
      { name: 'Wedding Return Favours', slug: 'return-favours' },
      { name: 'Wedding Gifting', slug: 'gifting' },
      { name: 'Rituals', slug: 'rituals' },
    ],
  },
  { name: 'Premium Gifts', slug: 'premium', subcategories: [] },
  { name: 'Budget Friendly', slug: 'budget', subcategories: [] },
  { name: 'Brass / Copper', slug: 'brass-copper', subcategories: [] },
];
