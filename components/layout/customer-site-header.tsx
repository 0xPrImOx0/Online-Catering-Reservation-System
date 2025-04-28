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
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const PageLink = ({ href, title }: { href: string; title: string }) => {
    return (
      <Button
        variant={`${
          isMobile ? (pathname === href ? "default" : "link") : "link"
        }`}
        effect={`${
          isMobile ? "none" : pathname === href ? "underline" : "hoverUnderline"
        }`}
        className="after:bottom-0 after:border-b-2 after:border-foreground"
        asChild
      >
        <Link
          href={href}
          className={cn("text-base relative", {
            "!text-base": isMobile,
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
          {!isMobile && (
            <nav className={cn("flex gap-5 flex-1 justify-center")}>
              {links.map((link) => (
                <PageLink
                  key={link.title}
                  title={link.title}
                  href={link.href}
                />
              ))}
            </nav>
          )}
        </div>
        <div className="flex gap-4">
          {customer ? (
            <>
              <MobileRoutePage />
              <CustomerNavUser customer={customer} />
            </>
          ) : (
            <div className="space-x-4">
              <Button
                variant={"link"}
                effect={"hoverUnderline"}
                className="max-md:bg-[rgb(39,39,42)] max-md:rounded-full max-md:size-10"
                asChild
              >
                <Link href="/book-now">
                  <Calendar className="max-md:text-white" />
                  <p className="max-md:hidden">Book Now</p>
                </Link>
              </Button>

              {/* Page Routes */}
              <MobileRoutePage />

              <Button
                className="max-md:bg-[rgb(39,39,42)] max-md:rounded-full max-md:size-10"
                asChild
              >
                <Link href={"/sign-in"}>
                  <User className="max-md:text-white" />
                  <p className="max-md:hidden">Sign In</p>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
