import { Award } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden pt-28">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(6,7,9,0.88), rgba(6,7,9,0.58)), url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1900&q=80')"
        }}
      />
      <div className="absolute inset-0 -z-10 bg-grain" />
      <div className="section-shell flex min-h-[85vh] items-end pb-20 md:items-center md:pb-0">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-bronze/60 bg-bronze/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-bronze">
            <Award size={14} /> Award-winning dining experience
          </div>
          <h1 className="font-display text-5xl leading-tight text-cream md:text-7xl">
            Contemporary fire cuisine,
            <span className="block text-bronze">crafted for memorable evenings.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl">
            Step into Noir & Ember, where dry-aged cuts, seasonal tasting plates, and handcrafted cocktails come together in an intimate modern steakhouse atmosphere.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#reservations"
              className="rounded-full bg-bronze px-7 py-3 text-sm font-semibold uppercase tracking-wider text-coal transition hover:-translate-y-0.5"
            >
              Reserve a Table
            </a>
            <a
              href="#menu"
              className="rounded-full border border-cream/50 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition hover:border-bronze hover:text-bronze"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
