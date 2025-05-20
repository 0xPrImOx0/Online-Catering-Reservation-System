"use client";

import { AppSidebar } from "@/components/layout/dashboard-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthContext } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname(); // Get the current route
  const { customer } = useAuthContext();
  const router = useRouter();

  const isPackagePage = pathname.includes("/caterer/packages");

  // useEffect(() => {
  //   if (!customer) return toast.error("Authentication Required!");

  //   if (customer.role !== "caterer")
  // }, [customer]);
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider
        className="flex flex-col"
        open={open}
        onOpenChange={setOpen}
      >
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset
            className={`${isPackagePage ? "" : "overflow-x-hidden"}`}
          >
            <div className="flex flex-1 flex-col gap-4 py-8 px-[2%]">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
