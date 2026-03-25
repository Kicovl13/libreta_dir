import { Hero } from '../components/hero';
import { SiteHeader } from '../components/site-header';
import {
  ExperienceSection,
  GallerySection,
  LocationSection,
  MenuSection,
  ReservationSection,
  SiteFooter,
  StorySection,
  TestimonialsSection
} from '../components/sections';

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <StorySection />
      <MenuSection />
      <ExperienceSection />
      <GallerySection />
      <TestimonialsSection />
      <ReservationSection />
      <LocationSection />
      <SiteFooter />
    </main>
  );
}
