import Logo from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  businessMetadata,
  ownerMetadata,
} from "@/lib/caterer/business-metadata";
import { links } from "@/lib/customer/customer-links";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const FooterLinks = ({ href, title }: { href: string; title: string }) => {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {title}
      </Link>
    </li>
  );
};

export default function Page() {
  const { businessName, tagline, address, map } = businessMetadata;
  const { phone, email } = ownerMetadata;

  return (
    <footer className="flex justify-center w-full border-t bg-muted/50">
      <div className="container mx-4 sm:mx-6 lg:mx-8 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 sm:gap-14 lg:gap-12">
          <div className="space-y-4 flex flex-col items-center md:items-start text-center sm:text-left lg:w-[280px]">
            <Logo withLabel imageSize={100} />
            <p className="max-w-xs text-sm text-center text-muted-foreground md:text-justify">
              {tagline}
            </p>
          </div>
          <div className="flex flex-col items-center text-center sm:mt-0 md:items-start md:text-left lg:ml-20 xl:ml-10">
            <h3 className="mb-3 text-base font-medium sm:mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {links.map(({ href, title }) => (
                <FooterLinks href={href} title={title} key={href} />
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center text-center md:items-start sm:text-left">
            <h3 className="mb-3 text-base font-medium sm:mb-4">Contact</h3>
            <ul className="flex flex-col items-center space-y-3 text-sm text-center md:justify-start md:text-left">
              <li className="flex items-center text-muted-foreground sm:text-left md:self-start gap-2">
                <Phone className="flex-shrink-0 size-4" />
                <span>{phone}</span>
              </li>

              <li className="flex items-center text-muted-foreground sm:text-left md:self-start gap-2">
                <Mail className="flex-shrink-0 size-4" />
                <span>{email}</span>
              </li>

              <li className="flex items-center text-muted-foreground gap-2">
                <MapPin className="flex-shrink-0 size-4" />
                <Link
                  href={map.link}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-wrap text-justify"
                >
                  {address}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start text-center sm:text-left xl:w-[300px]">
            <h3 className="mb-3 text-base font-medium sm:mb-4">Newsletter</h3>
            <p className="mb-4 text-sm text-justify text-muted-foreground">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form className="flex flex-col xl:flex-row space-y-2 w-full sm:max-w-[450px] md:w-full">
              <Input
                placeholder="Your email"
                className="h-10 text-sm xl:mt-2"
              />
              <Button
                type="submit"
                size="default"
                className="h-10 text-sm xl:ml-2"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-4 justify-between items-center sm:flex-row">
          <p className="text-xs text-center text-muted-foreground sm:text-left">
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            <Link
              href="/terms"
              className="text-xs transition-colors text-muted-foreground hover:text-foreground"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-xs transition-colors text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
