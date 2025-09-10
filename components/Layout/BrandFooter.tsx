import Image from "next/image";

export default function BrandFooter() {
  return (
    <footer className="w-full flex flex-col items-center bg-black/90 py-6 mt-12 border-t-2 border-cyan-500">
      <Image
        src="/images/banner.png"
        alt="Team 21 Logo"
        width={60}
        height={60}
        className="mb-2"
      />
      <p className="text-cyan-400 font-bold">
        &copy; {new Date().getFullYear()} Team 21. All rights reserved.
      </p>
    </footer>
  );
}
