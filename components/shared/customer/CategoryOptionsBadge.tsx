import { CheckCircle } from "lucide-react";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { SelectedMenus } from "@/types/reservation-types";

export default function CategoryOptionsBadge({
  categoryAndCount,
  selectedMenus,
}: {
  categoryAndCount: { category: string; count: number }[];
  selectedMenus: SelectedMenus;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categoryAndCount.map(({ category, count }) => {
        const isLimitReached =
          (Object.keys(selectedMenus[category] || {}).length || 0) >= count;
        return (
          <Badge
            variant={"outline"}
            className={clsx(
              "flex-1 max-w-fit",
              isLimitReached
                ? "bg-green-500 border-green-500 text-background space-x-2 hover:text-foreground"
                : "border-green-500 "
            )}
            key={category}
            title={
              isLimitReached
                ? `You have reached the limit of ${count} items for ${category}.`
                : `You can select up to ${count} items for ${category}.`
            }
          >
            {isLimitReached && <CheckCircle className="w-4 h-4" />}
            <span className="min-w-max">{`${count} ${category}`}</span>
          </Badge>
        );
      })}
    </div>
  );
}
