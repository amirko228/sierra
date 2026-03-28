import { HeroSection } from '@/components/home/HeroSection';
import { ServiceShowcase } from '@/components/home/ServiceShowcase';
import { ContactCta } from '@/components/home/ContactCta';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceShowcase />
      <ContactCta />
    </>
  );
}
