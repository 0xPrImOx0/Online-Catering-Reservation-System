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
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
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

export default function ReservationTable({
  reservations,
  dashboard = false,
}: ReservationTableProps) {
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openReservationDetails = (reservation: ReservationItem) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };

  return (
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
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <TableRow key={reservation.id} className="gap-2">
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-10">
                      <AvatarFallback>
                        {avatarFallBack(reservation.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{reservation.fullName}</div>
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
  );
}
