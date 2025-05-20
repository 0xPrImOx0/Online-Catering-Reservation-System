import { Badge } from "@/components/ui/badge";
import { getCategoryIcon } from "@/lib/shared/menu-category-badges";
import { CategoryBadgeProps, CategoryProps } from "@/types/menu-types";

// Directly define colors based on category
export const getColorClasses = (category: CategoryProps) => {
  switch (category) {
    case "All":
      return `bg-blue-200 text-blue-800 border-blue-400`;
    case "Soup":
      return `bg-amber-200 text-amber-800 border-amber-400`;
    case "Salad":
      return "bg-green-200 text-green-800 border-green-400";
    case "Beef":
      return "bg-red-200 text-red-800 border-red-400";
    case "Pork":
      return "bg-pink-200 text-pink-800 border-pink-400";
    case "Noodle":
      return "bg-yellow-200 text-yellow-800 border-yellow-400";
    case "Chicken":
      return "bg-orange-200 text-orange-800 border-orange-400";
    case "Seafood":
      return "bg-blue-200 text-blue-800 border-blue-400";
    case "Vegetable":
      return "bg-emerald-200 text-emerald-800 border-emerald-400";
    case "Dessert":
      return "bg-purple-200 text-purple-800 border-purple-400";
    case "Beverage":
      return "bg-indigo-200 text-indigo-800 border-indigo-400";
    default:
      return "bg-gray-200 text-gray-800 border-gray-400";
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
