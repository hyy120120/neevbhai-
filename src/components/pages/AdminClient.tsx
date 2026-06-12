'use client';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect, useRef } from 'react';
import { db, storage } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  Check,
  LogOut,
  ChevronDown,
  ChevronUp,
  Package,
  Tag,
  Menu,
  MoveUp,
  MoveDown,
} from 'lucide-react';
import { DEFAULT_CATEGORIES, Category as CategoryType } from '@/lib/categories';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  id?: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

interface NavItem {
  id?: string;
  label: string;
  href: string;
  order: number;
  children: { label: string; href: string }[];
}

interface Product {
  id?: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemImage: string;
  category: string;
  subcategory: string;
  isBestseller: boolean;
  stock: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'Saurabh@123';

const DEFAULT_NAV: NavItem[] = [
  { label: 'HOME', href: '/', order: 0, children: [] },
  {
    label: 'SHOP',
    href: '/shop',
    order: 1,
    children: [
      { label: 'German Silver', href: '/shop/german-silver' },
      { label: 'Festive Gifts', href: '/shop/festive' },
      { label: 'Corporate Gifts', href: '/shop/corporate-gifts' },
      { label: 'Baby Announcement', href: '/shop/baby-announcement' },
      { label: 'Premium Gifts', href: '/shop/premium' },
      { label: 'Budget Friendly', href: '/shop/budget' },
      { label: "Bestseller's", href: '/bestsellers' },
      { label: 'Pure Brass / Copper Gifts', href: '/shop/brass-copper' },
    ],
  },
  {
    label: 'SHOP BY PRICE',
    href: '/shop/by-price',
    order: 2,
    children: [
      { label: 'Upto ₹150', href: '/shop/price/150' },
      { label: 'Upto ₹500', href: '/shop/price/500' },
      { label: 'Upto ₹1000', href: '/shop/price/1000' },
      { label: 'Upto ₹1500', href: '/shop/price/1500' },
      { label: '₹1500 & Above', href: '/shop/price/above-1500' },
    ],
  },
  {
    label: '999 SILVER',
    href: '/silver',
    order: 3,
    children: [
      { label: 'Chowki', href: '/silver/chowki' },
      { label: 'Clock', href: '/silver/clock' },
      { label: 'Flower Vase & Candle Stand', href: '/silver/flower-vase' },
      { label: 'Frame Idols', href: '/silver/frame-idols' },
      { label: 'God Idols', href: '/silver/god-idols' },
      { label: 'Photoframe', href: '/silver/photoframe' },
      { label: 'Traditional Showpiece', href: '/silver/traditional-showpiece' },
      { label: 'Others', href: '/silver/others' },
    ],
  },
  {
    label: 'WEDDING',
    href: '/wedding',
    order: 4,
    children: [
      { label: 'Wedding Return Favours', href: '/wedding/return-favours' },
      { label: 'Wedding Gifting', href: '/wedding/gifting' },
      { label: 'Rituals', href: '/wedding/rituals' },
    ],
  },
  { label: 'CONTACT US', href: '/contact', order: 5, children: [] },
];

const emptyProduct: Product = {
  itemName: '',
  itemDescription: '',
  itemPrice: 0,
  itemImage: '',
  category: '',
  subcategory: '',
  isBestseller: false,
  stock: 0,
};

type Tab = 'products' | 'categories' | 'navigation';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminClient() {
  // Auth
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongPass, setWrongPass] = useState(false);

  // Tab
  const [tab, setTab] = useState<Tab>('products');

  // Products
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [deleteProductConfirm, setDeleteProductConfirm] = useState<string | null>(null);

  // Categories
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [newCatName, setNewCatName] = useState('');
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [newSubName, setNewSubName] = useState<Record<string, string>>({});
  const [deleteCatConfirm, setDeleteCatConfirm] = useState<string | null>(null);

  // Navigation
  const [navItems, setNavItems] = useState<NavItem[]>(DEFAULT_NAV);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [newNavLabel, setNewNavLabel] = useState('');
  const [newNavHref, setNewNavHref] = useState('');
  const [newChildLabel, setNewChildLabel] = useState<Record<string, string>>({});
  const [newChildHref, setNewChildHref] = useState<Record<string, string>>({});
  const [deleteNavConfirm, setDeleteNavConfirm] = useState<string | null>(null);
  const [navSaving, setNavSaving] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  // ── Login ──
  const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    setAuthed(true);
    setWrongPass(false);

    console.log('Firebase User:', auth.currentUser);
  } catch (error) {
    console.error(error);
    setWrongPass(true);
  }
};

  // ── Fetch on auth ──
  useEffect(() => {
    if (!authed) return;
    fetchProducts();
    fetchCategories();
    fetchNavigation();
  }, [authed]);

  // ── Products ──
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const q = query(collection(db, 'products'), orderBy('itemName'));
      const snap = await getDocs(q);
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product)));
    } catch (e) {
      console.error('Fetch products error:', e);
    }
    setLoadingProducts(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return form.itemImage;
    setUploading(true);
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);
      setUploading(false);
      return url;
    } catch (e) {
      console.error('Upload error:', e);
      setUploading(false);
      return form.itemImage;
    }
  };

  const handleSaveProduct = async () => {
    if (!form.itemName || !form.itemPrice) return;
    setSaving(true);
    try {
      const imageUrl = await uploadImage();
      const data = { ...form, itemImage: imageUrl };
      if (editProduct?.id) {
        await updateDoc(doc(db, 'products', editProduct.id), data);
      } else {
        await addDoc(collection(db, 'products'), data);
      }
      await fetchProducts();
      closeForm();
    } catch (e) {
      console.error('Save product error:', e);
    }
    setSaving(false);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteProductConfirm(null);
    } catch (e) {
      console.error('Delete product error:', e);
    }
  };

  const openAdd = () => {
    setEditProduct(null);
    setForm(emptyProduct);
    setImageFile(null);
    setImagePreview('');
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm(p);
    setImagePreview(p.itemImage);
    setImageFile(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditProduct(null);
    setForm(emptyProduct);
    setImageFile(null);
    setImagePreview('');
  };

  // ── Categories ──
  const fetchCategories = async () => {
    try {
      const snap = await getDocs(collection(db, 'categories'));
      if (!snap.empty) {
        setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category)));
      } else {
        // Firestore is empty — seed it with the default categories so they
        // persist and don't disappear after the first custom category is added.
        const seeded: Category[] = [];
        for (const cat of DEFAULT_CATEGORIES) {
          const ref = await addDoc(collection(db, 'categories'), {
            name: cat.name,
            slug: cat.slug,
            subcategories: cat.subcategories,
          });
          seeded.push({ ...cat, id: ref.id });
        }
        setCategories(seeded);
      }
    } catch (e) {
      console.error('Fetch categories error:', e);
    }
  };

  const addCategory = async () => {
    if (!newCatName.trim()) return;
    const slug = toSlug(newCatName);
    const newCat: Category = { name: newCatName.trim(), slug, subcategories: [] };
    setNewCatName('');
    try {
      const ref = await addDoc(collection(db, 'categories'), newCat);
      setCategories((prev) => [...prev, { ...newCat, id: ref.id }]);
    } catch (e) {
      console.error('Add category error:', e);
    }
  };

  const deleteCategory = async (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    setCategories((prev) => prev.filter((c) => c.slug !== slug));
    setDeleteCatConfirm(null);
    try {
      if (cat?.id) {
        await deleteDoc(doc(db, 'categories', cat.id));
      } else {
        const snap = await getDocs(collection(db, 'categories'));
        const found = snap.docs.find((d) => d.data().slug === slug);
        if (found) await deleteDoc(doc(db, 'categories', found.id));
      }
    } catch (e) {
      console.error('Delete category error:', e);
    }
  };

  const addSubcategory = async (catSlug: string) => {
    const name = newSubName[catSlug]?.trim();
    if (!name) return;
    const slug = toSlug(name);
    const cat = categories.find((c) => c.slug === catSlug);
    const newSubs = [...(cat?.subcategories ?? []), { name, slug }];
    setCategories((prev) =>
      prev.map((c) => (c.slug === catSlug ? { ...c, subcategories: newSubs } : c))
    );
    setNewSubName((prev) => ({ ...prev, [catSlug]: '' }));
    try {
      if (cat?.id) {
        await updateDoc(doc(db, 'categories', cat.id), { subcategories: newSubs });
      } else {
        const snap = await getDocs(collection(db, 'categories'));
        const found = snap.docs.find((d) => d.data().slug === catSlug);
        if (found) await updateDoc(doc(db, 'categories', found.id), { subcategories: newSubs });
      }
    } catch (e) {
      console.error('Add subcategory error:', e);
    }
  };

  const deleteSubcategory = async (catSlug: string, subSlug: string) => {
    const cat = categories.find((c) => c.slug === catSlug);
    const newSubs = (cat?.subcategories ?? []).filter((s) => s.slug !== subSlug);
    setCategories((prev) =>
      prev.map((c) => (c.slug === catSlug ? { ...c, subcategories: newSubs } : c))
    );
    try {
      if (cat?.id) {
        await updateDoc(doc(db, 'categories', cat.id), { subcategories: newSubs });
      } else {
        const snap = await getDocs(collection(db, 'categories'));
        const found = snap.docs.find((d) => d.data().slug === catSlug);
        if (found) await updateDoc(doc(db, 'categories', found.id), { subcategories: newSubs });
      }
    } catch (e) {
      console.error('Delete subcategory error:', e);
    }
  };

  const moveSubcategoryUp = async (catSlug: string, subIndex: number) => {
    if (subIndex === 0) return;
    const cat = categories.find((c) => c.slug === catSlug);
    if (!cat) return;
    const newSubs = [...cat.subcategories];
    [newSubs[subIndex - 1], newSubs[subIndex]] = [newSubs[subIndex], newSubs[subIndex - 1]];
    setCategories((prev) =>
      prev.map((c) => (c.slug === catSlug ? { ...c, subcategories: newSubs } : c))
    );
    try {
      if (cat.id) {
        await updateDoc(doc(db, 'categories', cat.id), { subcategories: newSubs });
      } else {
        const snap = await getDocs(collection(db, 'categories'));
        const found = snap.docs.find((d) => d.data().slug === catSlug);
        if (found) await updateDoc(doc(db, 'categories', found.id), { subcategories: newSubs });
      }
    } catch (e) {
      console.error('Move subcategory error:', e);
    }
  };

  const moveSubcategoryDown = async (catSlug: string, subIndex: number, totalSubs: number) => {
    if (subIndex === totalSubs - 1) return;
    const cat = categories.find((c) => c.slug === catSlug);
    if (!cat) return;
    const newSubs = [...cat.subcategories];
    [newSubs[subIndex], newSubs[subIndex + 1]] = [newSubs[subIndex + 1], newSubs[subIndex]];
    setCategories((prev) =>
      prev.map((c) => (c.slug === catSlug ? { ...c, subcategories: newSubs } : c))
    );
    try {
      if (cat.id) {
        await updateDoc(doc(db, 'categories', cat.id), { subcategories: newSubs });
      } else {
        const snap = await getDocs(collection(db, 'categories'));
        const found = snap.docs.find((d) => d.data().slug === catSlug);
        if (found) await updateDoc(doc(db, 'categories', found.id), { subcategories: newSubs });
      }
    } catch (e) {
      console.error('Move subcategory error:', e);
    }
  };

  // ── Navigation ──
  const fetchNavigation = async () => {
    try {
      const snap = await getDocs(collection(db, 'navigation'));
      if (!snap.empty) {
        const items = snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as NavItem))
          .sort((a, b) => a.order - b.order);
        setNavItems(items);
      }
    } catch (e) {
      console.error('Fetch navigation error:', e);
    }
  };

  const saveNavigation = async () => {
    setNavSaving(true);
    try {
      // Delete existing
      const snap = await getDocs(collection(db, 'navigation'));
      await Promise.all(snap.docs.map((d) => deleteDoc(doc(db, 'navigation', d.id))));
      // Add new
      await Promise.all(
        navItems.map((item, i) =>
          addDoc(collection(db, 'navigation'), { ...item, order: i })
        )
      );
    } catch (e) {
      console.error('Save navigation error:', e);
    }
    setNavSaving(false);
  };

  const addNavItem = () => {
    if (!newNavLabel.trim() || !newNavHref.trim()) return;
    const newItem: NavItem = {
      label: newNavLabel.trim().toUpperCase(),
      href: newNavHref.trim(),
      order: navItems.length,
      children: [],
    };
    setNavItems([...navItems, newItem]);
    setNewNavLabel('');
    setNewNavHref('');
  };

  const deleteNavItem = (href: string) => {
    setNavItems(navItems.filter((n) => n.href !== href));
    setDeleteNavConfirm(null);
  };

  const addNavChild = (navHref: string) => {
    const label = newChildLabel[navHref]?.trim();
    const href = newChildHref[navHref]?.trim();
    if (!label || !href) return;
    setNavItems(navItems.map((n) =>
      n.href === navHref
        ? { ...n, children: [...n.children, { label, href }] }
        : n
    ));
    setNewChildLabel((prev) => ({ ...prev, [navHref]: '' }));
    setNewChildHref((prev) => ({ ...prev, [navHref]: '' }));
  };

  const deleteNavChild = (navHref: string, childHref: string) => {
    setNavItems(navItems.map((n) =>
      n.href === navHref
        ? { ...n, children: n.children.filter((c) => c.href !== childHref) }
        : n
    ));
  };

  // ── Filtered products ──
  const filtered = products.filter((p) => {
    const matchSearch = p.itemName.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const selectedCatSubs =
    categories.find((c) => c.name === form.category)?.subcategories ?? [];

  // ─── Login Screen ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f5f3ee] flex items-center justify-center px-4">
        <div className="bg-white border border-[#e5e0d5] p-10 w-full max-w-sm text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#1a6b44] flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-bold">N</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-1">Admin Panel</h1>
          <p className="text-xs text-muted font-paragraph mb-8">Neev Gifting</p>
          <input
           type="email"
           placeholder="Admin Email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           className="w-full border border-[#e5e0d5] px-4 py-3 text-sm font-paragraph outline-none mb-3"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className={`w-full border px-4 py-3 text-sm font-paragraph outline-none mb-3 transition-colors ${
              wrongPass ? 'border-red-400' : 'border-[#e5e0d5] focus:border-[#1a6b44]'
            }`}
          />
          {wrongPass && (
            <p className="text-red-500 text-xs font-paragraph mb-3">Incorrect password. Try again.</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-[#1a6b44] text-white text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-[#15573a] transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ─── Dashboard ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f5f3ee]">

      {/* Top Bar */}
      <div className="bg-[#0f2d1e] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-heading font-bold">Neev Gifting — Admin</h1>
          <p className="text-xs text-white/50 font-paragraph">
            {products.length} products · {categories.length} categories
          </p>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 flex">
          {(
            [
              { key: 'products', label: 'Products', Icon: Package },
              { key: 'categories', label: 'Categories', Icon: Tag },
              { key: 'navigation', label: 'Navigation', Icon: Menu },
            ] as { key: Tab; label: string; Icon: React.ElementType }[]
          ).map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-paragraph font-bold border-b-2 transition-colors ${
                tab === key
                  ? 'border-[#1a6b44] text-[#1a6b44]'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ══════════════ PRODUCTS TAB ══════════════ */}
        {tab === 'products' && (
          <>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border border-[#e5e0d5] bg-white px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44]"
              />
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="border border-[#e5e0d5] bg-white px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44]"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug}>{c.name}</option>
                ))}
              </select>
              <button
                onClick={openAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1a6b44] text-white text-sm font-paragraph font-bold hover:bg-[#15573a] transition-colors whitespace-nowrap"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>

            {/* Table */}
            {loadingProducts ? (
              <div className="text-center py-20 text-muted font-paragraph">Loading products...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted font-paragraph">
                No products found. Click "Add Product" to get started.
              </div>
            ) : (
              <div className="bg-white border border-[#e5e0d5] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-paragraph">
                    <thead>
                      <tr className="bg-[#f5f3ee] border-b border-[#e5e0d5]">
                        {['Image', 'Name', 'Category', 'Price', 'Stock', 'Bestseller', 'Actions'].map(
                          (h) => (
                            <th
                              key={h}
                              className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted font-bold"
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f5f3ee]">
                      {filtered.map((product) => (
                        <tr key={product.id} className="hover:bg-[#f9f8f6] transition-colors">
                          <td className="px-4 py-3">
                            <div className="relative w-12 h-12 bg-gray-50 overflow-hidden rounded">
                              {product.itemImage ? (
                                <Image
                                  src={product.itemImage}
                                  alt={product.itemName}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">
                                  No img
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 max-w-[200px]">
                            <p className="font-semibold text-foreground line-clamp-1">
                              {product.itemName}
                            </p>
                            <p className="text-xs text-muted line-clamp-1 mt-0.5">
                              {product.itemDescription}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-[#f0fdf4] text-[#1a6b44] px-2 py-1 font-semibold rounded">
                              {product.category}
                            </span>
                            {product.subcategory && (
                              <p className="text-[10px] text-muted mt-0.5">{product.subcategory}</p>
                            )}
                          </td>
                          <td className="px-4 py-3 font-bold text-[#1a6b44]">₹{product.itemPrice}</td>
                          <td className="px-4 py-3 text-muted">{product.stock}</td>
                          <td className="px-4 py-3">
                            {product.isBestseller ? (
                              <span className="text-xs bg-[#d4af37]/20 text-[#b8960c] px-2 py-1 font-bold rounded">
                                ★ Yes
                              </span>
                            ) : (
                              <span className="text-xs text-muted">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEdit(product)}
                                className="w-8 h-8 flex items-center justify-center border border-[#e5e0d5] hover:border-[#1a6b44] hover:text-[#1a6b44] transition-colors rounded"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                              {deleteProductConfirm === product.id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleDeleteProduct(product.id!)}
                                    className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded"
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteProductConfirm(null)}
                                    className="w-8 h-8 flex items-center justify-center border border-[#e5e0d5] rounded"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteProductConfirm(product.id!)}
                                  className="w-8 h-8 flex items-center justify-center border border-[#e5e0d5] hover:border-red-400 hover:text-red-500 transition-colors rounded"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* ══════════════ CATEGORIES TAB ══════════════ */}
        {tab === 'categories' && (
          <>
            {/* Add Category */}
            <div className="bg-white border border-[#e5e0d5] p-5 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
                Add New Category
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Category name e.g. German Silver"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                  className="flex-1 border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44]"
                />
                <button
                  onClick={addCategory}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1a6b44] text-white text-sm font-paragraph font-bold hover:bg-[#15573a] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Categories List */}
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.slug} className="bg-white border border-[#e5e0d5] overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4">
                    <button
                      onClick={() =>
                        setExpandedCat(expandedCat === cat.slug ? null : cat.slug)
                      }
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-[#d4af37] transition-transform duration-200 ${
                          expandedCat === cat.slug ? 'rotate-180' : ''
                        }`}
                      />
                      <span className="font-heading font-bold text-foreground">{cat.name}</span>
                      <span className="text-xs text-muted font-paragraph">
                        ({cat.subcategories.length} subcategories)
                      </span>
                    </button>
                    {deleteCatConfirm === cat.slug ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => deleteCategory(cat.slug)}
                          className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteCatConfirm(null)}
                          className="w-8 h-8 flex items-center justify-center border border-[#e5e0d5] rounded"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteCatConfirm(cat.slug)}
                        className="w-8 h-8 flex items-center justify-center border border-[#e5e0d5] hover:border-red-400 hover:text-red-500 transition-colors rounded"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {expandedCat === cat.slug && (
                    <div className="border-t border-[#e5e0d5] px-5 py-4 bg-[#f9f8f6]">
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          placeholder="Add subcategory..."
                          value={newSubName[cat.slug] ?? ''}
                          onChange={(e) =>
                            setNewSubName((prev) => ({ ...prev, [cat.slug]: e.target.value }))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && addSubcategory(cat.slug)}
                          className="flex-1 border border-[#e5e0d5] px-3 py-2 text-sm font-paragraph outline-none focus:border-[#1a6b44] bg-white"
                        />
                        <button
                          onClick={() => addSubcategory(cat.slug)}
                          className="px-4 py-2 bg-[#1a6b44] text-white text-xs font-paragraph font-bold hover:bg-[#15573a] transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      {cat.subcategories.length === 0 ? (
                        <p className="text-xs text-muted font-paragraph">No subcategories yet.</p>
                      ) : (
                        <div className="space-y-2">
                          {cat.subcategories.map((sub, idx) => (
                            <div
                              key={sub.slug}
                              className="flex items-center justify-between gap-2 bg-white border border-[#e5e0d5] px-3 py-2 text-sm font-paragraph rounded"
                            >
                              <span className="flex-1">{sub.name}</span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => moveSubcategoryUp(cat.slug, idx)}
                                  disabled={idx === 0}
                                  title="Move up"
                                  className="p-1 text-gray-400 hover:text-[#1a6b44] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                  <MoveUp className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => moveSubcategoryDown(cat.slug, idx, cat.subcategories.length)}
                                  disabled={idx === cat.subcategories.length - 1}
                                  title="Move down"
                                  className="p-1 text-gray-400 hover:text-[#1a6b44] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                  <MoveDown className="h-3.5 w-3.5" />
                                </button>
                                <div className="w-px h-4 bg-[#e5e0d5]" />
                                <button
                                  onClick={() => deleteSubcategory(cat.slug, sub.slug)}
                                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                  title="Delete"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════════ NAVIGATION TAB ══════════════ */}
        {tab === 'navigation' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted font-paragraph">
                Manage your website navigation bar items and dropdown links.
              </p>
              <button
                onClick={saveNavigation}
                disabled={navSaving}
                className="px-5 py-2.5 bg-[#1a6b44] text-white text-sm font-paragraph font-bold hover:bg-[#15573a] transition-colors disabled:opacity-60"
              >
                {navSaving ? 'Saving...' : 'Save Navigation'}
              </button>
            </div>

            {/* Add Nav Item */}
            <div className="bg-white border border-[#e5e0d5] p-5 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
                Add New Nav Item
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Label e.g. OFFERS"
                  value={newNavLabel}
                  onChange={(e) => setNewNavLabel(e.target.value)}
                  className="flex-1 border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44]"
                />
                <input
                  type="text"
                  placeholder="URL e.g. /offers"
                  value={newNavHref}
                  onChange={(e) => setNewNavHref(e.target.value)}
                  className="flex-1 border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44]"
                />
                <button
                  onClick={addNavItem}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1a6b44] text-white text-sm font-paragraph font-bold hover:bg-[#15573a] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Nav Items List */}
            <div className="space-y-3">
              {navItems.map((item) => (
                <div key={item.href} className="bg-white border border-[#e5e0d5] overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4">
                    <button
                      onClick={() =>
                        setExpandedNav(expandedNav === item.href ? null : item.href)
                      }
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-[#d4af37] transition-transform duration-200 ${
                          expandedNav === item.href ? 'rotate-180' : ''
                        }`}
                      />
                      <span className="font-heading font-bold text-foreground">{item.label}</span>
                      <span className="text-xs text-muted font-paragraph">{item.href}</span>
                      <span className="text-xs text-muted font-paragraph">
                        ({item.children.length} links)
                      </span>
                    </button>
                    {deleteNavConfirm === item.href ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => deleteNavItem(item.href)}
                          className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteNavConfirm(null)}
                          className="w-8 h-8 flex items-center justify-center border border-[#e5e0d5] rounded"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteNavConfirm(item.href)}
                        className="w-8 h-8 flex items-center justify-center border border-[#e5e0d5] hover:border-red-400 hover:text-red-500 transition-colors rounded"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {expandedNav === item.href && (
                    <div className="border-t border-[#e5e0d5] px-5 py-4 bg-[#f9f8f6]">
                      {/* Add child */}
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          placeholder="Link label..."
                          value={newChildLabel[item.href] ?? ''}
                          onChange={(e) =>
                            setNewChildLabel((prev) => ({ ...prev, [item.href]: e.target.value }))
                          }
                          className="flex-1 border border-[#e5e0d5] px-3 py-2 text-sm font-paragraph outline-none focus:border-[#1a6b44] bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Link URL..."
                          value={newChildHref[item.href] ?? ''}
                          onChange={(e) =>
                            setNewChildHref((prev) => ({ ...prev, [item.href]: e.target.value }))
                          }
                          className="flex-1 border border-[#e5e0d5] px-3 py-2 text-sm font-paragraph outline-none focus:border-[#1a6b44] bg-white"
                        />
                        <button
                          onClick={() => addNavChild(item.href)}
                          className="px-4 py-2 bg-[#1a6b44] text-white text-xs font-paragraph font-bold hover:bg-[#15573a] transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {item.children.length === 0 ? (
                        <p className="text-xs text-muted font-paragraph">No dropdown links yet.</p>
                      ) : (
                        <div className="space-y-2">
                          {item.children.map((child) => (
                            <div
                              key={child.href}
                              className="flex items-center justify-between bg-white border border-[#e5e0d5] px-4 py-2.5 rounded"
                            >
                              <div>
                                <span className="text-sm font-paragraph font-semibold text-foreground">
                                  {child.label}
                                </span>
                                <span className="text-xs text-muted font-paragraph ml-3">
                                  {child.href}
                                </span>
                              </div>
                              <button
                                onClick={() => deleteNavChild(item.href, child.href)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ══════════════ PRODUCT FORM MODAL ══════════════ */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e0d5] sticky top-0 bg-white z-10">
              <h2 className="text-lg font-heading font-bold text-foreground">
                {editProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={closeForm}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Product Image
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-[#e5e0d5] hover:border-[#1a6b44] transition-colors cursor-pointer p-8 text-center rounded"
                >
                  {imagePreview ? (
                    <div className="relative w-36 h-36 mx-auto rounded overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-10 w-10 text-muted mx-auto mb-3" />
                      <p className="text-sm text-muted font-paragraph">
                        Click to upload product image
                      </p>
                      <p className="text-xs text-muted/60 font-paragraph mt-1">
                        JPG, PNG, WEBP supported
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imagePreview && (
                  <button
                    onClick={() => { setImagePreview(''); setImageFile(null); }}
                    className="mt-2 text-xs text-red-500 hover:underline"
                  >
                    Remove image
                  </button>
                )}
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={form.itemName}
                  onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                  className="w-full border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44] transition-colors"
                  placeholder="e.g. Pure Silver Diya Set"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Description
                </label>
                <textarea
                  value={form.itemDescription}
                  onChange={(e) => setForm({ ...form, itemDescription: e.target.value })}
                  rows={4}
                  className="w-full border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44] transition-colors resize-none"
                  placeholder="Describe the product — material, size, occasion..."
                />
              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={form.itemPrice || ''}
                    onChange={(e) => setForm({ ...form, itemPrice: Number(e.target.value) })}
                    className="w-full border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44] transition-colors"
                    placeholder="0"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={form.stock || ''}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44] transition-colors"
                    placeholder="0"
                    min={0}
                  />
                </div>
              </div>

              {/* Category + Subcategory */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: '' })}
                    className="w-full border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44] transition-colors bg-white"
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Subcategory
                  </label>
                  <select
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    disabled={selectedCatSubs.length === 0}
                    className="w-full border border-[#e5e0d5] px-4 py-2.5 text-sm font-paragraph outline-none focus:border-[#1a6b44] transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {selectedCatSubs.length === 0 ? 'No subcategories' : 'Select subcategory'}
                    </option>
                    {selectedCatSubs.map((s) => (
                      <option key={s.slug} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bestseller */}
              <div className="flex items-center gap-3 p-4 bg-[#f9f8f6] rounded border border-[#e5e0d5]">
                <input
                  type="checkbox"
                  id="bestseller"
                  checked={form.isBestseller}
                  onChange={(e) => setForm({ ...form, isBestseller: e.target.checked })}
                  className="w-4 h-4 accent-[#1a6b44] cursor-pointer"
                />
                <div>
                  <label htmlFor="bestseller" className="text-sm font-paragraph font-semibold cursor-pointer">
                    Mark as Bestseller
                  </label>
                  <p className="text-xs text-muted font-paragraph">
                    Bestsellers appear on the home page and are highlighted in listings.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#e5e0d5] flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={closeForm}
                className="flex-1 py-3 border border-[#e5e0d5] text-sm font-paragraph font-semibold hover:bg-gray-50 transition-colors rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                disabled={saving || uploading || !form.itemName || !form.itemPrice}
                className="flex-1 py-3 bg-[#1a6b44] text-white text-sm font-paragraph font-bold hover:bg-[#15573a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
              >
                {uploading ? 'Uploading image...' : saving ? 'Saving...' : editProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
