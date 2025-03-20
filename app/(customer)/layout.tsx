import CustomerSiteHeader from "@/components/layout/customer-site-header";
import Footer from "@/components/shared/customer/Footer";
import React from "react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CustomerSiteHeader />
      <main className="max-w-[1440px] mx-auto px-[2%]">{children}</main>
      <Footer />
    </div>
  );
}
