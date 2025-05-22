import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CustomerProps } from "@/types/customer-types";

interface CustomerViewDialogProps {
  customer: CustomerProps | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerViewDialog({
  customer,
  isOpen,
  onOpenChange,
}: CustomerViewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Customer Details
          </DialogTitle>
        </DialogHeader>
        {customer ? (
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="flex flex-col items-center gap-6 p-0">
              <Avatar className="w-24 h-24 border-4 border-primary">
                {customer.profileImage ? (
                  <AvatarImage
                    src={customer.profileImage}
                    alt={customer.fullName}
                  />
                ) : null}
                <AvatarFallback className="text-xl font-medium">
                  {customer.fullName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-1">
                <h2 className="text-xl font-semibold tracking-wide text-foreground">
                  {customer.fullName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {customer.email}
                </p>
              </div>
              <Separator className="my-2 w-full" />
              <div className="w-full text-sm space-y-3">
                {customer.contactNumber && (
                  <div className="flex justify-between">
                    <span className="font-medium text-muted-foreground">
                      Contact
                    </span>
                    <span className="text-foreground">
                      {customer.contactNumber}
                    </span>
                  </div>
                )}
                {customer.createdAt && (
                  <div className="flex justify-between">
                    <span className="font-medium text-muted-foreground">
                      Created
                    </span>
                    <span className="text-foreground">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {customer.updatedAt && (
                  <div className="flex justify-between">
                    <span className="font-medium text-muted-foreground">
                      Updated
                    </span>
                    <span className="text-foreground">
                      {new Date(customer.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-sm text-center text-muted-foreground">
            No customer selected.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
