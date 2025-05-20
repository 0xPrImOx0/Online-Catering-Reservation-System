"use client";

import { businessMetadata } from "@/lib/caterer/business-metadata";
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
  const { businessName, businessLogo, systemName } = businessMetadata;

  return (
    <Link
      href={isCaterer ? "/caterer/dashboard" : "/"}
      className={cn("flex items-center my-1 max-w-fit", {
        "mx-auto": pathname === "/about-us",
      })}
    >
      <div>
        <Image
          src={businessLogo}
          width={imageSize}
          height={imageSize}
          alt="Catering-Logo"
        />
      </div>
      <div>
        {withTitle && <span className="font-bold text-lg">{businessName}</span>}
        {withLabel && (
          <p className="text-muted-foreground text-xs italic font-light">
            {systemName}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;
