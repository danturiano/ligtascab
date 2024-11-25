import AppDemo from "./_components/AppDemo";
import Background from "./_components/Background";
import CTASection from "./_components/CTASection";
import FAQSection from "./_components/FAQSection";
import FeatureSection from "./_components/FeatureSection";
import Footer from "./_components/Footer";
import HeaderSection from "./_components/HeaderSection";

export default function HomePage() {
  return (
    <>
      <Background />
      <HeaderSection />
      <AppDemo />
      <FeatureSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
