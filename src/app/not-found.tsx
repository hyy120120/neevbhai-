import Link from 'next/link';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export default async function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderWrapper />
      <Cart />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4 py-20">
          <div className="text-8xl font-heading font-bold text-primary/20 mb-6">404</div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted font-paragraph mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist. Let's find you something beautiful.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-primary text-white text-sm font-paragraph font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3 border border-primary text-primary text-sm font-paragraph font-semibold uppercase tracking-wider hover:bg-primary/5 transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
