import ReservationTable from "@/components/shared/caterer/ReservationTable";
import MetricCards from "@/components/shared/MetricCards";
import { Button } from "@/components/ui/button";
import { reservations } from "@/lib/caterer/reservation-metadata";
import { Calendar, LucideIcon, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import {
  concerns,
  metricCards,
  registeredCustomers,
} from "../../../lib/caterer/dashboard-metadata";
import RecentConcerns from "@/components/shared/caterer/RecentConcerns";
import RecentCustomers from "@/components/shared/caterer/RecentCustomers";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
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
        {/* Recent Registered Customers and Recent Concerns */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Recent Registered Customers */}
          <div>
            <RecentHeaders title="Customers" link="customers" Icon={Users} />
            <RecentCustomers registeredCustomers={registeredCustomers} />
          </div>

          {/* Recent Concerns */}
          <div>
            <RecentHeaders
              title="Concerns"
              link="customers"
              Icon={MessageSquare}
            />
            <RecentConcerns concerns={concerns} />
          </div>
        </div>
      </div>
    </main>
  );
}
