import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import {
  fetchCategoriesFromFirestore,
  DEFAULT_CATEGORIES,
  type Category,
} from './categories';
import { fetchProductsFromFirestore, type FirebaseProduct } from './firebaseProducts';
import { buildNavData, type NavItem } from './navData';

const CACHE_REVALIDATE = 60;

const loadCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const categories = await fetchCategoriesFromFirestore();
    return categories.length > 0 ? categories : DEFAULT_CATEGORIES;
  },
  ['firebase-categories'],
  { revalidate: CACHE_REVALIDATE }
);

const loadProducts = unstable_cache(
  async (): Promise<FirebaseProduct[]> => fetchProductsFromFirestore(),
  ['firebase-products'],
  { revalidate: CACHE_REVALIDATE }
);

export const getCategories = cache(loadCategories);
export const getProducts = cache(loadProducts);

export const getNavData = cache(async (): Promise<NavItem[]> => {
  const categories = await getCategories();
  return buildNavData(categories);
});
