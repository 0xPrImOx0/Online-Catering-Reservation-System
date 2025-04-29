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
} from "@tanstack/react-table";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

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
      header: "Customer",
      accessorKey: "fullName",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback>
              {info.row.original.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{info.row.original.fullName}</div>
            <div className="text-xs text-muted-foreground">
              {info.row.original.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Date/Time",
      accessorKey: "reservationDate",
      cell: (info) => (
        <div>
          <div>
            {format(new Date(info.row.original.reservationDate), "MMM d, yyyy")}
          </div>
          <div className="text-xs text-muted-foreground">
            {info.row.original.reservationTime} {info.row.original.period}
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      accessorKey: "reservationType",
      cell: (info) => (
        <span className="capitalize">{info.row.original.reservationType}</span>
      ),
    },
    {
      header: "Guests",
      accessorKey: "guestCount",
      cell: (info) => <span>{info.row.original.guestCount}</span>,
    },
    {
      header: "Venue",
      accessorKey: "venue",
      cell: (info) => <span>{info.row.original.venue}</span>,
    },
    {
      header: "Total Price",
      accessorKey: "totalPrice",
      cell: (info) => (
        <span>₱{info.row.original.totalPrice.toLocaleString()}</span>
      ),
    },
    {
      header: "Delivery",
      accessorKey: "deliveryOption",
      cell: (info) => <span>{info.row.original.deliveryOption}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => {
        const [showDialog, setShowDialog] = useState(false);
        const router = useRouter();
        const [currentRow, setCurrentRow] = useState<ReservationItem | null>(
          null
        );

        return (
          <>
            <StatusBadge
              status={info.row.original.status}
              onClick={() => {
                if (!dashboard) {
                  setCurrentRow(info.row.original);
                  setShowDialog(true);
                } else {
                  router.push(`/caterer/reservations`);
                }
              }}
            />

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Payment Status</DialogTitle>
                  <DialogDescription>
                    Has the payment for this reservation been received?
                  </DialogDescription>
                </DialogHeader>
                <div className="border border-gray-200 rounded-lg p-4 mx-auto mb-4">
                  <Skeleton className="w-60 h-60" />
                  <Label className="">
                    GCash Reference Number{" "}
                    <span className="text-destructive">*</span>{" "}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    09890-0879-9897
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      // Handle payment confirmation logic here
                      // Update the status to "paid" or "confirmed"
                      setShowDialog(false);
                    }}
                  >
                    Confirm Payment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        );
      },
    },
    {
      header: "Actions",
      cell: (info) => (
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
              onClick={() => openReservationDetails(info.row.original)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const currentDate = new Date();

  const isUrgent = (eventDate: any) => {
    const diffTime = Math.abs(eventDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) =>
                dashboard &&
                header.column.columnDef.header === "Actions" ? null : (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                )
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table
              .getRowModel()
              .rows.map((row) => (
                <TableRow key={row.id}>
                  {row
                    .getVisibleCells()
                    .map((cell) =>
                      dashboard &&
                      cell.column.columnDef.header === "Actions" ? null : (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    )}
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
