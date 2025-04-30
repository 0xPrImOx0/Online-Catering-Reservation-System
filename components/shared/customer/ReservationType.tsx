import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventTypes } from "@/types/package-types";
export default function ReservationType({ control }: { control: any }) {
  return (
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
