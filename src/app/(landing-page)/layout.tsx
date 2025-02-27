import { ReactNode } from "react";
import Navigation from "./_components/landing-nav";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}
