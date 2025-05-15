"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ReservationValues, useReservationForm } from "@/hooks/use-reservation-form";
import { CategoryProps, MenuItem } from "@/types/menu-types";
import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import { ControllerRenderProps } from "react-hook-form";

type CheckboxMenusListProps = {
  category: CategoryProps;
  field: ControllerRenderProps<ReservationValues, "selectedMenus">;
  count: number;
  selectedMenus: SelectedMenus;
};

export default function CheckboxMenusList({
  category,
  field,
  count,
  selectedMenus,
}: CheckboxMenusListProps) {
  const { handleCheckboxChange, getMenuItem, getAllMenus } =
    useReservationForm();
  // getMenusByCategory is now used inside useEffect
  const getMenusByCategory = async (category: CategoryProps) => {
    const menuItems = await getAllMenus();
    return menuItems.filter((menu: MenuItem) => menu.category === category);
  };

  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loadingMenus, setLoadingMenus] = useState(true);

  // Load menus for the given category on mount or when category changes
  useEffect(() => {
    let isMounted = true;
    setLoadingMenus(true);
    getMenusByCategory(category).then((result) => {
      if (isMounted) {
        setMenus(result);
        setLoadingMenus(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [category]);

  const getMenuItemPrice = async (menuId: string) => {
    const menu = await getMenuItem(menuId);
    return menu ? menu.prices[0].price : 0;
  };

  const isDisabled = (
    field: ControllerRenderProps<ReservationValues, "selectedMenus">,
    id: string
  ) => {
    return (
      field.value[category] &&
      Object.keys(field.value[category]).length >= count &&
      !field.value[category][id]
    );
  };

  return (
    <section>
      <div key={category} className="space-y-3">
        <FormLabel className="text-base font-medium">
          {category} Options
        </FormLabel>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {loadingMenus ? (
            <span>Loading menus...</span>
          ) : (
            menus.map((menu) => (
              <div key={menu._id} className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    id={menu._id}
                    checked={!!field.value[category]?.[menu._id as string]}
                    disabled={isDisabled(field, menu._id as string)}
                    onCheckedChange={async (checked) => {
                      const price = await getMenuItemPrice(menu._id as string);
                      handleCheckboxChange(
                        checked,
                        field,
                        category,
                        menu,
                        count,
                        price
                      );
                    }}
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
                          className={clsx(
                            "font-medium max-w-fit -mt-1 overflow-hidden line-clamp-2 cursor-pointer",
                            {
                              "text-green-500":
                                field.value[category]?.[menu._id as string],
                              "text-muted-foreground hover:no-underline cursor-not-allowed":
                                isDisabled(field, menu._id as string),
                            }
                          )}
                          asChild
                        >
                          <Label htmlFor={menu._id}>{menu.name}</Label>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="p-0">
                        <div className="relative w-52 h-52">
                          <Image
                            src={menu.imageUrl || "placeholder.svg"}
                            alt="catering logo"
                            fill
                            className="object-fill m-0 p-0"
                          />
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Label
                    htmlFor={menu._id}
                    className={clsx(
                      "text-sm text-muted-foreground overflow-hidden line-clamp-2 cursor-pointer",
                      {
                        "text-muted-foreground cursor-not-allowed": isDisabled(
                          field,
                          menu._id as string
                        ),
                      }
                    )}
                  >
                    {menu.shortDescription}
                  </Label>
                </div>
              </div>
            ))
          )}
        </div>
        {Array.isArray(selectedMenus[category]) &&
          selectedMenus[category].length >= count && (
            <p className="text-xs italic text-muted-foreground">
              *You can only select up to {count} item/s for {category}.*
            </p>
          )}
      </div>
      <Separator className="mt-4" />
    </section>
  );
}
