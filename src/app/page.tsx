import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import AboutCompany from "@/components/AboutCompany";
import WhyChoose from "@/components/WhyChoose";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <HowItWorks />
      <AboutCompany />
      <WhyChoose />
      <Stats />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
