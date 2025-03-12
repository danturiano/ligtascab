import Footer from "@/features/account-setup/components/footer";
import { Toaster } from "@/components/ui/sonner";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {children}
      <Toaster />
      <Footer />
    </div>
  );
}
