"use client";

import ReservationTable from "@/components/shared/caterer/ReservationTable";
import MetricCards from "@/components/shared/MetricCards";
import { Button } from "@/components/ui/button";
import { dummyReservations } from "@/lib/caterer/reservation-metadata";
import { Calendar, LucideIcon, Users } from "lucide-react";
import Link from "next/link";
import { metricCards } from "../../../lib/caterer/dashboard-metadata";
import { CustomersTable } from "@/components/shared/caterer/CustomersTable";
import { customers } from "../../../lib/caterer/customers-metadata";
import { useState } from "react";

const RecentHeaders = ({
  title,
  Icon,
  link,
}: {
  title: string;
  Icon: LucideIcon;
  link: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon className="mr-2 h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">
          Recent {title === "Customers" ? "Registered Customers" : title}
        </h2>
      </div>
      <Button variant={"outline"} size={"sm"} asChild>
        <Link href={`/caterer/${link}`}>View All {title}</Link>
      </Button>
    </div>
  );
};

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        {/* Metrics cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((metric) => (
            <MetricCards metric={metric} key={metric.title} />
          ))}
        </div>
      </div>

      {/* Recent reservations table */}
      <div className="mt-8 space-y-6">
        <RecentHeaders
          title="Reservations"
          link="reservations"
          Icon={Calendar}
        />
        <ReservationTable reservations={dummyReservations} dashboard />

        {/* Recent Registered Customers */}
        <RecentHeaders title="Customers" link="customers" Icon={Users} />
        {/* Customers Table Section */}
        <CustomersTable
          customers={filteredCustomers}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          hasEditableButtons={false}
        />
      </div>
    </main>
  );
}
