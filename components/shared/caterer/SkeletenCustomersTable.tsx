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

export function SkeletonCustomersTable() {
  const rows = 5; // Number of skeleton rows

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {["Name", "Email", "Phone", "Registration Date", "Actions"].map(
              (heading) => (
                <TableHead key={heading}>
                  <Skeleton className="h-5 w-24 rounded" />
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, i) => (
            <TableRow key={i}>
              {/* Name */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20 rounded my-6" />
                </div>
              </TableCell>

              {/* Email */}
              <TableCell>
                <Skeleton className="h-4 w-20 rounded mb-1" />
              </TableCell>

              {/* Phone */}
              <TableCell>
                <Skeleton className="h-4 w-20 rounded mb-1" />
              </TableCell>

              {/* Registration Date */}
              <TableCell>
                <Skeleton className="h-4 w-20 rounded" />
              </TableCell>

              {/* Actions */}
              <TableCell>
                <Skeleton className="h-4 w-24 rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
