import Image from "next/image";
import logo from "/public/logo.png";

export default function BrandLogo() {
  return (
    <div className="flex items-center gap-2 font-extrabold flex-shrink-0 tracking-tighter text-2xl text-primary">
      <Image src={logo} alt="brandlogo ligtascab" height={24} width={24} />
      <p>
        Ligtas<span className="text-secondary">cab.</span>
      </p>
    </div>
  );
}
