"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import MetricCards from "@/components/shared/MetricCards";
import {
  dummyReservations,
  metricCards,
} from "@/lib/caterer/reservation-metadata";
import ReservationTable from "@/components/shared/caterer/ReservationTable";
import SearchInput from "@/components/shared/SearchInput";
import CustomDatePicker from "@/components/ui/custom-date-picker";
import { isSameDay } from "date-fns";

// Current date for reference

export default function ReservationsPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [query, setQuery] = useState("");
  const [isClearFilterClicked, setIsClearFilterClicked] = useState(false);

  const filteredReservations = dummyReservations.filter((reservation) => {
    const matchesName = reservation.fullName
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesDate =
      !isClearFilterClicked && date
        ? isSameDay(new Date(reservation.reservationDate), date)
        : true; // <== This allows all dates if `date` is undefined

    return matchesName && matchesDate;
  });

  useEffect(() => {
    setIsClearFilterClicked(true);
  }, []);

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
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex flex-1 items-center gap-2 w-full">
          <div className="w-full">
            <SearchInput
              query={query}
              setQuery={setQuery}
              placeholderTitle="reservations"
              iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4"
              inputStyle="pl-10 pr-10 h-10 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
            />
          </div>
          <div className="min-w-56">
            <CustomDatePicker
              date={date}
              setDate={(newDate) => {
                setDate(newDate); // set the selected date
                setIsClearFilterClicked(false); // mark as clicked
              }}
              customDateFormat="MMMM d, yyyy"
            />
          </div>
        </div>
        <Button
          variant="destructive"
          effect={"shineHover"}
          className="text-sm foreground hover:text-background"
          onClick={() => {
            setQuery("");
            setDate(new Date());
            setIsClearFilterClicked(true);
          }}
        >
          <Trash2 />
          Clear Filters
        </Button>
      </div>

      <ReservationTable reservations={filteredReservations} />

      {/* Tabs */}
      {/* <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Reservations</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <ReservationTable reservations={filteredReservations} />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          <ReservationTable reservations={filteredReservations} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <ReservationTable reservations={filteredReservations} />
        </TabsContent>
      </Tabs> */}

      {/* Pagination */}
      {/* <CustomPagination title={"reservations"} length={reservations.length} /> */}
    </main>
  );
}
