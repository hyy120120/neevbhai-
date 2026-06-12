import { Category, categoriesToNavigation } from './categories';

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaColumn {
  heading: string;
  href: string;
  items: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  mega?: boolean;
  dropdown?: NavLink[];
  columns?: MegaColumn[];
}

const PRICE_DROPDOWN: NavLink[] = [
  { label: 'Upto ₹150', href: '/shop/price/150' },
  { label: 'Upto ₹500', href: '/shop/price/500' },
  { label: 'Upto ₹1000', href: '/shop/price/1000' },
  { label: 'Upto ₹1500', href: '/shop/price/1500' },
  { label: '₹1500 & Above', href: '/shop/price/above-1500' },
];

function subcategoryDropdown(
  category: Category | undefined,
  basePath: string
): NavLink[] {
  if (!category?.subcategories?.length) return [];
  return category.subcategories.map((sub) => ({
    label: sub.name,
    href: `${basePath}/${sub.slug}`,
  }));
}

export function buildNavData(categories: Category[]): NavItem[] {
  const shopColumns = categoriesToNavigation(categories);
  const silver = categories.find((c) => c.slug === 'silver');
  const wedding = categories.find((c) => c.slug === 'wedding');

  return [
    { label: 'HOME', href: '/' },
    {
      label: 'SHOP',
      href: '/shop',
      mega: true,
      columns: shopColumns,
    },
    {
      label: 'SHOP BY PRICE',
      href: '/shop/by-price',
      dropdown: PRICE_DROPDOWN,
    },
    {
      label: '999 SILVER',
      href: '/silver',
      dropdown: subcategoryDropdown(silver, '/silver'),
    },
    {
      label: 'WEDDING',
      href: '/wedding',
      dropdown: subcategoryDropdown(wedding, '/wedding'),
    },
    { label: 'CONTACT US', href: '/contact' },
  ];
}
