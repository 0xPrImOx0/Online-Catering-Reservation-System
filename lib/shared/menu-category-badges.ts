import { CategoryProps } from "@/types/menu-types";
import {
  Soup,
  Salad,
  Beef,
  HamIcon as Bacon,
  CookingPot as Noodles,
  BirdIcon as Chicken,
  Fish,
  CarrotIcon as Vegetable,
  Cake,
  Coffee,
  type LucideIcon,
  Utensils,
} from "lucide-react";

export function getCategoryIcon(category: CategoryProps): LucideIcon {
  const icons: Record<CategoryProps, LucideIcon> = {
    All: Utensils,
    Soup: Soup,
    Salad: Salad,
    Beef: Beef,
    Pork: Bacon,
    Noodle: Noodles,
    Chicken: Chicken,
    Seafood: Fish,
    Vegetable: Vegetable,
    Dessert: Cake,
    Beverage: Coffee,
  };

  return icons[category];
}
