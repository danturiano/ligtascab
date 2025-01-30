import Logo from "./Logo";
import NavUser from "./NavUser";
import Notification from "./Notification";
import SearchBar from "./SearchBar";

export default function Navigation() {
  return (
    <div className="w-full fixed h-16 px-4 z-50 bg-primary grid grid-cols-[auto,1fr]">
      <Logo />
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <Notification />
          <SearchBar />
        </div>
        <div>
          <NavUser />
        </div>
      </div>
    </div>
  );
}
