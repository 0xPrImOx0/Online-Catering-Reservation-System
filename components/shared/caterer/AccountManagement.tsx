import React from "react";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AccountManagementProps = {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  handleDeleteAccount: () => void;
  isSubmitting: boolean;
};

export function AccountManagement({
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleDeleteAccount,
  isSubmitting,
}: AccountManagementProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Management</CardTitle>
        <CardDescription>
          Manage your account status and data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert
          variant="destructive"
          className="bg-amber-50 border-amber-200 text-amber-800"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Danger Zone</AlertTitle>
          <AlertDescription>
            Deleting your account will permanently remove all your data
            from our system. This action cannot be undone.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <p className="text-sm text-muted-foreground">
          Account created on:{" "}
          <span className="font-medium">January 15, 2023</span>
        </p>
        <Dialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete
                your account and remove all your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  All your catering listings, reservations, and customer
                  data will be permanently deleted.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="confirm-delete">
                  Type "DELETE" to confirm
                </Label>
                <Input id="confirm-delete" placeholder="DELETE" />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete Account"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
