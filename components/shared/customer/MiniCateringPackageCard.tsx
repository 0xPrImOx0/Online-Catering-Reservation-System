import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { FormControl } from "@/components/ui/form";
import { CateringPackagesProps } from "@/types/package-types";
import React, { useState } from "react";
import PackageDetailsDialog from "./PackageDetailsDialog";
import { EyeIcon } from "lucide-react";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { ReservationValues } from "@/hooks/use-reservation-form";

export default function MiniCateringPackageCard({
  pkg,
  field,
}: {
  pkg: CateringPackagesProps;
  field: ControllerRenderProps<ReservationValues, "selectedPackage">;
}) {
  const [open, setOpenChange] = useState(false);

  return (
    <FormControl key={pkg._id}>
      <div>
        <Card
          onClick={() => field.onChange(pkg._id)}
          className={clsx(
            "flex flex-col flex-1 p-4 cursor-pointer border transition-all group hover:bg-muted-foreground/10 hover:border-green-500 h-full",
            {
              "border-green-500 bg-muted-foreground/10":
                field.value === pkg._id,
            }
          )}
        >
          <CardTitle className="text-base mb-2">{pkg.name}</CardTitle>
          <CardDescription className="line-clamp-3 mb-4 text-justify text-muted-foreground">
            {pkg.description}
          </CardDescription>
          <CardFooter className="relative bottom-0 p-0 mt-auto flex justify-between items-center">
            <Button variant={"ghost"} size={"custom"}>
              <span
                className={cn(
                  "flex gap-1 items-center border rounded-md px-2 py-1 border-green-500 transition-colors",

                  field.value === pkg._id
                    ? "bg-green-500 text-background"
                    : "group-hover:bg-green-500 group-hover:text-background text-foreground"
                )}
              >
                &#8369; {pkg.pricePerPax.toFixed(2)}/pax
              </span>
            </Button>
            <Button
              variant={"ghost"}
              effect={"shineHover"}
              onClick={() => setOpenChange(true)}
              className="-mr-2"
            >
              <EyeIcon />
              View Details
            </Button>
          </CardFooter>
        </Card>
        <PackageDetailsDialog
          pkg={pkg}
          open={open}
          onOpenChange={setOpenChange}
          isReservationForm
        />
      </div>
    </FormControl>
  );
}
