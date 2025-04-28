"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type LogoProps = {
  withLabel?: boolean;
  imageSize?: number;
  withTitle?: boolean;
};

const Logo = ({
  withLabel = false,
  imageSize = 50,
  withTitle = true,
}: LogoProps) => {
  const pathname = usePathname();
  const isCaterer = pathname.includes("/caterer");

  return (
    <Link
      href={isCaterer ? "/caterer/dashboard" : "/"}
      className={cn("flex items-center my-1 max-w-fit", {
        "mx-auto": pathname === "/about-us",
      })}
    >
      <div>
        <Image
          src="/catering-logo.png"
          width={imageSize}
          height={imageSize}
          alt="Catering-Logo"
        />
      </div>
      <div>
        {withTitle && <span className="font-bold text-lg">Food Sentinel</span>}
        {withLabel && (
          <p className="font-light italic text-xs text-muted-foreground">
            Catering Reservation System
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;
