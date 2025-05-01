import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerType } from "@/types/customer-types";
import { format } from "date-fns";
import Link from "next/link";

interface CustomerViewDialogProps {
  customer: CustomerType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (customer: CustomerType) => void;
}

export function CustomerViewDialog({
  customer,
  isOpen,
  onOpenChange,
  onEdit,
}: CustomerViewDialogProps) {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>
            {customer.id} - Registered on{" "}
            {format(customer.registrationDate, "MMM d, yyyy")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {customer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{customer.name}</h3>
              <p className="text-sm text-muted-foreground">{customer.email}</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Email:</span>
                  <span className="text-sm font-medium">{customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Phone:</span>
                  <span className="text-sm font-medium">{customer.phone}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                Customer Activity
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Reservations:</span>
                  <span className="text-sm font-medium">
                    {customer.totalReservations}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Spent:</span>
                  <span className="text-sm font-medium">
                    ${customer.totalSpent.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last Reservation:</span>
                  <span className="text-sm font-medium">
                    {format(customer.lastReservation, "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
              Recent Reservations
            </h4>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#RES238920483</TableCell>
                    <TableCell>
                      {format(customer.lastReservation, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>Wedding Package</TableCell>
                    <TableCell className="text-right">$2,580</TableCell>
                  </TableRow>
                  {customer.totalReservations > 1 && (
                    <TableRow>
                      <TableCell className="font-medium">#RES238920359</TableCell>
                      <TableCell>
                        {format(
                          new Date(
                            customer.lastReservation.getTime() -
                              7 * 24 * 60 * 60 * 1000
                          ),
                          "MMM d, yyyy"
                        )}
                      </TableCell>
                      <TableCell>Corporate Event</TableCell>
                      <TableCell className="text-right">$1,680</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline">Send Email</Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                onEdit(customer);
              }}
            >
              Edit Customer
            </Button>
            <Button variant="default">
              <Link
                href={`/reservations?customer=${customer.id}`}
                className="flex w-full"
              >
                View Reservations
              </Link>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
