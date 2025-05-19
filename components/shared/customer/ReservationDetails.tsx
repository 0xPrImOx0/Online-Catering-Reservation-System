"use client";

import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ReservationValues,
  useReservationForm,
} from "@/hooks/use-reservation-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import DeliveryDetails from "./DeliveryDetails";
import DeliveryOption from "./DeliveryOption";
import {
  CateringPackagesProps,
  eventTypes,
  hoursArray,
} from "@/types/package-types";
import PlatedWarning from "../PlatedWarning";
import DeliveryWarning from "./DeliveryWarning";
import { useEffect, useState } from "react";
import { HoursArrayTypes } from "@/types/reservation-types";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import CustomDateAndTime from "./ReservationDateAndTime";

export default function ReservationDetails() {
  const { control, getValues, watch, setValue, trigger } =
    useFormContext<ReservationValues>();
  const { getPackageItem } = useReservationForm();
  const selectedPackage = getValues("selectedPackage");
  const serviceType = watch("serviceType");
  const serviceHours = watch("serviceHours");
  const orderType = watch("orderType");
  const [pkg, setPkg] = useState<CateringPackagesProps | null>(null);

  useEffect(() => {
    if (!selectedPackage) {
      setPkg(null);
      return;
    }

    async function fetchPackage() {
      const packageData = await getPackageItem(selectedPackage!);
      setPkg(packageData);
    }

    fetchPackage();
  }, [selectedPackage]);

  const getRecommendedPax = () => {
    if (pkg) {
      return pkg.recommendedPax;
    }
    return 0;
  };

  useEffect(() => {
    if (pkg) {
      setValue(
        "serviceHours",
        (pkg.serviceHours.toString() + " hours") as HoursArrayTypes
      );
      setValue("serviceFee", pkg.serviceHours);
    }
  }, [serviceType, pkg, setValue]);

  const recommendedPax = getRecommendedPax();

  useEffect(() => {
    const venue = watch("venue");
    if (
      watch("serviceType") === "Plated" &&
      (!venue || venue.trim().length < 1)
    ) {
      trigger("venue");
    }
  }, [watch("serviceType"), watch("venue")]); // optional: add dependencies

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Event Type <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-md">
                    <SelectValue placeholder="Enter your event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {eventTypes.map((event) => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="guestCount"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="">
                Number of Guests <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter expected guests"
                  type="number"
                  {...field}
                  onChange={(e) => {
                    // Handle the 0 issue by replacing the value completely
                    const value = e.target.value;
                    if (value === "0" || value === "") {
                      field.onChange(0);
                    } else {
                      // Remove leading zeros and convert to number
                      field.onChange(Number(value.replace(/^0+/, "")));
                    }
                  }}
                  value={field.value || ""}
                />
              </FormControl>
              {fieldState.error ? (
                <FormMessage />
              ) : (
                recommendedPax > 0 && (
                  <span className="italic text-[0.8rem] font-medium text-muted-foreground">
                    *Recommended pax is {recommendedPax} persons
                  </span>
                )
              )}
            </FormItem>
          )}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="serviceType"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="">
                Service Type <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <Card
                    className={clsx(
                      "flex cursor-pointer flex-1 flex-col gap-2 p-4",
                      { "border-green-500": field.value === "Buffet" }
                    )}
                    onClick={() => {
                      setValue("serviceType", "Buffet");
                      setValue("orderType", "Pickup");
                      setValue("serviceFee", 0);
                      setValue("serviceHours", undefined);
                    }}
                  >
                    <CardTitle>Buffet</CardTitle>
                    <CardDescription>No service fee applied</CardDescription>
                  </Card>
                  <Card
                    className={clsx(
                      "flex cursor-pointer flex-1 flex-col gap-2 p-4",
                      { "border-green-500": field.value === "Plated" }
                    )}
                    onClick={() => {
                      setValue("serviceType", "Plated");
                      setValue("serviceFee", 100 * 4);
                      setValue("serviceHours", serviceHours);
                    }}
                  >
                    <CardTitle>Plated Service</CardTitle>
                    <CardDescription>
                      Additional service fee of &#8369; {100 * 4} applied
                    </CardDescription>
                  </Card>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!pkg && serviceType === "Plated" && (
          <div className="col-span-1 md:col-span-2">
            <PlatedWarning />
          </div>
        )}

        {serviceType === "Plated" && (
          <>
            <FormField
              control={control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">
                    Venue <span className="text-destructive">*</span>{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter venue location" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter venue details for our staff
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="serviceHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">
                    Service Hours <span className="text-destructive">*</span>{" "}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!!pkg}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service hours rendered" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hoursArray.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>

      {serviceType !== "Plated" && (
        <>
          <DeliveryOption control={control} />

          <Separator className="" />

          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{orderType} Details</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Please provide details about the{" "}
                {orderType === "Delivery"
                  ? "delivery location"
                  : "pickup details"}{" "}
                and any special instructions for the{" "}
                {orderType === "Delivery" ? "delivery team" : "catering team"}.
              </p>
              <DeliveryWarning isDelivery={orderType === "Delivery"} />
            </div>
            <CustomDateAndTime control={control} orderType={orderType} />
            {orderType === "Delivery" && <DeliveryDetails control={control} />}
          </div>
          <Separator />
        </>
      )}
      <div className="flex items-end justify-between">
        <Label>Total Bill</Label>
        <span className="text-2xl text-green-500 underline underline-offset-4">
          &#8369;{" "}
          {`${new Intl.NumberFormat("en-US").format(watch("totalPrice"))}.00`}
        </span>
      </div>
    </div>
  );
}
