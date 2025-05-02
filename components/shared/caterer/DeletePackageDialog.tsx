import { DeletePackageDialogProps } from "@/types/package-types";
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
import { Button } from "@/components/ui/button";
import api from "@/lib/axiosInstance";
import { toast } from "sonner";
import axios from "axios";

export default function DeletePackageDialog({
  item,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: DeletePackageDialogProps) {
  const handleDeletePackages = async () => {
    try {
      const response = await api.delete(`/packages/${item._id}`);

      toast.success(response?.data.message);
    } catch (err: unknown) {
      console.log("ERRORRRR IN DELETION", err);
      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected Error Occur";
        if (err.response?.status === 404) {
          toast.error(`Not Found: ${message}`);
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this dish?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              You are about to delete{" "}
              <span className="font-medium text-red-500">{item.name}</span>.
              This action cannot be undone.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button asChild variant={"destructive"} className="border-none">
            <AlertDialogAction onClick={handleDeletePackages}>
              Delete
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
