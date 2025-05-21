"use client";

import { useState } from "react";
import { customers } from "../../../lib/caterer/customers-metadata";

// Import our custom components
import { CustomerMetricsCards } from "@/components/shared/caterer/CustomerMetricsCards";
import { CustomersTable } from "@/components/shared/caterer/CustomersTable";
import { CustomerViewDialog } from "@/components/shared/caterer/CustomerViewDialog";
import { CustomerEditDialog } from "@/components/shared/caterer/CustomerEditDialog";
import { CustomerDeleteDialog } from "@/components/shared/caterer/CustomerDeleteDialog";
import { CustomerProps } from "@/types/customer-types";

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerProps | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState<CustomerProps | null>(
    null
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Calculate metrics
  const totalCustomers = customers.length;
  const newCustomers = customers.filter((c) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return c.registrationDate >= thirtyDaysAgo;
  }).length;
  const retentionRate = 85; // Hardcoded for UI demo

  const viewCustomerDetails = (customer: CustomerProps) => {
    setSelectedCustomer(customer);
    setIsViewOpen(true);
  };

  const editCustomer = (customer: CustomerProps) => {
    setSelectedCustomer(customer);
    // setIsEditOpen(true);
  };

  const deleteCustomerPrompt = (customer: CustomerProps) => {
    setDeleteCustomer(customer);
    setIsDeleteOpen(true);
  };

  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
      </div>

      {/* Metrics cards */}
      <CustomerMetricsCards
        totalCustomers={totalCustomers}
        newCustomers={newCustomers}
        retentionRate={retentionRate}
      />

      {/* Customers Table Section */}
      <CustomersTable
        onViewCustomer={viewCustomerDetails}
        onEditCustomer={editCustomer}
        onDeleteCustomer={deleteCustomerPrompt}
      />

      {/* View Customer Details Dialog */}
      <CustomerViewDialog
        customer={selectedCustomer}
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        onEdit={editCustomer}
      />

      {/* Edit Customer Dialog */}
      {/* <CustomerEditDialog
        customer={selectedCustomer}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      /> */}

      {/* Delete Confirmation Dialog */}
      <CustomerDeleteDialog
        customer={deleteCustomer}
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </main>
  );
}
