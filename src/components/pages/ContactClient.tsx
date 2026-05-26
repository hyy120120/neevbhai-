'use client';

import { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle } from 'lucide-react';
import AnimatedElement from '@/components/AnimatedElement';

const contactCards = [
  {
    icon: Mail,
    title: 'Email Us',
    info: 'info@neevgifting.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:info@neevgifting.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    info: '+91 9712979856',
    sub: 'Mon–Sat, 9am–6pm IST',
    href: 'tel:+919712979856',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    info: 'Chat with us',
    sub: 'Fastest response guaranteed',
    href: 'https://wa.me/919712979856',
    external: true,
  },
];

const businessHours = [
  { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((p) => ({ ...p, [e.target.name]: '' }));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0f2d1e] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-paragraph font-semibold">
            Reach Out
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">
            Get In Touch
          </h1>
          <p className="text-white/65 font-paragraph text-base md:text-lg max-w-xl mx-auto">
            Have questions about gifting, bulk orders, or customization? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-[#f5f3ee] border-b border-[#e5e0d5]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactCards.map((card, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <a
                  href={card.href}
                  target={card.external ? '_blank' : '_self'}
                  rel={card.external ? 'noopener noreferrer' : ''}
                  className="block border border-gray-200 bg-white p-6 text-center hover:border-[#d4af37] hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-[#d4af37]/40 group-hover:border-[#d4af37] group-hover:bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4 text-[#d4af37] transition-all duration-300">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-1">{card.title}</h3>
                  <p className="text-sm font-paragraph text-primary font-semibold mb-1">{card.info}</p>
                  <p className="text-xs font-paragraph text-muted">{card.sub}</p>
                </a>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Hours */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedElement>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
                  Send Us a Message
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm font-paragraph text-green-800">
                      Thank you! Your message has been sent. We'll get back to you shortly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-paragraph font-semibold text-foreground mb-2">
                        Your Name *
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Rahul Sharma"
                        className={`w-full px-4 py-3 text-sm font-paragraph border focus:outline-none focus:border-primary transition-colors ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1 font-paragraph">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-paragraph font-semibold text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 text-sm font-paragraph border focus:outline-none focus:border-primary transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1 font-paragraph">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-paragraph font-semibold text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 9712979856"
                        className="w-full px-4 py-3 text-sm font-paragraph border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-paragraph font-semibold text-foreground mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm font-paragraph border border-gray-200 focus:outline-none focus:border-primary transition-colors bg-white"
                      >
                        <option value="">Select a topic</option>
                        <option value="bulk-order">Bulk Order Inquiry</option>
                        <option value="customization">Customization Request</option>
                        <option value="product">Product Information</option>
                        <option value="shipping">Shipping & Delivery</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-paragraph font-semibold text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your inquiry or gift requirements..."
                      className={`w-full px-4 py-3 text-sm font-paragraph border focus:outline-none focus:border-primary transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1 font-paragraph">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-3.5 bg-primary text-white text-sm font-paragraph font-bold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </AnimatedElement>
            </div>

            {/* Side info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Business Hours */}
              <AnimatedElement delay={150}>
                <div className="border border-gray-100 p-6">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#d4af37] inline-block" />
                    Business Hours
                  </h3>
                  <div className="space-y-3">
                    {businessHours.map((h, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <span className="text-sm font-paragraph text-foreground">{h.day}</span>
                        <span className="text-sm font-paragraph text-muted">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>

              {/* Location */}
              <AnimatedElement delay={200}>
                <div className="border border-gray-100 p-6">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#d4af37] inline-block" />
                    Our Location
                  </h3>
                  <div className="flex items-start gap-3 text-sm font-paragraph text-muted mb-4">
                    <MapPin className="h-4 w-4 mt-0.5 text-[#d4af37] flex-shrink-0" />
                    <span>India — Shipping Worldwide</span>
                  </div>
                  <a
                    href="https://wa.me/919712979856?text=I would like to visit your store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs font-paragraph font-semibold uppercase tracking-wider hover:bg-[#1fb857] transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Schedule a Visit
                  </a>
                </div>
              </AnimatedElement>

              {/* Quick WhatsApp CTA */}
              <AnimatedElement delay={250}>
                <div className="bg-[#0f2d1e] p-6 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#d4af37] font-paragraph font-semibold mb-3">
                    Fastest Response
                  </p>
                  <p className="text-white font-heading font-bold text-lg mb-4">
                    Chat with us on WhatsApp
                  </p>
                  <a
                    href="https://wa.me/919712979856"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white text-sm font-paragraph font-bold hover:bg-[#1fb857] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Open WhatsApp
                  </a>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
