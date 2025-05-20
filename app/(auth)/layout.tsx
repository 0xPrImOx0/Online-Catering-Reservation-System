"use client";

import Logo from "@/components/icons/logo";
import ThemeMode from "@/components/theme/ThemeMode";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  ThemeMode: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route
  const isMobile = useIsMobile(); // Get the mobile state

  return (
    <>
      <div
        className={clsx(
          "absolute top-0 z-10 flex flex-row items-center justify-between gap-x-2 w-full",
          {
            "left-1/2 -translate-x-1/2": isMobile,
            "right-0 lg:w-1/2": pathname === "/sign-up",
            "left-0 lg:w-1/2": pathname === "/sign-in",
          }
        )}
      >
        <div className="ml-5">
          <Logo imageSize={50} />
        </div>
        <div className="mr-5">
          <ThemeMode />
        </div>
      </div>
      {children}
    </>
  );
}
