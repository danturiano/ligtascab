import Image from 'next/image';
import logo from '/public/logo-w.png';

export default function Logo() {
	return (
		<div className="flex items-center gap-2 font-extrabold tracking-tighter text-2xl text-primary w-32]">
			<Image src={logo} alt="brandlogo ligtascab" height={24} width={24} />
			<p className="text-white">
				Ligtas<span className="text-secondary">cab.</span>
			</p>
		</div>
	);
}
