"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Info, X } from "lucide-react";
import { useState } from "react";

export default function DeliveryWarning({
  isDelivery,
}: {
  isDelivery: boolean;
}) {
  const [closeWarning, setCloseWarning] = useState(false);

  return (
    <div
      className={clsx(
        "mb-4 p-4 bg-yellow-50 border-2 border-amber-400 rounded-lg flex items-start gap-3 relative",
        {
          hidden: closeWarning || !isDelivery,
        }
      )}
    >
      <Button
        className="absolute right-4 top-4 text-muted-foreground"
        variant={"ghost"}
        size={"custom"}
        onClick={() => setCloseWarning((prev) => !prev)}
      >
        <X className="min-w-5 min-h-5" />
      </Button>
      <Info className="w-20 sm:w-14 md:w-10 lg:w-6 relative text-yellow-500" />
      <div className="space-y-2">
        <h3 className="font-medium">Delivery Option</h3>
        <p className="text-sm text-foreground text-justify max-w-[1000px]">
          An additional delivery service fee of &#8369;300 is included in this option.
        </p>
      </div>
    </div>
  );
}
