"use client";

import ReservationTable from "@/components/shared/caterer/ReservationTable";
import MetricCards from "@/components/shared/MetricCards";
import { Button } from "@/components/ui/button";
import { reservations } from "@/lib/caterer/reservation-metadata";
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
    <main className="flex-1 overflow-auto space-y-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        {/* Metrics cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((metric) => (
            <MetricCards key={metric.title} metric={metric} />
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
        <ReservationTable reservations={reservations} dashboard />

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
