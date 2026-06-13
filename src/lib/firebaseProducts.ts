import { db } from './firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export interface FirebaseProduct {
  _id: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemImage: string;
  itemImages?: string[];
  category: string;
  subcategory?: string;
  isBestseller: boolean;
}

export async function fetchProductsFromFirestore(): Promise<FirebaseProduct[]> {
  try {
    const q = query(collection(db, 'products'), orderBy('itemName'));
    const snap = await getDocs(q);
    if (snap.empty) return [];
    return snap.docs.map((d) => ({
      _id: d.id,
      ...d.data(),
    } as FirebaseProduct));
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return [];
  }
}

