"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { useFormContext } from "react-hook-form";
import MiniCateringPackageCard from "./MiniCateringPackageCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import clsx from "clsx";
import { cateringPackages, options } from "@/lib/shared/packages-metadata";

interface PackageSelectionProps {
  showPackageSelection: boolean;
}

export default function PackageSelection({
  showPackageSelection,
}: PackageSelectionProps) {
  const { control } = useFormContext<ReservationValues>();

  return (
    <section>
      <div className="space-y-3">
        {!showPackageSelection && (
          <FormField
            control={control}
            name="cateringOptions"
            render={({ field }) => (
              <FormItem className="flex gap-4 space-y-0 max-sm:flex-col">
                {options.map((option) => (
                  <FormControl key={option.value} className="flex-1">
                    <Card
                      onClick={() => field.onChange(option.value)}
                      className={clsx(
                        "flex-1 cursor-pointer border-2 transition-all",
                        {
                          "border-green-500": field.value === option.value,
                        }
                      )}
                    >
                      <CardHeader className="p-0">
                        <Image
                          src={option.imageUrl}
                          alt={option.label}
                          width={200}
                          height={200}
                          className="object-cover w-full h-40 mb-2 rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent className="mt-4 space-y-2">
                        <CardTitle>{option.label}</CardTitle>
                        <CardDescription className="text-justify">
                          {option.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </FormControl>
                ))}
              </FormItem>
            )}
          />
        )}
        {/* <h3 className="text-base font-medium">Main Cuisine Packages</h3> */}
        {showPackageSelection && (
          <FormField
            control={control}
            name="selectedPackage"
            render={({ field }) => (
              <FormItem className="grid gap-4 space-y-0 md:grid-cols-2">
                {cateringPackages.map((pkg) => (
                  <MiniCateringPackageCard
                    pkg={pkg}
                    field={field}
                    key={pkg._id}
                  />
                ))}
              </FormItem>
            )}
          />
        )}
      </div>
    </section>
  );
}
