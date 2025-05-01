import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import { PaymentType } from "@/types/component-types";

interface PaymentDetailsDialogProps {
  payment: PaymentType | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openMarkAsPaid: (payment: PaymentType) => void;
}

export function PaymentDetailsDialog({
  payment,
  isOpen,
  setIsOpen,
  openMarkAsPaid,
}: PaymentDetailsDialogProps) {
  if (!payment) return null;

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "Pending":
        return <Badge className="bg-red-100 text-red-800">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const isDueSoon = (payment: PaymentType) => {
    if (payment.status !== "Pending") return false;
    
    const currentDate = new Date();
    const diffTime = Math.abs(payment.reservation.eventDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            {payment.id} - {payment.reservationId}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Payment Information */}
          <div>
            <h3 className="mb-2 font-semibold">Payment Information</h3>
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span>{getPaymentStatusBadge(payment.status)}</span>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">
                    ${payment.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Payment Date:
                  </span>
                  <span>
                    {payment.paymentDate
                      ? format(payment.paymentDate, "MMMM d, yyyy")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Payment Method:
                  </span>
                  <span>{payment.paymentMethod || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Created Date:
                  </span>
                  <span>
                    {format(payment.createdDate, "MMMM d, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="mb-2 font-semibold">Customer Information</h3>
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {payment.customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {payment.customer.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {payment.customer.isRegistered
                      ? "Registered Customer"
                      : "Guest Order"}
                  </div>
                </div>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{payment.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{payment.customer.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="md:col-span-2">
            <h3 className="mb-2 font-semibold">Reservation Details</h3>
            <div className="rounded-lg border p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 text-sm font-medium">
                    Event Information
                  </div>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Event Date:
                      </span>
                      <span>
                        {format(
                          payment.reservation.eventDate,
                          "MMMM d, yyyy"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Address:
                      </span>
                      <span className="text-right">
                        {payment.reservation.address}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium">
                    Payment Status
                  </div>
                  <div className="grid gap-2 text-sm">
                    {payment.status === "Pending" ? (
                      <div className="rounded-md bg-red-50 p-2 text-center text-red-800">
                        <p className="font-medium">Payment Pending</p>
                        <p className="text-xs">
                          {isDueSoon(payment)
                            ? "Event is approaching soon. Payment required."
                            : "Payment has not been received yet."}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-md bg-green-50 p-2 text-center text-green-800">
                        <p className="font-medium">Payment Completed</p>
                        <p className="text-xs">
                          Paid on{" "}
                          {format(
                            payment.paymentDate!,
                            "MMMM d, yyyy"
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="md:col-span-2">
            <h3 className="mb-2 font-semibold">Order Items</h3>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payment.reservation.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ${(item.price / item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between border-t p-4">
                <span className="font-medium">Total</span>
                <span className="font-bold">
                  ${payment.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline">Download Receipt</Button>
            {payment.status === "Pending" && (
              <Button variant="outline">Send Reminder</Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Link
                href={`/reservations?id=${payment.reservationId}`}
                className="flex w-full"
              >
                View Reservation
              </Link>
            </Button>
            {payment.status === "Pending" && (
              <Button
                variant="default"
                onClick={() => {
                  setIsOpen(false);
                  openMarkAsPaid(payment);
                }}
              >
                Mark as Paid
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
