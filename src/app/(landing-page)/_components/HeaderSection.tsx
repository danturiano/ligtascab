import DownloadBtn from "./DownloadBtn";

export default function HeaderSection() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center text-balance flex-col gap-8 px-4 container">
      <h1 className="font-extrabold text-center tracking-tighter leading-none text-5xl md:text-7xl xl:text-8xl">
        A Smarter Way to
        <div className="text-primary"> Commute with Ease.</div>
      </h1>
      <p className="text-lg md:text-2xl lg:text-2xl max-w-screen-xl text-pretty md:text-balance">
        Systemizing your daily travel by combining convenience, comfort, and
        efficiency for a stress-free journey every time.
      </p>
      <DownloadBtn />
    </section>
  );
}
