import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureShowcase from "@/components/FeatureShowcase";
import Products from "@/components/Products";
import Pricing from "@/components/Pricing";
import Locations from "@/components/Locations";
import UseCases from "@/components/UseCases";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureShowcase />
        <Products />
        <Pricing />
        <Locations />
        <UseCases />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
