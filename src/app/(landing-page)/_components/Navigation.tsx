import Link from "next/link";
import NavMobile from "./NavMobile";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <header className="py-4 fixed top-0 w-full z-10 shadow-sm bg-background/95 md:py-6 md:flex">
      <nav className="flex items-center justify-between gap-10 container font-regular">
        <Link href="/">
          <BrandLogo />
        </Link>
        <div className="hidden md:flex md:items-center md:gap-10">
          <Link
            href="/"
            className="hover:bg-primary p-2 rounded-md hover:text-primary-foreground duration-200 hover:font-regular"
          >
            Features
          </Link>
          <Link
            href="/"
            className="hover:bg-primary p-2 rounded-md hover:text-primary-foreground duration-200 hover:font-regular"
          >
            About
          </Link>
          <Link
            href="/"
            className="hover:bg-primary p-2 rounded-md hover:text-primary-foreground duration-200 hover:font-regular"
          >
            FAQs
          </Link>
        </div>
        <div className="hidden md:flex md:space-x-4">
          <Link href="/sign-up">
            <Button variant="ghost">Sign up</Button>
          </Link>
          <Link href="/sign-in">
            <Button className="px-5">Login</Button>
          </Link>
        </div>
        <div className="md:hidden">
          <NavMobile />
        </div>
      </nav>
    </header>
  );
}
