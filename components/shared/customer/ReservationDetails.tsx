"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
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
import WhatsTheOccasionCard from "./WhatsTheOccasionCard";
import ReservationType from "./ReservationType";
import ReservationDateAndTime from "./ReservationDateAndTime";
import DeliveryDetails from "./DeliveryDetails";
import DeliveryOption from "./DeliveryOption";
import { hoursArray } from "@/types/package-types";
import PlatedWarning from "../PlatedWarning";
import DeliveryWarning from "./DeliveryWarning";
import { useEffect } from "react";

export default function ReservationDetails() {
  const { control, getValues, watch, setValue } =
    useFormContext<ReservationValues>();
  const { getPackageItem } = useReservationForm();
  const reservationType = watch("reservationType");
  const cateringOptions = watch("cateringOptions");
  const selectedPackage = getValues("selectedPackage");
  const serviceType = watch("serviceType");
  const serviceHours = watch("serviceHours");
  const eventType = watch("eventType");
  const deliveryOption = watch("deliveryOption");
  const pkg = getPackageItem(selectedPackage);

  useEffect(() => {
    const hour = serviceHours?.slice(0, 2);
    setValue("serviceFee", 100 * Number(hour));
  }, [serviceHours]);

  const getRecommendedPax = () => {
    if (pkg) {
      return pkg.recommendedPax;
    }
    return 0;
  };
  useEffect(() => {
    if (pkg) {
      setValue("serviceHours", pkg.serviceHours.toString() + " hours");
      setValue("serviceFee", pkg.serviceHours);
    }
  }, [serviceType]);

  const recommendedPax = getRecommendedPax();

  return (
    <div className="space-y-4">
      <p>{getValues("serviceHours")}</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cateringOptions === "custom" && (
          <WhatsTheOccasionCard control={control} />
        )}
        {reservationType === "event" && eventType !== "No Event" && (
          <ReservationType control={control} />
        )}
        {reservationType === "event" && (
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
        )}
      </div>

      {reservationType === "event" && (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  Service Type <span className="text-destructive">*</span>{" "}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-2 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        onClick={() => {
                          setValue("serviceFee", 0);
                          setValue("serviceHours", "");
                        }}
                        value="Buffet"
                        id="buffet"
                      />
                      <Label htmlFor="buffet">Buffet</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Plated"
                        id="plated"
                        onClick={() => {
                          setValue("serviceFee", 100 * 4);
                          setValue("serviceHours", serviceHours);
                        }}
                      />
                      <Label htmlFor="plated">Plated Service</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {serviceType === "Plated" && (
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
                    defaultValue={field.value}
                    disabled
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
          )}
        </div>
      )}
      {!pkg && <PlatedWarning />}
      <Separator className="" />
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{deliveryOption} Details</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Please provide details about the{" "}
            {deliveryOption === "Delivery"
              ? "delivery location"
              : "pickup details"}{" "}
            and any special instructions for the{" "}
            {deliveryOption === "Delivery" ? "delivery team" : "catering team"}.
          </p>
          <DeliveryWarning isDelivery={deliveryOption === "Delivery"} />
        </div>
        <DeliveryOption control={control} />
        <ReservationDateAndTime
          control={control}
          deliveryOption={deliveryOption}
        />
        {deliveryOption === "Delivery" && <DeliveryDetails control={control} />}
      </div>
      <Separator />

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
