import AppDemo from './_components/AppDemo';
import CTASection from './_components/CTASection';
import FAQSection from './_components/FAQSection';
import FeatureSection from './_components/FeatureSection';
import Footer from './_components/Footer';
import HeaderSection from './_components/HeaderSection';

export default function HomePage() {
	return (
		<>
			<div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
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
