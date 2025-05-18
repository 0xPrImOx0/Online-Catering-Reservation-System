"use client";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";
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
import { cn } from "@/lib/utils";
import api from "@/lib/api/axiosInstance";
import axios from "axios";
import { CateringPackagesProps } from "@/types/package-types";
import { useEffect, useState } from "react";
import { options } from "@/lib/shared/packages-metadata";

interface PackageSelectionProps {
  showPackageSelection: boolean;
  cateringOptions: "packages" | "menus";
  setCateringOptions: React.Dispatch<
    React.SetStateAction<"packages" | "menus">
  >;
}

export default function PackageSelection({
  showPackageSelection,
  cateringOptions,
  setCateringOptions,
}: PackageSelectionProps) {
  const { control } = useFormContext<ReservationValues>();

  const [cateringPackages, setCateringPackages] = useState<
    CateringPackagesProps[] | null
  >(null);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const response = await api.get("/packages");
        setCateringPackages(response.data.data);
      } catch (err: unknown) {
        console.log("ERRRORRR", err);

        if (axios.isAxiosError<{ error: string }>(err)) {
          const message = err.response?.data.error || "Unexpected Error Occur";

          console.error("ERROR FETCHING PACKAGES", message);
        } else {
          console.error("Something went wrong. Please try again.");
        }
      }
    };

    getPackages();
  }, []);

  return (
    <section>
      <div className="space-y-3">
        {!showPackageSelection && (
          <div className="flex gap-4 space-y-0 max-sm:flex-col">
            {options.map((option) => (
              <Card
                key={option.value}
                onClick={() =>
                  setCateringOptions(option.value as typeof cateringOptions)
                }
                className={cn("flex-1 cursor-pointer border-2 transition-all", {
                  "border-green-500": cateringOptions === option.value,
                })}
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
            ))}
          </div>
        )}

        {showPackageSelection && (
          <FormField
            control={control}
            name="selectedPackage"
            render={({ field }) => (
              <FormItem className="grid gap-4 space-y-0 md:grid-cols-2">
                {cateringPackages ? (
                  cateringPackages.map((pkg) => (
                    <MiniCateringPackageCard
                      pkg={pkg}
                      field={field}
                      key={pkg._id}
                    />
                  ))
                ) : (
                  <div className="col-span-3 min-h-[50vh] flex justify-center items-center">
                    <span className="font-bold text-4xl">
                      No Packages Found
                    </span>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </section>
  );
}
