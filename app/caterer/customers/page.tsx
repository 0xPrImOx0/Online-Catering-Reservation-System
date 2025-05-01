"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { customers } from "../../../lib/caterer/customers-metadata";
import { CustomerType } from "@/types/customer-types";

// Import our custom components
import { CustomerMetricsCards } from "@/components/shared/caterer/CustomerMetricsCards";
import { CustomersTable } from "@/components/shared/caterer/CustomersTable";
import { CustomerViewDialog } from "@/components/shared/caterer/CustomerViewDialog";
import { CustomerEditDialog } from "@/components/shared/caterer/CustomerEditDialog";
import { CustomerDeleteDialog } from "@/components/shared/caterer/CustomerDeleteDialog";

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(
    null
  );
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState<CustomerType | null>(
    null
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate metrics
  const totalCustomers = customers.length;
  const newCustomers = customers.filter((c) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return c.registrationDate >= thirtyDaysAgo;
  }).length;
  const retentionRate = 85; // Hardcoded for UI demo

  const viewCustomerDetails = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setIsViewOpen(true);
  };

  const editCustomer = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const deleteCustomerPrompt = (customer: CustomerType) => {
    setDeleteCustomer(customer);
    setIsDeleteOpen(true);
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <main className="flex-1 overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Customer Management
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Metrics cards */}
      <CustomerMetricsCards
        totalCustomers={totalCustomers}
        newCustomers={newCustomers}
        retentionRate={retentionRate}
      />

      {/* Customers Table Section */}
      <CustomersTable
        customers={filteredCustomers}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
      <CustomerEditDialog
        customer={selectedCustomer}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* Delete Confirmation Dialog */}
      <CustomerDeleteDialog
        customer={deleteCustomer}
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </main>
  );
}
