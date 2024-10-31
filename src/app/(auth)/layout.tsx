import { Toaster } from "react-hot-toast";
import Navigation from "./_components/Navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navigation />
      {children}
      <Toaster
        position="bottom-center"
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 80,
          right: 20,
        }}
      />
    </div>
  );
}
