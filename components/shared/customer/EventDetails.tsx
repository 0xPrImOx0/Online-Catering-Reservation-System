"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LabelGroup from "../LabelGroup";
import { eventTypes, FormData } from "@/types/package-types";
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
import { BookNowProps } from "@/types/reservation-types";
import { useFormContext } from "react-hook-form";

export default function EventDetails() {
  const {
    control,
    formState: { isSubmitted },
  } = useFormContext<ReservationValues>();
  const hoursArray = ["4 hours", "5 hours", "6 hours", "8 hours", "10 hours"];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectTrigger>
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
              {isSubmitted && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="eventDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Date <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : field.value || ""
                  }
                />
              </FormControl>
              {isSubmitted && <FormMessage />}
            </FormItem>
          )}
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="guestCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Number of Guests <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter expected guests" {...field} />
              </FormControl>
              {isSubmitted && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Venue <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your event venue" {...field} />
              </FormControl>
              {isSubmitted && <FormMessage />}
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  defaultValue="Buffet"
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Buffet" id="buffet" />
                    <Label htmlFor="buffet">Buffet</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Plated" id="plated" />
                    <Label htmlFor="plated">Plated Service</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              {isSubmitted && <FormMessage />}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              {isSubmitted && <FormMessage />}
            </FormItem>
          )}
        />

        {/* <LabelGroup
          title="Service Hours"
          placeholder="Select service hours"
          type="select"
          selectData={hoursArray}
          value={formData.serviceHours}
          onChange={(value) =>
            handleFormChange("serviceHours", value as string)
          }
        /> */}
      </div>
    </div>
  );
}
