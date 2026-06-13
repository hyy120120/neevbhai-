import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    href: 'https://www.facebook.com/share/1CpZLxecTu/',
    label: 'Facebook',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/neev_giftingbymonika?igsh=MWN3aGJsY2t6cHg4YQ==',
    label: 'Instagram',
  },
];

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
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
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
                  href="mailto:neevgiftingstudio@gmail.com"
                  className="flex items-start gap-3 text-white/60 hover:text-[#d4af37] transition-colors text-sm font-paragraph group"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-[#d4af37]" />
                  neevgiftingstudio@gmail.com
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
                <a
                  href="https://maps.app.goo.gl/MRe9Z8KSHGAsQA4Y8?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/60 hover:text-[#d4af37] transition-colors text-sm font-paragraph group cursor-pointer"
                >
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-[#d4af37]" />
                  G-37, Atlanta Business Hub, Vesu Canal Rd, Bharthana, Surat, Gujarat 395007
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
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-white/30 hover:text-[#d4af37] text-xs font-paragraph transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20 text-xs">·</span>
            <Link href="/terms" className="text-white/30 hover:text-[#d4af37] text-xs font-paragraph transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/20 text-xs">·</span>
            <Link href="/refund-policy" className="text-white/30 hover:text-[#d4af37] text-xs font-paragraph transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
