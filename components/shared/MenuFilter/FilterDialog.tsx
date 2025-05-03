"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  categorySelect,
  allergensSelect,
  selectorItems,
} from "@/lib/menu-select";
import type { AllergenProps } from "@/types/menu-types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FiltersProps } from "@/types/component-types";
import { Card, CardContent } from "@/components/ui/card";
import CustomSelect from "../CustomSelect";

export interface FilterComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FiltersProps;
  updateFilter: (key: string, value: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  excludedAllergens: AllergenProps[];
  toggleAllergen: (allergen: AllergenProps) => void;
  handleClearFilters: () => void;
}

export function FilterDialog({
  open,
  onOpenChange,
  filters,
  updateFilter,
  priceRange,
  setPriceRange,
  excludedAllergens,
  toggleAllergen,
  handleClearFilters,
}: FilterComponentProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] flex flex-col max-h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-background z-10">
          <DialogTitle>Menu Filters</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Menu Category</Label>
              <CustomSelect
                defaultValue="all"
                placeholder="Find Category"
                items={categorySelect}
                value={filters.category || "all"}
                onValueChange={(value) => updateFilter("category", value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Sort By</Label>
              <CustomSelect
                defaultValue="default"
                placeholder="Sort By"
                items={selectorItems}
                value={filters.sortBy || "default"}
                onValueChange={(value) => updateFilter("sortBy", value)}
              />
            </div>

            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
              <Card className="rounded-md">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Available Only</h4>
                    <p className="text-xs text-gray-500">
                      Show only available items
                    </p>
                  </div>
                  <Switch
                    checked={filters.available}
                    onCheckedChange={(checked) =>
                      updateFilter("available", checked ? "true" : "")
                    }
                  />
                </CardContent>
              </Card>

              <Card className="rounded-md">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Spicy</h4>
                    <p className="text-xs text-gray-500">
                      Show only spicy items
                    </p>
                  </div>
                  <Switch
                    checked={filters.spicy}
                    onCheckedChange={(checked) =>
                      updateFilter("spicy", checked ? "true" : "")
                    }
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 col-span-1 md:col-span-2">
              <Label className="text-sm font-medium">
                Price Range (₱{priceRange[0]} - ₱{priceRange[1]})
              </Label>
              <Slider
                defaultValue={[0, 1000]}
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-4">
              <Label className="text-sm font-medium">Exclude Allergens</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {allergensSelect.slice(1).map((allergen) => (
                  <Badge
                    key={allergen.value}
                    variant={
                      excludedAllergens.includes(
                        allergen.value as AllergenProps
                      )
                        ? "default"
                        : "outline"
                    }
                    className={cn(
                      "cursor-pointer",
                      excludedAllergens.includes(
                        allergen.value as AllergenProps
                      )
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : "hover:bg-foreground/20"
                    )}
                    onClick={() =>
                      toggleAllergen(allergen.value as AllergenProps)
                    }
                  >
                    {excludedAllergens.includes(
                      allergen.value as AllergenProps
                    ) && <X className="mr-1 h-3 w-3" />}
                    {allergen.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-2 border-t sticky bottom-0 bg-background z-10">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
