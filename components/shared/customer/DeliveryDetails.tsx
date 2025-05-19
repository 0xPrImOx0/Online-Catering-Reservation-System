import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReservationValues } from "@/hooks/use-reservation-form";
import { Control } from "react-hook-form";
export default function DeliveryDetails({
  control,
}: {
  control: Control<ReservationValues>;
}) {
  return (
    <div className="space-y-4 mt-4">
      <FormField
        control={control}
        name="deliveryAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Delivery Address</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your delivery address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="deliveryInstructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Delivery Instructions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Provide any special instructions for the delivery team (e.g., landmarks, preferred time, etc.)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
