import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export const metadata = {
  title: 'Refund Policy — Neev Gifting',
  description: 'Refund and Cancellation Policy for Neev Gifting.',
};

export default function RefundPolicyPage() {
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
        <section className="py-16 md:py-24 bg-[#0f2d1e]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">Legal</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3">Refund Policy</h1>
            <p className="text-white/60 font-paragraph mt-4">Last updated: June 2025</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-sm max-w-none font-paragraph text-foreground space-y-8">

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">1. Bulk Order Nature</h2>
                <p className="text-muted leading-relaxed">
                  All orders placed with Neev Gifting are bulk orders with a Minimum Order Quantity (MOQ). Due to the customized and bulk nature of our products, all sales are carefully reviewed before confirmation. We encourage customers to clarify all requirements before placing an order.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">2. Cancellation Policy</h2>
                <p className="text-muted leading-relaxed">
                  Orders can be cancelled only before production begins. Once production has started, cancellations will not be accepted. Cancellation requests must be communicated in writing via WhatsApp or email within 24 hours of order confirmation.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">3. Defective or Damaged Products</h2>
                <p className="text-muted leading-relaxed">
                  If you receive defective or damaged products, please notify us within 48 hours of delivery with photos and a description of the issue. We will review the claim and offer a replacement or credit at our discretion.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">4. Customized Products</h2>
                <p className="text-muted leading-relaxed">
                  Customized or personalized products cannot be returned or refunded unless they are defective or significantly different from what was agreed upon. Please review all customization details carefully before confirming your order.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">5. Refund Process</h2>
                <p className="text-muted leading-relaxed">
                  Approved refunds will be processed within 7–10 business days via the original payment method or as mutually agreed. Refund eligibility is determined on a case-by-case basis after reviewing the nature of the issue.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">6. Shipping Damages</h2>
                <p className="text-muted leading-relaxed">
                  In case of shipping damage, please retain all original packaging and notify us immediately with photographic evidence. We will coordinate with the shipping partner to resolve the issue as quickly as possible.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">7. Contact Us</h2>
                <p className="text-muted leading-relaxed">
                  For any refund or cancellation related queries, please contact us at{' '}
                  <a href="mailto:neevgiftingstudio@gmail.com" className="text-primary hover:underline">
                    neevgiftingstudio@gmail.com
                  </a>{' '}
                  or via WhatsApp at{' '}
                  <a href="https://wa.me/919712979856" className="text-primary hover:underline">
                    +91 9712979856
                  </a>.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}