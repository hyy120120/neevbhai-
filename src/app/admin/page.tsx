'use client';
import dynamic from 'next/dynamic';

const AdminClient = dynamic(
  () => import('@/components/pages/AdminClient'),
  { ssr: false }
);

export default function AdminPage() {
  return <AdminClient />;
}
