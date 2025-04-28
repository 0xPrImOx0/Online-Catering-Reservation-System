"use client";

import { ChevronDown, LogOut, LucideIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { links, registeredLinks } from "@/lib/customer/customer-links";
import { CustomerProps } from "@/types/customer-types";
import axios from "axios";
import api from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { avatarFallBack } from "@/utils/avatar-fallback";
import { ThemeSwitchToggle } from "@/components/theme/theme-mode-1";

type DropdownLinkProps = {
  data: {
    title: string;
    href: string;
    Icon: LucideIcon;
  };
};

type CustomerNavUserProps = {
  customer: CustomerProps;
};

export default function CustomerNavUser({ customer }: CustomerNavUserProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const DropdownLink = ({ data }: DropdownLinkProps) => {
    const { title, href, Icon } = data;
    return (
      <DropdownMenuItem className="text-base" asChild key={title}>
        <Link href={href}>
          <Icon />
          {title}
        </Link>
      </DropdownMenuItem>
    );
  };

  const handleSignOut = async () => {
    try {
      await api.post("/auth/sign-out");

      // ✅ Tell AuthProvider to re-fetch customer
      window.dispatchEvent(new Event("refresh-customer"));
      router.replace("/");
      toast.success("Signed out successfully!");
    } catch (err: unknown) {
      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected Error Occur";
        console.error("Error Sign Out", message);
      }
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={isMobile ? "custom" : "landing"}
          className="data-[state=open]:bg-sidebar-accent p-1 data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={customer.profileImage} alt={customer.fullName} />
            <AvatarFallback className="rounded-lg">
              {avatarFallBack(customer.fullName)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate font-semibold max-md:hidden">
            {customer.fullName}
          </span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-sm:w-[90vw] sm:min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage
                src={customer.profileImage}
                alt={customer.fullName}
              />
              <AvatarFallback className="rounded-lg">
                {avatarFallBack(customer.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {customer.fullName}
              </span>
              <span className="truncate text-xs">{customer.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        {isMobile && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {links.map((data) => (
                <DropdownLink data={data} key={data.title} />
              ))}
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {registeredLinks.map((data) => (
            <DropdownLink data={data} key={data.title} />
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ThemeSwitchToggle />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive dark:text-red-500"
          asChild
        >
          <Link href="/" onClick={handleSignOut} className="text-base">
            <LogOut />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
