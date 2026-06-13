import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

export const metadata = {
  title: 'Terms of Service — Neev Gifting',
  description: 'Terms of Service for Neev Gifting.',
};

export default function TermsPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3">Terms of Service</h1>
            <p className="text-white/60 font-paragraph mt-4">Last updated: June 2025</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-sm max-w-none font-paragraph text-foreground space-y-8">

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">1. About Neev Gifting</h2>
                <p className="text-muted leading-relaxed">
                  Neev Gifting is a bulk gifting studio specializing in premium silver and customized gift products. We operate exclusively on a Minimum Order Quantity (MOQ) basis. This website is intended for lead generation and product discovery only — no online purchases are processed here.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">2. Bulk Orders Only</h2>
                <p className="text-muted leading-relaxed">
                  All orders placed with Neev Gifting are subject to a Minimum Order Quantity (MOQ). Single-piece orders are not accepted. Pricing, MOQ details, and availability are communicated directly via WhatsApp or email after an inquiry is submitted.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">3. Pricing</h2>
                <p className="text-muted leading-relaxed">
                  All prices displayed on this website are listed as "As Per MOQ" and are subject to change based on order quantity, customization requirements, and material costs. Final pricing will be confirmed in writing before any order is processed.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">4. Customization</h2>
                <p className="text-muted leading-relaxed">
                  Neev Gifting offers customization services for eligible products. Customization requests must be communicated clearly at the time of inquiry. Additional charges may apply for customization, and timelines will be discussed on a case-by-case basis.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">5. Intellectual Property</h2>
                <p className="text-muted leading-relaxed">
                  All content on this website including images, logos, and product descriptions are the property of Neev Gifting. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">6. Limitation of Liability</h2>
                <p className="text-muted leading-relaxed">
                  Neev Gifting shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or from any order placed. Our liability is limited to the value of the order in question.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">7. Changes to Terms</h2>
                <p className="text-muted leading-relaxed">
                  We reserve the right to update these Terms of Service at any time. Continued use of this website after changes are posted constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">8. Contact Us</h2>
                <p className="text-muted leading-relaxed">
                  For any questions regarding these terms, please contact us at{' '}
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