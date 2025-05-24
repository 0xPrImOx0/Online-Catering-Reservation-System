"use client";

import CustomerReservationTable from "@/components/shared/customer/CustomerReservationTable";

export default function ReservationHistory() {
  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto my-10 min-h-[550px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
      </div>
      <CustomerReservationTable />
    </main>
  );
}
