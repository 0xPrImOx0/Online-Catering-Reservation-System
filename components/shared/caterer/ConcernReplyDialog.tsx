import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConcernType } from "@/types/customer-types";
import { format } from "date-fns";

interface ConcernReplyDialogProps {
  concern: ConcernType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConcernReplyDialog({
  concern,
  isOpen,
  onOpenChange,
}: ConcernReplyDialogProps) {
  if (!concern) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reply to Concern</DialogTitle>
          <DialogDescription>
            Send a response to {concern.customerName}'s concern.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="rounded-md bg-muted p-4">
            <p className="text-sm">{concern.message}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Submitted on{" "}
              {format(concern.submittedAt, "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply">Your Reply</Label>
            <Textarea
              id="reply"
              placeholder="Type your response here..."
              className="min-h-[100px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="mark-resolved" />
            <Label htmlFor="mark-resolved">
              Mark as resolved after sending
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Send Reply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
