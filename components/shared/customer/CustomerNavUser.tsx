"use client";

import { ChevronDown, LogOut } from "lucide-react";

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
import { CustomerProps } from "@/types/customer-types";
import axios from "axios";
import { toast } from "sonner";
import { avatarFallBack } from "@/utils/avatar-fallback";
import { ThemeSwitchToggle } from "@/components/theme/theme-mode-1";
import { useAuthContext } from "@/contexts/AuthContext";
import api from "@/lib/api/axiosInstance";
import { registeredLinks } from "@/lib/customer/customer-nav-links";

type CustomerNavUserProps = {
  customer: CustomerProps;
};

export default function CustomerNavUser({ customer }: CustomerNavUserProps) {
  const { setCustomer } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await api.post("/auth/sign-out");

      setCustomer(null);
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
          variant="ghost"
          className="p-1 hover:bg-sidebar-accent-foreground/30 dark:hover:bg-sidebar-accent/30 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <>
            <Avatar className="realtive size-10 rounded-full">
              <AvatarImage
                src={customer.profileImage}
                alt={customer.fullName}
              />
              <AvatarFallback className="rounded-lg bg-[rgb(39,39,42)] hover:bg-sidebar-accent-foreground dark:hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent-foreground dark:data-[state=open]:bg-sidebar-accent text-white">
                {avatarFallBack(customer.fullName)}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="absolute bottom-2 right-3 rounded-full bg-background/85 text-foreground md:hidden" />
          </>
          <span className="font-medium max-md:hidden">{customer.fullName}</span>
          <ChevronDown className="max-md:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-10 rounded-full">
              <AvatarImage
                src={customer.profileImage}
                alt={customer.fullName}
              />
              <AvatarFallback className="rounded-lg">
                {avatarFallBack(customer.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{customer.fullName}</span>
              <span className="truncate text-xs">{customer.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {registeredLinks.map((data) => {
            const { title, href, Icon } = data;
            return (
              <DropdownMenuItem className="text-base" asChild key={title}>
                <Link href={href}>
                  <Icon />
                  {title}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ThemeSwitchToggle />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 m-1" onClick={handleSignOut}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
