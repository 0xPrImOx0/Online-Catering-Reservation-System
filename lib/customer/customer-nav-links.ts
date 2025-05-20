import {
  Boxes,
  ClipboardCheck,
  Home,
  LucideIcon,
  Phone,
  Settings,
  Users,
  UtensilsCrossed,
} from "lucide-react";

type CustomerLinks = {
  title: string;
  href: string;
  Icon: LucideIcon;
};

export const links: CustomerLinks[] = [
  {
    title: "Home",
    href: "/",
    Icon: Home,
  },
  {
    title: "Menus",
    href: "/menus",
    Icon: UtensilsCrossed,
  },
  {
    title: "Packages",
    href: "/packages",
    Icon: Boxes,
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    Icon: Phone,
  },
  {
    title: "About Us",
    href: "/about-us",
    Icon: Users,
  },
];

export const registeredLinks: CustomerLinks[] = [
  {
    title: "Book Now",
    href: "/book-now",
    Icon: ClipboardCheck,
  },
  {
    title: "Settings",
    href: "/settings",
    Icon: Settings,
  },
];
