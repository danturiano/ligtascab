import AppDemo from "./_components/app-demo";
import CTASection from "./_components/cta-section";
import FAQSection from "./_components/faq-section";
import FeatureSection from "./_components/feature-section";
import HeaderSection from "./_components/header-section";
import Footer from "./_components/landing-footer";

export default function HomePage() {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <div className="relative">
        <HeaderSection />
        <AppDemo />
        <FeatureSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
