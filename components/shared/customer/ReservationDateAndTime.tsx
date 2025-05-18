import CustomDatePicker from "@/components/ui/custom-date-picker";
import { TimePicker } from "@/components/ui/custom-time-picker";
import {
  FormControl,
  FormDescription,
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
  orderType,
}: {
  control: Control<ReservationValues>;
  orderType: "Delivery" | "Pickup" | "";
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <FormField
          control={control}
          name="reservationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="my-1">
                {orderType} Date <span className="text-destructive">*</span>
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
              <FormDescription>
                We can&apos;t accept rush order the earlist booking is 3 days
                after
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <div className="flex gap-4 items-end">
          <FormField
            control={control}
            name="reservationTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="">
                  {orderType} Time <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl className="">
                  <TimePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  Food Sentinel can only offer {orderType} service from 8:00 AM
                  to 5:00 PM
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
}
