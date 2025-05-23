"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CustomDatePicker from "@/components/ui/custom-date-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/api/axiosInstance";
import { CustomerProps } from "@/types/customer-types";
import { avatarFallBack } from "@/utils/avatar-fallback";
import axios from "axios";
import { format, isSameDay } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import { AnimatedIconButton } from "../AnimatedIconButton";
import { SkeletonCustomersTable } from "./SkeletenCustomersTable";

interface CustomersTableProps {
  dashboard?: boolean;
  onViewCustomer?: (customer: CustomerProps) => void;
}

export function CustomersTable({
  dashboard = false,
  onViewCustomer,
}: CustomersTableProps) {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const [date, setDate] = useState<Date>(new Date());
  const [query, setQuery] = useState("");
  const [isClearFilterClicked, setIsClearFilterClicked] = useState(false);

  const filteredReservations = dashboard
    ? customers
    : customers.filter((customer) => {
        const matchesName = customer.fullName
          .toLowerCase()
          .includes(query.toLowerCase());

        const createdAtDate = customer.createdAt
          ? new Date(customer.createdAt)
          : null;

        const matchesDate =
          !isClearFilterClicked && date
            ? createdAtDate !== null && isSameDay(createdAtDate, date)
            : true;

        return matchesName && matchesDate;
      });

  useEffect(() => {
    setIsClearFilterClicked(true);
  }, []);

  useEffect(() => {
    setIsFetching(true);
    const getCustomers = async () => {
      try {
        const response = await api.get("/customers");
        setCustomers(response.data.data);
        console.log(response.data.data);
      } catch (err: unknown) {
        console.log("ERRRORRR", err);

        if (axios.isAxiosError<{ error: string }>(err)) {
          const message = err.response?.data.error || "Unexpected Error Occur";

          console.error("ERROR FETCHING CUSTOMERS", message);
        } else {
          console.error("Something went wrong. Please try again.");
        }
      } finally {
        setIsFetching(false);
      }
    };

    getCustomers();
  }, []);

  return (
    <>
      {/* Search Bar and Filters */}
      {!dashboard && (
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex flex-1 items-center gap-2 w-full">
            <div className="w-full">
              <SearchInput
                query={query}
                setQuery={setQuery}
                placeholderTitle="customers"
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
      )}
      {isFetching ? (
        <SkeletonCustomersTable />
      ) : (
        <div className="mt-8">
          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Registration Date</TableHead>
                  {!dashboard && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((customer) => (
                  <TableRow key={customer._id} className="gap-2">
                    <TableCell className="py-4">
                      <div className="flex gap-2 items-center">
                        <Avatar className="size-10">
                          <AvatarFallback>
                            {avatarFallBack(customer.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{customer.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {customer.contactNumber || "Not provided"}
                    </TableCell>
                    <TableCell>
                      {format(customer.createdAt!, "MMM d, yyyy")}
                    </TableCell>
                    {!dashboard && (
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <AnimatedIconButton
                            icon={Eye}
                            title="View Details"
                            className="group transition-all duration-300 hover:w-auto text-blue-500"
                            onClick={() => onViewCustomer!(customer)}
                          />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>{customers.length}</strong>{" "}
              of <strong>{customers.length}</strong> customers
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
