import Navigation from "./_components/Navigation";
import Sidebar from "./_components/Sidebar";

export default function Page() {
  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <Sidebar />
    </div>
  );
}
