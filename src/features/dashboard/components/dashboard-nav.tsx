import { Button } from "@/components/ui/button";
import Logo from "./brand-logo";
import NotificationDashboard from "./notification";
import SearchBar from "./search-bar";
import { signOut } from "@/features/drivers/actions/drivers";

export default function Navigation() {
  return (
    <div className="w-full fixed h-16 px-4 z-50 bg-primary flex justify-between">
      <Logo />
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NotificationDashboard />
          <SearchBar />
        </div>
        <div>
          <Button onClick={signOut}>Signout</Button>
        </div>
      </div>
    </div>
  );
}
