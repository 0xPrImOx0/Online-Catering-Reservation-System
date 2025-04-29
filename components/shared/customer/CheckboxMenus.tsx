"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useReservationForm } from "@/hooks/use-reservation-form";
import { menuItems } from "@/lib/menu-lists";
import { CategoryProps, MenuItem } from "@/types/menu-types";
import React, { useState } from "react";
import ImageDialog from "../ImageDialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { SelectedMenus } from "@/types/reservation-types";

export default function CheckboxMenus({
  category,
  field,
  count,
  selectedMenus,
}: {
  category: CategoryProps;
  field: any;
  count: number;
  selectedMenus: SelectedMenus;
}) {
  const { handleCheckboxChange, getMenuItem } = useReservationForm();
  // Function to get dishes by category
  const getMenusByCategory = (category: CategoryProps) => {
    return menuItems.filter((menu: MenuItem) => menu.category === category);
  };

  const getMenuItemPrice = (menuId: string) => {
    const menu = getMenuItem(menuId);
    return menu ? menu.prices[0].price : 0;
  };

  const isDisabled = (field: any, id: string) => {
    return (
      field.value[category] &&
      Object.keys(field.value[category]).length >= count &&
      !field.value[category][id]
    );
  };

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  return (
    <div>
      <div key={category} className="space-y-3">
        <FormLabel className="text-base font-medium">
          {category} Options
        </FormLabel>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {getMenusByCategory(category).map((menu) => (
            <div key={menu._id} className="flex items-start space-x-2">
              <FormControl>
                <Checkbox
                  id={menu._id}
                  checked={!!field.value[category]?.[menu._id]} // ✅ check if menu is selected (count > 0)
                  disabled={isDisabled(field, menu._id)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      checked,
                      field,
                      category,
                      menu,
                      count,
                      getMenuItemPrice(menu._id)
                    )
                  }
                  className="data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-background"
                />
              </FormControl>
              <div className="flex flex-col justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"custom"}
                        variant={"link"}
                        className={clsx("font-medium max-w-fit -mt-1", {
                          "text-green-500": field.value[category]?.[menu._id],
                          "text-muted-foreground line-through": isDisabled(
                            field,
                            menu._id
                          ),
                        })}
                        onClick={() => {
                          setActiveMenu(menu._id);
                          setIsImageDialogOpen(true);
                        }}
                      >
                        {menu.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View Image</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Label
                  htmlFor={menu._id}
                  className="text-sm cursor-pointer text-muted-foreground"
                >
                  {menu.shortDescription}
                </Label>
                {isImageDialogOpen && activeMenu === menu._id && (
                  <ImageDialog
                    item={menu}
                    isImageDialogOpen={isImageDialogOpen}
                    setIsImageDialogOpen={setIsImageDialogOpen}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        {Array.isArray(selectedMenus[category]) &&
          selectedMenus[category].length >= count && (
            <p className="text-xs italic text-muted-foreground">
              *You can only select up to {count} item/s for {category}.*
            </p>
          )}
      </div>
      <Separator className="mt-4" />
    </div>
  );
}
