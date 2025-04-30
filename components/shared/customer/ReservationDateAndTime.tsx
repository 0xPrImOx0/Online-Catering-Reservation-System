"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { useFormContext } from "react-hook-form";
import { withMask } from "use-mask-input";

import { useId } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function EventDate({
  control,
  deliveryOption,
}: {
  control: any;
  deliveryOption: "Delivery" | "Pickup";
}) {
  const toOrOf = deliveryOption === "Delivery" ? "of" : "to";
  const {
    formState: { errors },
  } = useFormContext<ReservationValues>();
  const id = useId();
  return (
    <div className="flex gap-4 mt-4">
      <FormField
        control={control}
        name="reservationDate"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="">
              Date {toOrOf} {deliveryOption}
              <span className="text-destructive">*</span>{" "}
            </FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={id}
                    variant={"outline"}
                    className={cn(
                      "group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "truncate",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value instanceof Date
                        ? format(field.value, "PPP")
                        : "Pick a date"}
                    </span>
                    <CalendarIcon
                      size={16}
                      className="transition-colors text-muted-foreground/80 group-hover:text-foreground shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 w-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex-1">
        <div className="flex gap-4 items-end">
          <FormField
            control={control}
            name="reservationTime"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">
                  Time {toOrOf} {deliveryOption}{" "}
                  <span className="text-destructive">*</span>{" "}
                </FormLabel>
                <FormControl className="">
                  <Input
                    type="text"
                    placeholder="00:00"
                    className=""
                    {...field}
                    ref={withMask("99:99", {
                      placeholder: "-",
                      showMaskOnHover: false,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="period"
            render={({ field }) => (
              <FormItem className="">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service hours rendered" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["A.M.", "P.M."].map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        {errors.reservationTime && (
          <span className="text-sm text-destructive">
            {errors.reservationTime.message}
          </span>
        )}
      </div>
    </div>
  );
}
