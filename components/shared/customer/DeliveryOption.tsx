import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { Control } from "react-hook-form";

export default function DeliveryOption({
  control,
}: {
  control: Control<ReservationValues>;
}) {
  const { watch, setValue } = useFormContext<ReservationValues>();
  const deliveryFee = watch("deliveryFee");

  const handleDeliveryOption = () => {
    setValue("deliveryFee", 300);
  };
  const handlePickupOption = () => {
    setValue("deliveryFee", deliveryFee - 300);
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
              className={clsx("flex cursor-pointer flex-1 flex-col gap-2 p-4", {
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
              className={clsx("flex cursor-pointer flex-1 flex-col gap-2 p-4", {
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
