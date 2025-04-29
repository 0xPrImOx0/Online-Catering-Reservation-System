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
import { EyeIcon, User } from "lucide-react";
import clsx from "clsx";

export default function MiniCateringPackageCard({
  pkg,
  field,
}: {
  pkg: CateringPackagesProps;
  field: any;
}) {
  const [open, setOpenChange] = useState(false);

  return (
    <FormControl key={pkg._id} className="">
      <div>
        <Card
          onClick={() => field.onChange(pkg._id)}
          className={clsx(
            "flex-1 p-4 cursor-pointer border transition-all group hover:bg-gray-100 hover:border-green-500",
            { "border-green-500 bg-green-50": field.value === pkg._id }
          )}
        >
          <CardTitle>{pkg.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {pkg.description}
          </CardDescription>
          <CardFooter className="p-0 mt-5 flex justify-between items-center">
            <Button variant={"ghost"} size={"custom"}>
              <span
                className={clsx(
                  "flex gap-1 items-center border rounded-md px-2 py-1 border-green-500 transition-colors",

                  field.value === pkg._id
                    ? "bg-green-500 text-background "
                    : " group-hover:bg-green-500 group-hover:text-background text-muted-foreground"
                )}
              >
                <User className="" /> &#8369;
                {pkg.pricePerPax.toFixed(2)}/pax
              </span>
            </Button>
            <Button
              variant={"link"}
              size={"custom"}
              onClick={() => setOpenChange(true)}
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
