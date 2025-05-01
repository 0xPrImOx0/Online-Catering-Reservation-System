import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type StatusMessageProps = {
  type: "success" | "error" | null;
  message: string;
};

export function StatusMessage({ type, message }: StatusMessageProps) {
  if (!type || !message) return null;

  return (
    <Alert
      variant={type === "error" ? "destructive" : "default"}
      className={
        type === "success"
          ? "bg-[#E6F4EA] text-[#1E7E34] border-sidebar-accent-foreground mb-6"
          : "mb-6"
      }
    >
      {type === "success" ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertTitle>
        {type === "success" ? "Success" : "Error"}
      </AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
