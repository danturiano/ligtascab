import { Bell, HandCoins, QrCode } from "lucide-react";

import Image from "next/image";
import phone from "/public/about-img.svg";
import android from "/public/android-brand.svg";
import apple from "/public/apple-brand.svg";
import dashboard from "/public/dashboard.svg";

import { AccordionDemo } from "./_components/Accordion";
import FeatureCard from "./_components/FeatureCard";
import SectionHeader from "./_components/SectionHeader";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";
import BrushText from "./_components/BrushStroke";

export default function HomePage() {
  return (
    <div>
      <section className="min-h-screen flex items-center justify-center text-center text-balance flex-col gap-8 px-4 container">
        <h1 className="font-extrabold text-center tracking-tighter leading-none text-5xl md:text-7xl xl:text-8xl">
          A Smarter Way To
          <div className="text-primary">
            {" "}
            Commute With <BrushText text="Ease." />
          </div>
        </h1>
        <p className="text-gray-600 text-lg md:text-2xl lg:text-3xl max-w-screen-xl text-pretty md:text-balance leading-none">
          Systemizing your daily travel by combining convenience, comfort, and
          efficiency for a stress-free journey every time.
        </p>
        <div className="flex space-x-4">
          <Button size="lg" className="py-7 px-4 gap-4 md:px-8 md:py-10">
            <Image src={apple} alt="apple logo" className="md:h-10 md:w-10" />
            <div className="flex flex-col items-start">
              <p className="text-xs md:text-lg">Download on</p>
              <p className="text-md font-bold md:text-xl">Apple Store</p>
            </div>
          </Button>
          <Button size="lg" className="py-7 px-4 gap-4 md:px-8 md:py-10">
            <Image src={android} alt="apple logo" className="md:h-10 md:w-10" />
            <div className="flex flex-col items-start">
              <p className="text-xs md:text-lg">Download on</p>
              <p className="text-md font-bold md:text-xl">Play Store</p>
            </div>
          </Button>
        </div>
      </section>
      <section className="relative flex justify-center top-[-4rem] md:top-[-8rem]">
        <Image src={dashboard} alt="dashboard sample" />
      </section>
      <section className="flex items-center justify-center text-center flex-col container gap-8">
        <SectionHeader
          title="Features"
          subtitle="Key features that make your commute effortless"
          description="Experience effortless commuting with secure rides, transparent
                fees, and comfortable transport options. Enjoy connections and
                convenient amenities for a stress-free journey!"
        />
        <div className="flex flex-col gap-6 lg:flex lg:flex-row md:py-8 lg:gap-10">
          <FeatureCard
            heading="Secure Rides"
            subheading="Feel safe with QR code verification and driver information at your
            fingertips."
          >
            <QrCode color="#1FAB89" className="md:h-7 md:w-7" />
          </FeatureCard>
          <FeatureCard
            heading="Transparent Fees"
            subheading="See fare estimates upfront, ensuring you always know the cost before you ride."
          >
            <HandCoins color="#1FAB89" className="md:h-7 md:w-7" />
          </FeatureCard>
          <FeatureCard
            heading="Emergency Alerts"
            subheading="In case of any emergency, instantly send your location and ride details to authorities."
          >
            <Bell color="#1FAB89" className="md:h-7 md:w-7" />
          </FeatureCard>
        </div>
      </section>
      <section className="flex items-center justify-center text-center flex-col container gap-4 mt-16 md:mt-40 lg:grid lg:grid-cols-2 lg:text-start">
        <div className="space-y-4">
          <SectionHeader
            title="About"
            subtitle="Making tricycle commuting safe and easy"
            description="We created this platform with a simple vision to provide safer, more convenient tricycle rides for commuters while empowering drivers and operators with powerful digital tools."
          />
          <Button>Be our partner</Button>
        </div>
        <Image
          src={phone}
          alt="picture of a phone with ligtascab app"
          className="lg:mt-16"
        />
      </section>
      <section className="flex flex-col items-center justify-center text-center gap-6 mt-16 md:mt-40 md:gap-14">
        <SectionHeader
          title="FAQs"
          subtitle="Any Questions? Look Here"
          description="Quick answers to questions you may have."
        />
        <AccordionDemo />
      </section>
      <section className="lg:max-w-screen-lg bg-primary p-4 max-w-[90%] container rounded-md mt-16 md:mt-40 text-md leading-tight text-center items-center tracking-tighter text-balance flex flex-col gap-4 md:p-14 md:flex-row">
        <h4 className="font-semibold text-lg text-primary-foreground leading-tight md:text-2xl lg:text-4xl md:text-start">
          Whether it’s a quick trip or a long journey, your ride is just a tap
          away.
        </h4>
        <div className="flex space-x-4">
          <Button
            size="lg"
            className="py-6 px-4 gap-2 md:gap-4 md:px-10 md:py-10 hover:bg-[#ffb81a] duration-200"
            variant="secondary"
          >
            <Image src={apple} alt="apple logo" className="md:h-10 md:w-10" />
            <div className="flex flex-col items-start">
              <p className="text-xs md:text-lg">Download on</p>
              <p className="text-md font-bold md:text-xl">Apple Store</p>
            </div>
          </Button>
          <Button
            size="lg"
            className="py-6 px-4 gap-2 md:gap-4 md:px-10 md:py-10 hover:bg-[#ffb81a] duration-200"
            variant="secondary"
          >
            <Image src={android} alt="apple logo" className="md:h-10 md:w-10" />
            <div className="flex flex-col items-start">
              <p className="text-xs md:text-lg">Download on</p>
              <p className="text-md font-bold md:text-xl">Play Store</p>
            </div>
          </Button>
        </div>
      </section>
      <footer className="min-w-max border-t container py-4 mt-16 flex gap-4 items-center flex-col">
        <div className="flex text-xs items-center gap-4 md:text-md">
          <BrandLogo />
          <Link href="/">Home</Link>
          <Link href="/">Features</Link>
          <Link href="/">About</Link>
        </div>
        <div>
          <p className="text-xs text-[#868686]">
            Copyright © 2024 - All right reserved by Ligtascab
          </p>
        </div>
      </footer>
    </div>
  );
}
