import Image from 'next/image';
import { Beef, GlassWater, Leaf, MapPinned, Phone, ShieldCheck, Sparkles, Star, Timer, UtensilsCrossed } from 'lucide-react';

const dishes = [
  { name: 'Charred Wagyu Ribeye', description: '42-day dry-aged ribeye, smoked bone marrow butter, confit garlic jus.', price: '$68' },
  { name: 'Miso Black Cod', description: 'Cedar-fired black cod, yuzu beurre blanc, crispy lotus root.', price: '$44' },
  { name: 'Truffle Mushroom Gnocchi', description: 'Hand-rolled potato gnocchi, wild mushroom cream, shaved black truffle.', price: '$36' },
  { name: 'Ember Chocolate Sphere', description: 'Valrhona chocolate shell, salted caramel core, warm hazelnut praline.', price: '$18' }
];

const experience = [
  { icon: Beef, title: 'Prime Ingredients', text: 'Ethically sourced meats and seasonal produce from selected artisan suppliers.' },
  { icon: UtensilsCrossed, title: 'Chef-Driven Menus', text: 'Curated tasting journeys that evolve every month.' },
  { icon: GlassWater, title: 'Signature Cocktails', text: 'Bar program built around rare spirits and house infusions.' },
  { icon: Sparkles, title: 'Elegant Atmosphere', text: 'Architectural lighting, live jazz nights, and refined service rituals.' },
  { icon: ShieldCheck, title: 'Private Events', text: 'Sophisticated spaces for executive dinners and milestone celebrations.' },
  { icon: Leaf, title: 'Mindful Dining', text: 'Premium vegetarian and pescatarian options designed with equal craft.' }
];

export function StorySection() {
  return (
    <section id="story" className="section-shell grid gap-12 py-24 md:grid-cols-2 md:items-center">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.25em] text-bronze">Our Story</p>
        <h2 className="font-display text-4xl leading-tight md:text-5xl">A contemporary steakhouse rooted in craft, warmth, and ceremony.</h2>
        <p className="text-cream/75">
          Born from a partnership between an award-winning chef and a third-generation butcher, Noir & Ember blends open-fire cooking with modern European finesse. Every service is orchestrated to feel effortless, intimate, and unforgettable.
        </p>
        <p className="text-cream/75">
          From date nights to celebratory family dinners, our team creates an elevated experience where hospitality feels personal and every detail reflects quiet luxury.
        </p>
      </div>
      <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/10 shadow-ambient">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
          alt="Noir & Ember interior"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}

export function MenuSection() {
  return (
    <section id="menu" className="bg-graphite/60 py-24">
      <div className="section-shell space-y-12">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-bronze">Signature Dishes</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Featured Menu Highlights</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {dishes.map((dish) => (
            <article key={dish.name} className="glass-panel rounded-2xl p-6 transition hover:-translate-y-1 hover:border-bronze/40">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl">{dish.name}</h3>
                <span className="text-bronze">{dish.price}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{dish.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section-shell py-24">
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-bronze">Why Choose Us</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Beyond dinner, this is an experience.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {experience.map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass-panel rounded-2xl p-6">
            <Icon className="text-bronze" size={26} />
            <h3 className="mt-4 font-display text-2xl">{title}</h3>
            <p className="mt-2 text-sm text-cream/70">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GallerySection() {
  const images = [
    'photo-1424847651672-bf20a4b0982b',
    'photo-1544148103-0773bf10d330',
    'photo-1414235077428-338989a2e8c0',
    'photo-1447078806655-40579c2520d6',
    'photo-1550966871-3ed3cdb5ed0c',
    'photo-1514362545857-3bc16c4c7d1b'
  ];

  return (
    <section id="gallery" className="bg-graphite/60 py-24">
      <div className="section-shell">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-bronze">Gallery</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Ambiance, flavor, and detail.</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((id, index) => (
            <div key={id} className={`relative overflow-hidden rounded-2xl border border-white/10 ${index % 3 === 0 ? 'md:col-span-2 md:row-span-2 min-h-64' : 'min-h-52'}`}>
              <Image
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`}
                alt="Restaurant gallery visual"
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    { name: 'Amelia R.', quote: 'The finest steak experience we have had in years. Service was precise, warm, and genuinely memorable.' },
    { name: 'Daniel K.', quote: 'Impeccable cocktails, intimate lighting, and dishes that feel both creative and comforting.' },
    { name: 'Priya M.', quote: 'We hosted a private anniversary dinner and everything, from planning to plating, was flawless.' }
  ];

  return (
    <section id="reviews" className="section-shell py-24">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-bronze">Testimonials</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Loved by our guests</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote key={item.name} className="glass-panel rounded-2xl p-6">
            <Star className="text-bronze" size={20} />
            <p className="mt-4 text-cream/80">“{item.quote}”</p>
            <cite className="mt-5 block text-sm not-italic text-smoke">{item.name}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export function ReservationSection() {
  return (
    <section id="reservations" className="bg-graphite/60 py-24">
      <div className="section-shell grid gap-8 rounded-3xl border border-bronze/30 bg-gradient-to-br from-bronze/10 to-transparent p-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-bronze">Reservations & Contact</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Book your evening at Noir & Ember.</h2>
          <p className="mt-4 text-cream/75">Limited tables available nightly. Secure your preferred time in under a minute.</p>
          <div className="mt-6 space-y-3 text-sm text-cream/80">
            <p className="flex items-center gap-2"><Phone size={15} /> +1 (212) 555-0189</p>
            <p className="flex items-center gap-2"><MapPinned size={15} /> 148 W 58th St, New York, NY 10019</p>
            <p className="flex items-center gap-2"><Timer size={15} /> Mon–Thu 5pm–11pm | Fri–Sun 4pm–12am</p>
          </div>
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-coal/70 p-6">
          <a className="block rounded-full bg-bronze px-6 py-3 text-center font-semibold text-coal transition hover:brightness-105" href="#">
            Reserve a Table
          </a>
          <a className="block rounded-full border border-cream/40 px-6 py-3 text-center text-cream transition hover:border-bronze hover:text-bronze" href="tel:+12125550189">
            Call Restaurant
          </a>
          <a className="block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-center text-emerald-300 transition hover:bg-emerald-400/20" href="https://wa.me/12125550189">
            WhatsApp Concierge
          </a>
        </div>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section id="location" className="section-shell py-24">
      <div className="grid gap-8 md:grid-cols-[1fr_1.6fr]">
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="font-display text-3xl">Location</h3>
          <p className="mt-4 text-cream/70">148 W 58th St, New York, NY 10019</p>
          <p className="mt-2 text-cream/70">Two blocks from Central Park South. Valet and subway access available.</p>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80"
            alt="Map placeholder"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 grid place-items-center bg-coal/45">
            <div className="rounded-full border border-bronze/50 bg-coal/70 px-5 py-2 text-sm uppercase tracking-[0.2em] text-bronze">Interactive map area</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-10">
      <div className="section-shell grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-[0.2em]">NOIR & EMBER</p>
          <p className="mt-3 text-sm text-cream/65">Contemporary steakhouse, crafted cocktails, and elevated hospitality.</p>
        </div>
        <div className="text-sm text-cream/70">
          <p className="mb-3 uppercase tracking-[0.2em] text-bronze">Navigate</p>
          <div className="grid grid-cols-2 gap-2">
            {['Story', 'Menu', 'Experience', 'Gallery', 'Reviews', 'Reservations'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-bronze">
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="text-sm text-cream/70">
          <p className="mb-3 uppercase tracking-[0.2em] text-bronze">Contact</p>
          <p>+1 (212) 555-0189</p>
          <p>reservations@noirandember.com</p>
          <p className="mt-2">Open daily for dinner service.</p>
        </div>
      </div>
    </footer>
  );
}
