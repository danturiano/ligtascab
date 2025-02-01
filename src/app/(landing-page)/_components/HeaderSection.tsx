import DownloadBtn from './DownloadBtn';

export default function HeaderSection() {
	return (
		<section className="min-h-screen flex items-center justify-center flex-col gap-8 px-4 container text-center -translate-y-6">
			<div className="font-semibold tracking-tighter text-5xl md:text-7xl xl:text-8xl font-poppins">
				<h1>Safe and smart</h1>
				<h1>public transportation.</h1>
			</div>
			<p className="text-lg font-poppins font-regular md:text-2xl lg:text-2xl max-w-(--breakpoint-xl) text-pretty md:text-balance text-black/80">
				Systemizing your daily travel by combining convenience, comfort, and
				efficiency for a stress-free journey every time.
			</p>
			<DownloadBtn />
		</section>
	);
}
