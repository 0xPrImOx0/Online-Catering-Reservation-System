"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "../icons/logo";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { links } from "@/lib/customer/customer-links";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuthContext } from "@/contexts/AuthContext";
import CustomerNavUser from "../shared/customer/CustomerNavUser";
import MobileRoutePage from "../shared/customer/MobileRoutePage";

export default function CustomerSiteHeader() {
  const { customer } = useAuthContext(); // Temporary Basis if there is a user currently signed in
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const PageLink = ({ href, title }: { href: string; title: string }) => {
    return (
      <Button
        variant={`${
          isLargeScreen ? (pathname === href ? "default" : "link") : "link"
        }`}
        effect={`${
          isLargeScreen
            ? "none"
            : pathname === href
            ? "underline"
            : "hoverUnderline"
        }`}
        className="after:bottom-0 after:border-b-2 after:border-foreground"
        asChild
      >
        <Link
          href={href}
          className={cn("text-base relative", {
            "!text-base": isLargeScreen,
          })}
        >
          {title}
        </Link>
      </Button>
    );
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="flex mx-[2%] items-center justify-between">
        <div className="relative flex flex-1 items-center">
          <Logo imageSize={50} withTitle={true} />
          <nav className={cn("flex gap-5 flex-1 justify-center max-lg:hidden")}>
            {links.map((link) => (
              <PageLink key={link.title} title={link.title} href={link.href} />
            ))}
          </nav>
        </div>
        <div className="flex gap-4">
          <MobileRoutePage />
          {customer ? (
            <CustomerNavUser customer={customer} />
          ) : (
            <div className="space-x-4">
              <Button
                variant={`${isMobile ? "none" : "secondary"}`}
                effect={`${isLargeScreen ? "none" : "hoverUnderline"}`}
                className="max-md:bg-[rgb(39,39,42)] max-md:rounded-full max-md:size-10"
                asChild
              >
                <Link href="/book-now">
                  <Calendar className="max-md:text-white" />
                  <p className="max-md:hidden text-foreground">Book Now</p>
                </Link>
              </Button>

              <Button
                variant={`${isLargeScreen ? "secondary" : "default"}`}
                className="max-lg:bg-[rgb(39,39,42)] max-md:rounded-full max-md:size-10 dark:hover:bg-[rgb(39,39,42)]"
                asChild
              >
                <Link href={"/sign-in"}>
                  <User className="max-lg:text-white" />
                  <p className="max-md:hidden max-lg:text-white">Sign In</p>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
