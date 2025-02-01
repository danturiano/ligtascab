import Logo from './Logo';
import NavUser from './NavUser';
import Notification from './Notification';
import SearchBar from './SearchBar';

export default function Navigation() {
	return (
		<div className="w-full fixed h-16 px-4 z-50 bg-primary flex justify-between">
			<Logo />
			<div className="flex-1 flex items-center justify-between">
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
