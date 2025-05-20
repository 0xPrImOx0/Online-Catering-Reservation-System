"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import MetricCards from "@/components/shared/MetricCards";
import {
  dummyReservations,
  metricCards,
  items,
} from "@/lib/caterer/reservation-metadata";
import ReservationTable from "@/components/shared/caterer/ReservationTable";
import DateSelector from "@/components/shared/DateSelector";
import SearchInput from "@/components/shared/SearchInput";
import CustomSelect from "@/components/shared/CustomSelect";
import { ReservationStatusType } from "@/types/reservation-types";

// Current date for reference

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ReservationStatusType | "All" | string>(
    "All"
  );
  const [customerType, setCustomerType] = useState<"All" | string>("All");

  // const filteredReservations = reservations.filter((reservation) => {
  //   return (
  //     reservation.fullName.toLowerCase().includes(query.toLowerCase()) &&
  //     (status === "All" || reservation.status === status)
  //   );
  // });
  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
        <div className="flex items-center">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Add New Reservation
          </Button>
        </div>
      </div>

      {/* Metrics cards */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((metric) => (
          <MetricCards metric={metric} key={metric.title} />
        ))}
      </div>

      {/* Search Bar and Filters */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2">
          <SearchInput
            query={query}
            setQuery={setQuery}
            placeholderTitle="reservations"
          />
          <DateSelector date={date} setDate={setDate} />
        </div>
        <div className="flex items-center gap-2">
          <CustomSelect
            defaultValue="All"
            placeholder="Status"
            items={items.status}
            value={status}
            onValueChange={setStatus}
          />
          <CustomSelect
            defaultValue="All"
            placeholder="Customer Type"
            items={items.customerType}
            value={customerType}
            onValueChange={setCustomerType}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Reservations</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {/*All Reservations table */}
          <ReservationTable reservations={dummyReservations} />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          {/* Upcoming reservations would be shown here */}
          <ReservationTable reservations={dummyReservations} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {/* Past reservations would be shown here */}
          <ReservationTable reservations={dummyReservations} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {/* <CustomPagination title={"reservations"} length={reservations.length} /> */}
    </main>
  );
}
