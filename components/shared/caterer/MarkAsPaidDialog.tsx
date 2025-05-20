import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { PaymentType } from "@/types/component-types";

interface MarkAsPaidDialogProps {
  payment: PaymentType | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MarkAsPaidDialog({
  payment,
  isOpen,
  setIsOpen,
}: MarkAsPaidDialogProps) {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [notes, setNotes] = useState("");

  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mark Payment as Paid</DialogTitle>
          <DialogDescription>
            Update the payment status for {payment.reservationId} to
            &quot;Paid&quot;.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label htmlFor="payment-date" className="text-right">
              Payment Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="payment-date"
                  variant="outline"
                  className="col-span-3 justify-start font-normal text-left"
                >
                  <CalendarIcon className="mr-2 w-4 h-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label htmlFor="payment-method" className="text-right">
              Payment Method
            </Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment-method" className="col-span-3">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="check">Check</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label htmlFor="payment-notes" className="text-right">
              Notes
            </Label>
            <Input
              id="payment-notes"
              placeholder="Optional payment notes"
              className="col-span-3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirm Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
