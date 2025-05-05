import Image from "next/image";
import Link from "next/link";
import Navlink from "@/components/navbar/navlink";

const navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href="/">
          <Image src="/logo.png" width={128} height={49} alt="logo" priority />
        </Link>
        <Navlink />
      </div>
    </div>
  );
};

export default navbar;
