import CustomDatePicker from "@/components/ui/custom-date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { getYear } from "date-fns";
import { Control } from "react-hook-form";

export default function CustomDateAndTime({
  control,
  deliveryOption,
}: {
  control: Control<ReservationValues>;
  deliveryOption: "Delivery" | "Pickup";
}) {
  return (
    <section>
      <FormField
        control={control}
        name="reservationDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="my-1">
              {deliveryOption} Date <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <CustomDatePicker
                date={field.value || new Date()}
                setDate={(date) => field.onChange(date)}
                startYear={getYear(new Date())}
                endYear={getYear(new Date()) + 1}
                isPreviousMonthsUnselectable
                numberOfFutureDaysDisable={3}
                customDateFormat="MMMM d, yyyy"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
