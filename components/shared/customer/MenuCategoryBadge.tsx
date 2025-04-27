import { Badge } from "@/components/ui/badge";
import { getCategoryIcon } from "@/lib/menu-category-badges";
import { CategoryBadgeProps, CategoryProps } from "@/types/menu-types";

// Directly define colors based on category
export const getColorClasses = (category: CategoryProps) => {
  switch (category) {
    case "All":
      return ` text-blue-500 dark:text-blue-800`;
    case "Soup":
      return ` text-amber-500 dark:text-amber-800`;
    case "Salad":
      return " text-green-500 dark:text-green-800";
    case "Beef":
      return " text-red-500 dark:text-red-800";
    case "Pork":
      return " text-pink-500 dark:text-pink-800";
    case "Noodle":
      return " text-yellow-500 dark:text-yellow-800";
    case "Chicken":
      return " text-orange-500 dark:text-orange-800";
    case "Seafood":
      return " text-blue-500 dark:text-blue-800";
    case "Vegetable":
      return " text-emerald-500 dark:text-emerald-800";
    case "Dessert":
      return " text-purple-500 dark:text-purple-800";
    case "Beverage":
      return " text-indigo-500 dark:text-indigo-800";
    default:
      return " text-gray-500 dark:text-gray-800";
  }
};

export function CategoryBadge({
  category,
  size = "medium",
}: CategoryBadgeProps) {
  const IconComponent = getCategoryIcon(category);
  const iconSize = size === "small" ? "h-3 w-3" : "h-4 w-4";

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 ${getColorClasses(category)}`}
    >
      <IconComponent className={iconSize} />
      {category}
    </Badge>
  );
}
