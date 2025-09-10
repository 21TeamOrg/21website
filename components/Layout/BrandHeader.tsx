import Image from "next/image";

export default function BrandHeader() {
  return (
    <header className="w-full flex flex-col items-center bg-black/80 py-6 shadow-glow">
      <Image
        src="/images/logo.png"
        alt="Team 21 Logo"
        width={120}
        height={120}
        className="mb-2"
        priority
      />
      <Image
        src="/images/banner.png"
        alt="Team 21 Banner"
        width={800}
        height={200}
        className="rounded-xl shadow-glow"
        priority
      />
    </header>
  );
}
