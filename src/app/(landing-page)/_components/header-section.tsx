import DownloadBtn from "./download-btn";

export default function HeaderSection() {
  return (
    <section className="min-h-screen flex items-center justify-center flex-col gap-8 px-4 container text-center -translate-y-6">
      <div className="font-semibold tracking-tight text-5xl md:text-7xl font-poppins">
        <h1>Providing a Safer</h1>
        <h1 className="text-primary">Commuting Experience.</h1>
      </div>
      <p className="text-lg font-poppins font-regular md:text-xl max-w-(--breakpoint-xl) text-pretty md:text-pretty md:max-w-[60ch] text-black/80">
        Systemizing your daily travel by combining convenience, comfort, and
        efficiency for a stress-free journey every time.
      </p>
      <DownloadBtn />
    </section>
  );
}
