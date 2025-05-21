"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type {
  ReservationTableProps,
  ReservationItem,
} from "@/types/reservation-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReservationDialog from "./ReservationDialog";
import { avatarFallBack } from "@/utils/avatar-fallback";
import CustomDatePicker from "@/components/ui/custom-date-picker";
import SearchInput from "../SearchInput";
import api from "@/lib/api/axiosInstance";
import axios from "axios";

export default function ReservationTable({
  dashboard = false,
}: ReservationTableProps) {
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [reservations, setReservations] = useState<ReservationItem[]>([]);

  const openReservationDetails = (reservation: ReservationItem) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };

  const [date, setDate] = useState<Date>(new Date());
  const [query, setQuery] = useState("");
  const [isClearFilterClicked, setIsClearFilterClicked] = useState(false);

  const filteredReservations = dashboard
    ? reservations
    : reservations.filter((reservation) => {
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

  useEffect(() => {
    const getReservations = async () => {
      try {
        const response = await api.get("/reservations");
        setReservations(response.data.data);
        console.log(response.data.data);
      } catch (err: unknown) {
        console.log("ERRRORRR", err);

        if (axios.isAxiosError<{ error: string }>(err)) {
          const message = err.response?.data.error || "Unexpected Error Occur";

          console.error("ERROR FETCHING RESERVATIONS", message);
        } else {
          console.error("Something went wrong. Please try again.");
        }
      }
    };

    getReservations();
  }, []);

  return (
    <section className="space-y-10">
      {/* Search Bar and Filters */}
      {!dashboard && (
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
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Order Type</TableHead>
              <TableHead>Total Price</TableHead>
              {!dashboard && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.length > 0 ? (
              filteredReservations!.map((reservation) => (
                <TableRow key={reservation._id} className="gap-2">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-10">
                        <AvatarFallback>
                          {avatarFallBack(reservation.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {reservation.fullName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {reservation.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>
                        {format(
                          new Date(reservation.reservationDate),
                          "MMM d, yyyy"
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {reservation.reservationTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{reservation.guestCount}</TableCell>
                  <TableCell>{reservation.serviceType}</TableCell>
                  <TableCell>
                    {reservation.orderType ? (
                      reservation.orderType
                    ) : (
                      <span className="text-muted-foreground">
                        On-site Service
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    &#8369; {reservation.totalPrice.toLocaleString()}
                  </TableCell>
                  {!dashboard && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => openReservationDetails(reservation)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <div className="col-span-3 min-h-[50vh] flex justify-center items-center">
                    <span className="font-bold text-4xl">
                      No Reservations Found
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {selectedReservation && (
          <ReservationDialog
            selectedReservation={selectedReservation}
            setIsDetailsOpen={setIsDetailsOpen}
            isDetailsOpen={isDetailsOpen}
          />
        )}
      </div>
    </section>
  );
}
