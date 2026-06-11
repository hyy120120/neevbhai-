'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, Search, MessageCircle, ChevronDown, ChevronRight, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { fetchCategoriesFromFirestore, categoriesToNavigation, DEFAULT_CATEGORIES } from '@/lib/categories';

// ─── STATIC NAV ITEMS ────────────────────────────────────────────────────────

const getStaticNavData = (shopColumns: any[]) => [
  {
    label: 'HOME',
    href: '/',
  },
  {
    label: 'SHOP',
    href: '/shop',
    mega: true,
    columns: shopColumns,
  },
  {
    label: 'SHOP BY PRICE',
    href: '/shop/by-price',
    dropdown: [
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
    dropdown: [
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
    dropdown: [
      { label: 'Wedding Return Favours', href: '/wedding/return-favours' },
      { label: 'Wedding Gifting', href: '/wedding/gifting' },
      { label: 'Rituals', href: '/wedding/rituals' },
    ],
  },
  {
    label: 'CONTACT US',
    href: '/contact',
  },
];

// ─── MOBILE ACCORDION ────────────────────────────────────────────────────────

function MobileAccordion({ item, onClose }: { item: (typeof navData)[0]; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasChildren = item.mega || item.dropdown;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="flex items-center px-4 py-3 text-[13px] font-bold tracking-widest text-[#1a1a18] hover:text-[#1a6b44] hover:bg-[#f0fdf4] rounded-md transition-all duration-200"
      >
        {item.label}
      </Link>
    );
  }

  const allLinks = item.mega
    ? item.columns!.flatMap((col) => [
        { label: col.heading, href: col.href, isHead: true },
        ...col.items!.map((i) => ({ ...i, isHead: false })),
      ])
    : item.dropdown!.map((d) => ({ ...d, isHead: false }));

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-[13px] font-bold tracking-widest text-[#1a1a18] hover:text-[#1a6b44] hover:bg-[#f0fdf4] rounded-md transition-all duration-200"
      >
        {item.label}
        <ChevronDown
          className={cn(
            'h-4 w-4 text-[#d4af37] transition-transform duration-300 ease-in-out',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Smooth height animation using max-height */}
      <div
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight ?? 600}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div ref={contentRef} className="ml-4 border-l-2 border-[#d4af37]/30 pl-3 pb-2">
          {allLinks.map((link, i) => (
            <Link
              key={`${link.href}-${i}`}
              href={link.href}
              onClick={onClose}
              className={cn(
                'block py-2 px-2 text-sm rounded-md transition-all duration-150',
                (link as any).isHead
                  ? 'font-bold text-[#1a6b44] text-[10px] tracking-[0.15em] uppercase mt-3 mb-0.5'
                  : 'text-[#4b5563] hover:text-[#1a6b44] hover:bg-[#f0fdf4] hover:pl-4'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN HEADER ─────────────────────────────────────────────────────────────

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [navData, setNavData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { itemCount, toggleCart } = useCartStore();

  // Fetch categories and build navigation
  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const categories = await fetchCategoriesFromFirestore();
        const shopColumns = categoriesToNavigation(categories.length > 0 ? categories : DEFAULT_CATEGORIES);
        const navItems = getStaticNavData(shopColumns);
        setNavData(navItems);
      } catch (error) {
        console.error('Failed to load navigation:', error);
        // Fallback to default categories
        const shopColumns = categoriesToNavigation(DEFAULT_CATEGORIES);
        const navItems = getStaticNavData(shopColumns);
        setNavData(navItems);
      } finally {
        setLoading(false);
      }
    };

    loadNavigation();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white transition-all duration-300',
        scrolled
          ? 'shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
          : 'border-b border-[#e5e7eb]'
      )}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-[68px] gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#d4af37]/40 group-hover:ring-[#d4af37] transition-all duration-300">
              <Image src="/logo.jpeg" alt="Neev Gifting" fill className="object-cover" priority />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-heading font-bold text-[#1a6b44] leading-tight">
                Neev Gifting
              </span>
              <span className="block text-[9px] tracking-[0.2em] uppercase text-[#d4af37] font-paragraph">
                Enhancing Experiences
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center h-full" onMouseLeave={closeMenu}>
            {navData.map((item) => {
              const hasChildren = item.mega || item.dropdown;
              const isOpen = activeMenu === item.label;

              return (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => (hasChildren ? openMenu(item.label) : setActiveMenu(null))}
                >
                  {/* Nav link */}
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex items-center gap-1 h-full px-4 text-[11px] font-paragraph font-bold tracking-widest transition-colors duration-200',
                      isOpen ? 'text-[#1a6b44]' : 'text-[#1a1a18] hover:text-[#1a6b44]'
                    )}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          'h-3 w-3 mt-0.5 transition-transform duration-300 ease-in-out',
                          isOpen && 'rotate-180'
                        )}
                      />
                    )}
                    {/* Gold underline — scaleX animation, always in DOM */}
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#d4af37] origin-center"
                      style={{
                        transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </Link>

                  {/* ── MEGA MENU — always in DOM, opacity+translate transition ── */}
                  {item.mega && (
                    <div
                      onMouseEnter={cancelClose}
                      onMouseLeave={closeMenu}
                      className="absolute top-full left-1/2 w-[660px] bg-white border-t-2 border-[#d4af37] shadow-[0_12px_48px_rgba(0,0,0,0.10)]"
                      style={{
                        transform: isOpen
                          ? 'translateX(-50%) translateY(0px)'
                          : 'translateX(-50%) translateY(-10px)',
                        opacity: isOpen ? 1 : 0,
                        visibility: isOpen ? 'visible' : 'hidden',
                        transition: 'opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)',
                        pointerEvents: isOpen ? 'auto' : 'none',
                      }}
                    >
                      <div className="grid grid-cols-3 divide-x divide-[#f3f4f6]">
                        {item.columns!.map((col) => (
                          <div key={col.heading} className="p-5">
                            <Link
                              href={col.href}
                              className="block text-[10px] font-bold tracking-[0.2em] text-[#1a6b44] uppercase mb-3 pb-2.5 border-b border-[#d4af37]/40 hover:text-[#d4af37] transition-colors duration-150"
                            >
                              {col.heading}
                            </Link>
                            <ul className="space-y-2">
                              {col.items!.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    className="group/sub flex items-center gap-2 text-[12.5px] text-[#4b5563] hover:text-[#1a6b44] font-paragraph transition-all duration-150 hover:translate-x-1"
                                  >
                                    <span
                                      className="w-1 h-1 rounded-full bg-[#d4af37] flex-shrink-0 transition-transform duration-200 scale-0 group-hover/sub:scale-100"
                                    />
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── STANDARD DROPDOWN — always in DOM, opacity+translate transition ── */}
                  {item.dropdown && (
                    <div
                      onMouseEnter={cancelClose}
                      onMouseLeave={closeMenu}
                      className="absolute top-full left-0 min-w-[210px] bg-white border-t-2 border-[#d4af37] shadow-[0_12px_48px_rgba(0,0,0,0.10)]"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateY(0px)' : 'translateY(-10px)',
                        visibility: isOpen ? 'visible' : 'hidden',
                        transition: 'opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)',
                        pointerEvents: isOpen ? 'auto' : 'none',
                      }}
                    >
                      <ul className="py-2">
                        {item.dropdown.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="group/drop flex items-center gap-2 px-5 py-2.5 text-[12.5px] font-paragraph text-[#4b5563] hover:text-[#1a6b44] hover:bg-[#f0fdf4] transition-all duration-150 hover:pl-6"
                            >
                              <ChevronRight
                                className="h-3 w-3 text-[#d4af37] flex-shrink-0"
                                style={{
                                  opacity: 0,
                                  transform: 'translateX(-4px)',
                                  transition: 'opacity 0.15s, transform 0.15s',
                                }}
                                // CSS handles hover via group class
                              />
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Link
              href="/shop"
              aria-label="Search"
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full text-[#6b7280] hover:text-[#1a6b44] hover:bg-[#f0fdf4] transition-all duration-200"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>

            <button
              aria-label="Account"
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full text-[#6b7280] hover:text-[#1a6b44] hover:bg-[#f0fdf4] transition-all duration-200"
            >
              <User className="h-[18px] w-[18px]" />
            </button>

            <button
              onClick={toggleCart}
              aria-label="Cart"
              className="relative flex items-center justify-center w-9 h-9 rounded-full text-[#6b7280] hover:text-[#1a6b44] hover:bg-[#f0fdf4] transition-all duration-200"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1a6b44] text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5 leading-none">
                  {itemCount}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/919712979856"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 ml-2 px-4 py-2 bg-[#1a6b44] text-white text-[11px] font-paragraph font-bold tracking-wider rounded hover:bg-[#15573a] transition-all duration-200 hover:shadow-lg hover:shadow-[#1a6b44]/25 hover:-translate-y-px"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WHATSAPP
            </a>

            {/* Animated hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full text-[#374151] hover:bg-[#f0fdf4] transition-colors ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="relative w-5 h-5 flex flex-col justify-center items-center gap-[5px]">
                <span
                  className="block w-5 h-[1.5px] bg-current transition-all duration-300 origin-center"
                  style={mobileOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}}
                />
                <span
                  className="block w-5 h-[1.5px] bg-current transition-all duration-300"
                  style={mobileOpen ? { opacity: 0, transform: 'scaleX(0)' } : {}}
                />
                <span
                  className="block w-5 h-[1.5px] bg-current transition-all duration-300 origin-center"
                  style={mobileOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu — smooth max-height ── */}
      <div
        style={{
          maxHeight: mobileOpen ? '80vh' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className="border-t border-[#e5e7eb] bg-white overflow-y-auto"
          style={{ maxHeight: '80vh' }}
        >
          <div className="container mx-auto px-4 py-3 space-y-0.5">
            {navData.map((item) => (
              <MobileAccordion
                key={item.label}
                item={item}
                onClose={() => setMobileOpen(false)}
              />
            ))}

            <div className="h-px bg-[#e5e7eb] my-3" />

            <a
              href="https://wa.me/919712979856"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#1a6b44] text-white text-sm font-paragraph font-bold tracking-wider rounded hover:bg-[#15573a] transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}