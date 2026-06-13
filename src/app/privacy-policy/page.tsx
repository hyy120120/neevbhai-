import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export const metadata = {
  title: 'Privacy Policy — Neev Gifting',
  description: 'Privacy Policy for Neev Gifting.',
};

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3">Privacy Policy</h1>
            <p className="text-white/60 font-paragraph mt-4">Last updated: June 2025</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-sm max-w-none font-paragraph text-foreground space-y-8">

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">1. Information We Collect</h2>
                <p className="text-muted leading-relaxed">
                  When you contact us through our website, WhatsApp, or email, we may collect your name, phone number, email address, and any other information you voluntarily provide. We do not collect payment information as all orders are processed offline via direct communication.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">2. How We Use Your Information</h2>
                <p className="text-muted leading-relaxed">
                  We use the information you provide solely to respond to your inquiries, process bulk order requests, and communicate regarding your gifting requirements. We do not sell, rent, or share your personal information with third parties for marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">3. Bulk Orders & MOQ</h2>
                <p className="text-muted leading-relaxed">
                  Neev Gifting operates exclusively on a bulk order basis with a Minimum Order Quantity (MOQ). All pricing, availability, and order details are communicated directly via WhatsApp or email. No online transactions are processed through this website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">4. Cookies</h2>
                <p className="text-muted leading-relaxed">
                  Our website may use basic cookies to improve your browsing experience. These cookies do not store any personally identifiable information and are used only for functional purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">5. Data Security</h2>
                <p className="text-muted leading-relaxed">
                  We take reasonable precautions to protect your information. However, no method of transmission over the internet is 100% secure. We encourage you to contact us only through official channels listed on this website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">6. Third-Party Links</h2>
                <p className="text-muted leading-relaxed">
                  Our website may contain links to third-party platforms such as WhatsApp and Google Maps. We are not responsible for the privacy practices of these external sites.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">7. Contact Us</h2>
                <p className="text-muted leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
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