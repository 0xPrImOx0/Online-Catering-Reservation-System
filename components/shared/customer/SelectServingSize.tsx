import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MenuReservationDetails,
  paxArray,
  PaxArrayType,
  SelectServingSizeProps,
} from "@/types/reservation-types";
import {
  ReservationValues,
  useReservationForm,
} from "@/hooks/use-reservation-form";

export default function SelectServingSize({
  category,
  menu,
  value,
  onChange,
}: SelectServingSizeProps) {
  const { setValue } = useFormContext<ReservationValues>();
  const { getMenuItem } = useReservationForm();

  const currentCategory = value[category] || {};
  const paxSelected = value[category]?.[menu]?.paxSelected || "4-6 pax";
  const handlePaxChange = (newPax: PaxArrayType) => {
    const menuItem = getMenuItem(menu);
    if (!menuItem) return;

    const priceMap = {
      "4-6 pax": menuItem.prices[0].price ?? 0,
      "8-10 pax": menuItem.prices[1].price ?? 0,
      "13-15 pax": menuItem.prices[2].price ?? 0,
      "18-20 pax": menuItem.prices[3].price ?? 0,
    };

    const currentItem = currentCategory[menu] || {
      quantity: 0,
      paxSelected: paxSelected,
      pricePerPax: priceMap[paxSelected],
    };
    const updatedCategory: Record<string, MenuReservationDetails> = {
      ...currentCategory,
      [menu]: {
        ...currentItem,
        paxSelected: newPax,
        pricePerPax: priceMap[newPax],
      },
    };

    const updatedValue = {
      ...value,
      [category]: updatedCategory,
    };

    onChange(updatedValue);
    setValue(`selectedMenus.${category}.${menu}.paxSelected`, newPax);
  };

  return (
    <Select defaultValue={paxSelected} onValueChange={handlePaxChange}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Serving Size" />
      </SelectTrigger>
      <SelectContent>
        {paxArray.map((pax) => (
          <SelectItem value={pax} key={pax}>
            {pax}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
