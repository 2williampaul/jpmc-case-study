"use client";
import Image from "next/image";

const imgBillyPaulLogo = "https://www.figma.com/api/mcp/asset/16d77fdb-f33f-4283-9b6f-a6c3af1c1223";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src={imgBillyPaulLogo}
        alt="Billy Paul Logo"
        width={141}
        height={30}
        className="h-7 w-auto"
        priority
      />
    </div>
  );
}

