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
import { useTheme } from "next-themes";

export default function CustomerSiteHeader() {
  const { customer } = useAuthContext(); // Temporary Basis if there is a user currently signed in
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery("(max-width: 1024px)");
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

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
                variant={`${
                  isDarkMode && isLargeScreen ? "none" : "secondary"
                }`}
                effect={`${isLargeScreen ? "none" : "hoverUnderline"}`}
                className="max-lg:bg-[rgb(39,39,42)] hover:bg-sidebar-accent-foreground max-md:rounded-full max-md:size-10 dark:hover:bg-sidebar-accent"
                asChild
              >
                <Link href={"/sign-in"}>
                  <User className="max-lg:text-white text-foreground" />
                  <p className="max-md:hidden max-lg:text-white text-foreground">
                    Sign In
                  </p>
                </Link>
              </Button>

              <Button
                variant={`${
                  isDarkMode && isLargeScreen ? "secondary" : "default"
                }`}
                className="max-md:bg-[rgb(39,39,42)] hover:bg-sidebar-accent-foreground max-md:rounded-full max-md:size-10 dark:hover:bg-sidebar-accent"
                asChild
              >
                <Link href="/book-now">
                  <Calendar className="max-lg:text-white text-background" />
                  <p className="max-md:hidden max-lg:text-white text-background">
                    Book Now
                  </p>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
