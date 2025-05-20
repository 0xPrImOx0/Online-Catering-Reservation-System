"use client";

import * as React from "react";
import {
  BarChart3,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Frame,
  Heart,
  Home,
  LifeBuoy,
  Map,
  MessageSquare,
  Package,
  PieChart,
  Search,
  Send,
  ShoppingBag,
  ShoppingCart,
  Star,
  User,
  Utensils,
} from "lucide-react";

import { NavMain } from "../../layout/nav-main";
import { NavSecondary } from "../../layout/nav-secondary";
import { NavUser } from "../../layout/caterer-nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "../../ui/sidebar";
import Logo from "@/components/icons/logo";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/daug-avatar.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      icon: Home,
      url: "/dashboard",
    },
    {
      title: "Account Management",
      icon: User,
      isActive: true,
      children: [
        { title: "Profile", icon: User, url: "/dashboard/profile" },
        {
          title: "Payment Information",
          icon: CreditCard,
          url: "/dashboard/payment",
        },
        {
          title: "Order History",
          icon: FileText,
          url: "/dashboard/order-history",
        },
        { title: "Favorites", icon: Heart, url: "/dashboard/favorites" },
      ],
    },
    {
      title: "Menu & Ordering",
      icon: Utensils,
      children: [
        { title: "Browse Menu", icon: Search, url: "/dashboard/menu" },
        {
          title: "Place Order",
          icon: ShoppingCart,
          url: "/dashboard/place-order",
        },
        {
          title: "Catering Packages",
          icon: Package,
          url: "/dashboard/packages",
        },
        {
          title: "Quotations & Pricing",
          icon: FileText,
          url: "/dashboard/quotations",
        },
      ],
    },
    {
      title: "Order Management",
      icon: ShoppingBag,
      children: [
        { title: "Track Orders", icon: Clock, url: "/dashboard/track-orders" },
        {
          title: "Feedback & Reviews",
          icon: MessageSquare,
          url: "/dashboard/feedback",
        },
      ],
    },
    {
      title: "Analytics",
      icon: BarChart3,
      children: [
        {
          title: "Order History Analytics",
          icon: Calendar,
          url: "/dashboard/order-analytics",
        },
        {
          title: "Favorites Analytics",
          icon: Star,
          url: "/dashboard/favorites-analytics",
        },
        {
          title: "Budget Overview",
          icon: BarChart3,
          url: "/dashboard/budget",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo withLabel={true} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
