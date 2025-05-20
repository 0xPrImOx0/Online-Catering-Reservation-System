import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Check, Eye, MoreHorizontal } from "lucide-react";
import { PaymentType } from "@/types/component-types";

interface PaymentTableProps {
  payments: PaymentType[];
  currentDate: Date;
  openPaymentDetails: (payment: PaymentType) => void;
  openMarkAsPaid: (payment: PaymentType) => void;
}

export function PaymentTable({
  payments,
  currentDate,
  openPaymentDetails,
  openMarkAsPaid,
}: PaymentTableProps) {
  // Check if payment is overdue or due soon
  const isOverdue = (payment: PaymentType) => {
    if (payment.status !== "Pending") return false;

    const diffTime = Math.abs(currentDate.getTime() - payment.createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 3;
  };

  const isDueSoon = (payment: PaymentType) => {
    if (payment.status !== "Pending") return false;

    const diffTime = Math.abs(payment.reservation.eventDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="text-green-800 bg-green-100">Paid</Badge>;
      case "Pending":
        return <Badge className="text-red-800 bg-red-100">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reservation ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow
                key={payment.id}
                className={cn(
                  isOverdue(payment)
                    ? "bg-red-50 border-l-4 border-l-red-500"
                    : "",
                  isDueSoon(payment) && !isOverdue(payment)
                    ? "bg-yellow-50 border-l-4 border-l-yellow-500"
                    : ""
                )}
              >
                <TableCell className="font-medium">
                  {payment.reservationId}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>
                        {payment.customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {payment.customer.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {payment.customer.isRegistered
                          ? "Registered"
                          : "Guest"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>${payment.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {getPaymentStatusBadge(payment.status)}
                    {isOverdue(payment) && (
                      <Badge
                        variant="outline"
                        className="text-red-800 bg-red-100"
                      >
                        Overdue
                      </Badge>
                    )}
                    {isDueSoon(payment) && !isOverdue(payment) && (
                      <Badge
                        variant="outline"
                        className="text-yellow-800 bg-yellow-100"
                      >
                        Due Soon
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {payment.paymentDate
                    ? format(payment.paymentDate, "MMM d, yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <div>
                    {format(payment.reservation.eventDate, "MMM d, yyyy")}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openPaymentDetails(payment)}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                    {payment.status === "Pending" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex gap-1 items-center"
                        onClick={() => openMarkAsPaid(payment)}
                      >
                        <Check className="w-3 h-3" />
                        Mark as Paid
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Reservation</DropdownMenuItem>
                        <DropdownMenuItem>
                          Send Payment Reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to{" "}
          <strong>{payments.length}</strong> of{" "}
          <strong>{payments.length}</strong> payments
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
    </>
  );
}
