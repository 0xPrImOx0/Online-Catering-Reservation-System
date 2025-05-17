import CustomDatePicker from "@/components/ui/custom-date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { getYear } from "date-fns";
import { Control, useFormContext } from "react-hook-form";
import { withMask } from "use-mask-input";

export default function CustomDateAndTime({
  control,
  deliveryOption,
}: {
  control: Control<ReservationValues>;
  deliveryOption: "Delivery" | "Pickup";
}) {
  const {
    formState: { errors },
  } = useFormContext<ReservationValues>();
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <FormField
          control={control}
          name="reservationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="my-1">
                {deliveryOption} Date{" "}
                <span className="text-destructive">*</span>
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
      </div>
      <div>
        <div className="flex gap-4 items-end">
          <FormField
            control={control}
            name="reservationTime"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">
                  {deliveryOption} Time{" "}
                  <span className="text-destructive">*</span>
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
        </div>
        {errors.reservationTime && (
          <span className="text-sm text-destructive">
            {errors.reservationTime.message}
          </span>
        )}
      </div>
    </section>
  );
}
