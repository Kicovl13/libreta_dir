'use client';

import { motion } from 'framer-motion';

const navItems = ['Story', 'Menu', 'Experience', 'Gallery', 'Reviews', 'Reservations'];

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-coal/80 backdrop-blur-xl"
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <a className="font-display text-xl tracking-[0.25em]" href="#top">
          NOIR & EMBER
        </a>
        <nav className="hidden items-center gap-8 text-sm text-cream/80 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="luxury-link">
              {item}
            </a>
          ))}
        </nav>
        <a
          href="#reservations"
          className="rounded-full border border-bronze/70 bg-bronze/10 px-5 py-2 text-sm font-medium text-bronze transition hover:bg-bronze hover:text-coal"
        >
          Book Now
        </a>
      </div>
    </motion.header>
  );
}
