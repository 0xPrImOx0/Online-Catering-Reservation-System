"use client";

import { useState } from "react";
import { PaymentMetricsCards } from "@/components/shared/caterer/PaymentMetricsCards";
import { PaymentFilters } from "@/components/shared/caterer/PaymentFilters";
import { PaymentTable } from "@/components/shared/caterer/PaymentTable";
import { PaymentDetailsDialog } from "@/components/shared/caterer/PaymentDetailsDialog";
import { MarkAsPaidDialog } from "@/components/shared/caterer/MarkAsPaidDialog";
import { PaymentType } from "@/types/component-types";
import { currentDate, payments } from "@/lib/caterer/payment-metadata";

export default function Page() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMarkPaidOpen, setIsMarkPaidOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCustomerType, setFilterCustomerType] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Calculate metrics
  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPayments = payments.length;
  const pendingPayments = payments.filter((p) => p.status === "Pending").length;

  const openPaymentDetails = (payment: PaymentType) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  const openMarkAsPaid = (payment: PaymentType) => {
    setSelectedPayment(payment);
    setIsMarkPaidOpen(true);
  };

  // Filter payments based on filters and search query
  const filteredPayments = payments.filter((payment) => {
    // Status filter
    if (
      filterStatus !== "all" &&
      payment.status.toLowerCase() !== filterStatus
    ) {
      return false;
    }

    // Customer type filter
    if (
      filterCustomerType !== "all" &&
      ((filterCustomerType === "registered" &&
        !payment.customer.isRegistered) ||
        (filterCustomerType === "guest" && payment.customer.isRegistered))
    ) {
      return false;
    }

    // Date range filter
    if (filterDateRange !== "all") {
      const thirtyDaysAgo = new Date(currentDate);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const ninetyDaysAgo = new Date(currentDate);
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      if (
        (filterDateRange === "30days" && payment.createdDate < thirtyDaysAgo) ||
        (filterDateRange === "90days" && payment.createdDate < ninetyDaysAgo)
      ) {
        return false;
      }
    }

    // Search query
    return (
      payment.reservationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort payments based on selected sort option
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        // Convert dates to timestamps for safe subtraction
        const dateB = b.paymentDate || b.createdDate;
        const dateA = a.paymentDate || a.createdDate;
        return dateB.getTime() - dateA.getTime();
      case "date-asc":
        const dateA2 = a.paymentDate || a.createdDate;
        const dateB2 = b.paymentDate || b.createdDate;
        return dateA2.getTime() - dateB2.getTime();
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      case "id-asc":
        return a.reservationId.localeCompare(b.reservationId);
      default:
        return 0;
    }
  });

  return (
    <div className="">
      <main className="overflow-auto flex-1">
        <PaymentFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterCustomerType={filterCustomerType}
          setFilterCustomerType={setFilterCustomerType}
          filterDateRange={filterDateRange}
          setFilterDateRange={setFilterDateRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <PaymentMetricsCards
          totalPaid={totalPaid}
          totalPending={totalPending}
          totalPayments={totalPayments}
          pendingPayments={pendingPayments}
        />

        <PaymentTable
          payments={sortedPayments}
          currentDate={currentDate}
          openPaymentDetails={openPaymentDetails}
          openMarkAsPaid={openMarkAsPaid}
        />
      </main>

      <PaymentDetailsDialog
        payment={selectedPayment}
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
        openMarkAsPaid={openMarkAsPaid}
      />

      <MarkAsPaidDialog
        payment={selectedPayment}
        isOpen={isMarkPaidOpen}
        setIsOpen={setIsMarkPaidOpen}
      />
    </div>
  );
}
