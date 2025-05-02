import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CustomerType } from "@/types/customer-types";

interface CustomerDeleteDialogProps {
  customer: CustomerType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerDeleteDialog({
  customer,
  isOpen,
  onOpenChange,
}: CustomerDeleteDialogProps) {
  if (!customer) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the customer "{customer.name}" and all
            associated data.
            {customer.totalReservations > 0 && (
              <span className="block mt-2 font-medium text-destructive">
                Warning: This customer has {customer.totalReservations}{" "}
                reservations. Deleting this customer may affect existing
                reservation records.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground">
            Delete Customer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
