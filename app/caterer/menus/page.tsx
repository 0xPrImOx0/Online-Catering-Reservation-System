"use client";

import HeaderWithAddButton from "@/components/shared/caterer/HeaderWithAddButton";
import { AddMenuDialog } from "@/components/shared/caterer/AddMenuForm";
import PaginatedMenus from "@/components/shared/customer/PaginatedMenus";
import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
export default function Page() {
  // State responsible for opening/closing the dialogs for dialog visibility
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const { open } = useSidebar();

  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto">
      <HeaderWithAddButton
        title="Menus"
        setIsAddInstanceOpen={setIsAddMenuOpen}
      />

      <div className="relative w-full mx-auto py-2">
        <PaginatedMenus open={open} />
      </div>

      <AddMenuDialog
        isAddMenuOpen={isAddMenuOpen}
        setIsAddMenuOpen={setIsAddMenuOpen}
      />
    </main>
  );
}
