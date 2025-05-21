"use client";

import MetricCards from "@/components/shared/MetricCards";
import { metricCards } from "@/lib/caterer/reservation-metadata";
import ReservationTable from "@/components/shared/caterer/ReservationTable";

// Current date for reference

export default function ReservationsPage() {
  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
      </div>

      {/* Metrics cards */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((metric) => (
          <MetricCards metric={metric} key={metric.title} />
        ))}
      </div>

      <ReservationTable />
    </main>
  );
}
