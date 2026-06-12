// seed-categories.mjs
//
// Ye script aapke Firestore "categories" collection me saari default
// categories aur subcategories ek baar me daal deta hai.
//
// USAGE:
//   1. Apne project ke root folder me ye file rakho (jahan package.json hai)
//   2. Apni .env.local file me Firebase keys already honi chahiye
//   3. Terminal me run karo:
//        node seed-categories.mjs
//
// Note: Agar koi category already Firestore me hai (slug match), to wo
// SKIP ho jaayegi (duplicate nahi banegi). Sirf missing categories add hongi.

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { readFileSync } from 'fs';

// ── .env.local manually parse karo (bina extra package ke) ──
function loadEnv() {
  const env = {};
  try {
    const content = readFileSync('.env.local', 'utf8');
    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const idx = trimmed.indexOf('=');
      if (idx === -1) return;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim();
      env[key] = value;
    });
  } catch (e) {
    console.error('❌ .env.local file nahi mili. Project root me run karo.');
    process.exit(1);
  }
  return env;
}

const env = loadEnv();

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  console.error('❌ Firebase config .env.local me nahi mil rahi. Check karo NEXT_PUBLIC_FIREBASE_* keys.');
  process.exit(1);
}

console.log('🔥 Connecting to Firebase project:', firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ── Default categories + subcategories (aapke code se exactly same) ──
const DEFAULT_CATEGORIES = [
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

async function main() {
  const snap = await getDocs(collection(db, 'categories'));
  const existingSlugs = new Set(snap.docs.map((d) => d.data().slug));

  console.log(`\n📦 Firestore me abhi ${snap.size} categories hain:`,
    [...existingSlugs].join(', ') || '(none)');

  let added = 0;
  for (const cat of DEFAULT_CATEGORIES) {
    if (existingSlugs.has(cat.slug)) {
      console.log(`⏭️  Skip: "${cat.name}" (already exists)`);
      continue;
    }
    await addDoc(collection(db, 'categories'), {
      name: cat.name,
      slug: cat.slug,
      subcategories: cat.subcategories,
    });
    console.log(`✅ Added: "${cat.name}" (${cat.subcategories.length} subcategories)`);
    added++;
  }

  console.log(`\n🎉 Done! ${added} new categories added to Firestore.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
