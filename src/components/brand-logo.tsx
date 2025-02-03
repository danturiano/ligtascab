import Image from 'next/image';
import logo1 from '/public/logo-try.svg';

export default function BrandLogo() {
	return (
		<div className="flex items-center gap-2 font-extrabold tracking-tighter text-[1.68rem] text-primary">
			<Image src={logo1} alt="brandlogo ligtascab" height={26} width={26} />
			<p className="font-nunito">ligtascab.</p>
		</div>
	);
}
