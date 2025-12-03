"use client";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/billy-paul-logo.svg"
        alt="Billy Paul Logo"
        width={141}
        height={30}
        className="h-7 w-auto"
        priority
      />
    </div>
  );
}

