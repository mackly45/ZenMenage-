import { HeroCarousel } from '../components/landing/HeroCarousel';
import { Stats } from '../components/landing/Stats';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { FAQ } from '../components/landing/FAQ';
import { Blog } from '../components/landing/Blog';
import { CTA } from '../components/landing/CTA';
import { Footer } from '../components/landing/Footer';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <HeroCarousel onGetStarted={onGetStarted} />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing onGetStarted={onGetStarted} />
      <FAQ />
      <Blog />
      <CTA onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
}
