"use client";
import { Info, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function PlatedWarning() {
  const [closePlatedWarning, setClosePlatedWarning] = useState(false);

  return (
    <div
      className={cn(
        "relative bg-yellow-50 border-2 border-amber-400 rounded-lg flex flex-col gap-3 p-4",
        {
          hidden: closePlatedWarning,
        }
      )}
    >
      <div className="flex w-full relative justify-between items-start ">
        <div className="flex space-x-2">
          <Info className="w-6 relative text-yellow-500" />
          <h3 className="font-medium dark:text-background">
            Plated Course Service Fee
          </h3>
        </div>
        <Button
          className="text-muted-foreground"
          variant={"link"}
          size={"custom"}
          onClick={() => setClosePlatedWarning((prev) => !prev)}
        >
          <X className="min-w-5 min-h-5" />
        </Button>
      </div>
      <p className="text-sm text-foreground dark:text-background text-justify mx-8">
        Our plated course packages include professional waitstaff who will serve
        each course directly to your guests&apos; tables. An additional service
        fee of &#8369;100 per hour is included in the price per person.
      </p>
    </div>
  );
}
