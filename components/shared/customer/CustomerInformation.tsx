"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export default function CustomerInformation() {
  const { control } = useFormContext<ReservationValues>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Full Name Field */}
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Email <span className="text-destructive">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  defaultCountry="PH"
                  placeholder="+63 912 345 6789"
                  disableCountrySelect={true}
                  value={
                    parsePhoneNumberFromString(field.value || "", "PH")?.format(
                      "E.164"
                    ) || ""
                  }
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
