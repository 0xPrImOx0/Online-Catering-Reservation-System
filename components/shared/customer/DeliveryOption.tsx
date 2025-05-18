"use client";

import { CardTitle, Card, CardDescription } from "@/components/ui/card";

import {
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { Control, useFormContext } from "react-hook-form";
import { ReservationValues } from "@/hooks/use-reservation-form";

export default function DeliveryOption({
  control,
}: {
  control: Control<ReservationValues>;
}) {
  const { setValue } = useFormContext<ReservationValues>();

  const handleDeliveryOption = () => {
    setValue("deliveryFee", 300);
  };

  const handlePickupOption = () => {
    setValue("deliveryFee", 0);
  };

  return (
    <FormField
      control={control}
      name="orderType"
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel className="">
            Order Type <span className="text-destructive">*</span>{" "}
          </FormLabel>
          <div className="flex gap-4 pt-2">
            <Card
              className={cn("flex cursor-pointer flex-1 flex-col gap-2 p-4", {
                "border-green-500": field.value === "Pickup",
              })}
              onClick={() => {
                field.onChange("Pickup");
                handlePickupOption();
              }}
            >
              <CardTitle>Pickup</CardTitle>
              <CardDescription>No delivery fee applied</CardDescription>
            </Card>
            <Card
              className={cn("flex cursor-pointer flex-1 flex-col gap-2 p-4", {
                "border-green-500": field.value === "Delivery",
              })}
              onClick={() => {
                field.onChange("Delivery");
                handleDeliveryOption();
              }}
            >
              <CardTitle>Delivery</CardTitle>
              <CardDescription>
                Additional delivery fee of ₱300 applied
              </CardDescription>
            </Card>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
