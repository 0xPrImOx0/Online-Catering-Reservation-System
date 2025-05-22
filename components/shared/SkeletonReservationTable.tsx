"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonReservationTable() {
  const rows = 5; // Number of skeleton rows

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "Customer",
              "Date/Time",
              "Guests",
              "Service Type",
              "Order Type",
              "Total Price",
              "Actions",
            ].map((heading) => (
              <TableHead key={heading}>
                <Skeleton className="h-5 w-24 rounded" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, i) => (
            <TableRow key={i}>
              {/* Customer with avatar + text */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              </TableCell>

              {/* Date/Time */}
              <TableCell>
                <Skeleton className="h-4 w-20 rounded mb-1" />
                <Skeleton className="h-3 w-16 rounded" />
              </TableCell>

              {/* Guests */}
              <TableCell>
                <Skeleton className="h-4 w-8 rounded" />
              </TableCell>

              {/* Service Type */}
              <TableCell>
                <Skeleton className="h-4 w-20 rounded" />
              </TableCell>

              {/* Order Type */}
              <TableCell>
                <Skeleton className="h-4 w-24 rounded" />
              </TableCell>

              {/* Total Price */}
              <TableCell>
                <Skeleton className="h-4 w-16 rounded" />
              </TableCell>

              {/* Actions */}
              <TableCell>
                <Skeleton className="h-8 w-8 rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
