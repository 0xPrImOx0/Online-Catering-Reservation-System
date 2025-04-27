"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "../StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import ReservationDialog from "./ReservationDialog";
import { useState } from "react";
import {
  ReservationTableProps,
  ReservationItem,
} from "@/types/reservation-types";

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
  // Define columns for TanStack Table
  const columns: ColumnDef<ReservationItem>[] = [
    {
      header: 'Customer',
      accessorKey: 'fullName',
      cell: info => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{info.row.original.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{info.row.original.fullName}</div>
            <div className="text-xs text-muted-foreground">{info.row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Date/Time',
      accessorKey: 'reservationDate',
      cell: info => (
        <div>
          <div>{format(new Date(info.row.original.reservationDate), "MMM d, yyyy")}</div>
          <div className="text-xs text-muted-foreground">{info.row.original.reservationTime} {info.row.original.period}</div>
        </div>
      ),
    },
    {
      header: 'Type',
      accessorKey: 'reservationType',
      cell: info => (
        <span className="capitalize">{info.row.original.reservationType}</span>
      ),
    },
    {
      header: 'Event',
      accessorKey: 'eventType',
      cell: info => (
        <span>{info.row.original.eventType || '-'}</span>
      ),
    },
    {
      header: 'Guests',
      accessorKey: 'guestCount',
      cell: info => <span>{info.row.original.guestCount}</span>,
    },
    {
      header: 'Venue',
      accessorKey: 'venue',
      cell: info => <span>{info.row.original.venue}</span>,
    },
    {
      header: 'Total Price',
      accessorKey: 'totalPrice',
      cell: info => <span>₱{info.row.original.totalPrice.toLocaleString()}</span>,
    },
    {
      header: 'Delivery',
      accessorKey: 'deliveryOption',
      cell: info => <span>{info.row.original.deliveryOption}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: info => <StatusBadge status={info.row.original.status} />, // You may want to adjust this if status is not present
    },
  ];

  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const currentDate = new Date(); // March 9, 2025

  const isUrgent = (eventDate: any) => {
    const diffTime = Math.abs(eventDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                dashboard && header.column.columnDef.header === "Actions" ? null : (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No reservations found.
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
