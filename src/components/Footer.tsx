import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f2d1e] text-white ">
      {/* Top gold divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#d4af37]/40 flex-shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Neev Gifting Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block font-heading font-bold text-lg text-white leading-tight">
                  Neev Gifting
                </span>
                <span className="block text-[10px] tracking-[0.18em] uppercase text-[#d4af37]">
                  Enhancing Experiences
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm font-paragraph leading-relaxed mb-5">
              Premium personalized gifting solutions for all your special occasions. Quality craftsmanship in pure silver.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 text-base tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop', path: '/shop' },
                { name: 'Bestsellers', path: '/bestsellers' },
                { name: '999 Silver', path: '/silver' },
                { name: 'Wedding', path: '/wedding' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-white/60 hover:text-[#d4af37] transition-colors text-sm font-paragraph flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-[#d4af37] group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 text-base tracking-wide">
              Customer Service
            </h4>
            <ul className="space-y-2.5">
              {[
                'Shipping Worldwide',
                '100% Payment Secure',
                'Bulk Orders Available',
                'Customized Gift Sets',
                'Easy Returns Policy',
              ].map((item) => (
                <li key={item} className="text-white/60 text-sm font-paragraph flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 text-base tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@neevgifting.com"
                  className="flex items-start gap-3 text-white/60 hover:text-[#d4af37] transition-colors text-sm font-paragraph group"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-[#d4af37]" />
                  info@neevgifting.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919712979856"
                  className="flex items-start gap-3 text-white/60 hover:text-[#d4af37] transition-colors text-sm font-paragraph group"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-[#d4af37]" />
                  +91 9712979856
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-white/60 text-sm font-paragraph">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  India (Ships Worldwide)
                </span>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/919712979856"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white text-sm font-paragraph rounded-sm hover:bg-[#1fb857] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-paragraph">
            © {new Date().getFullYear()} Neev Gifting. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-paragraph">
            Enhancing Experiences · Premium Silver Gifting
          </p>
        </div>
      </div>
    </footer>
  );
}
