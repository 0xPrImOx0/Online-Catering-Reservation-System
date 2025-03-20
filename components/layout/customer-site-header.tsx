"use client";
import Link from "next/link";
import Logo from "../icons/logo";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar, User } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import CustomerNavUser from "../shared/customer/CustomerNavUser";
import { links } from "@/lib/customer-links";

export default function CustomerSiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const pathname = usePathname();
  const user = {
    name: "Rey Daug",
    email: "m@example.com",
    avatar: "/daug-avatar.jpg",
  };
  const PageLink = ({ href, title }: { href: string; title: string }) => {
    return (
      <Link
        href={href}
        className={clsx(
          "text-sm font-medium relative pb-1 hover:text-foreground underline-offset-4 group"
        )}
      >
        {title}
        <span
          className={clsx(
            "absolute left-0 bottom-0 h-[2px] bg-foreground transition-all duration-300 ease-in-out",
            pathname === href ? "w-full" : "w-0 group-hover:w-full"
          )}
        />
      </Link>
    );
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex mx-[2%] items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Logo imageSize={40} />
          <nav className="hidden md:flex gap-10 flex-1 justify-center">
            {links.map((link) => (
              <PageLink key={link.title} title={link.title} href={link.href} />
            ))}
          </nav>
        </div>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <CustomerNavUser user={user} />
          ) : (
            <>
              <Link href={"/sign-in"}>
                <Button variant={"ghost"}>
                  <User /> Sign In
                </Button>
              </Link>
              <Button asChild>
                <Link href="/book-now">
                  <Calendar /> Book Now
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
