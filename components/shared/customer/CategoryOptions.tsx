"use client";
import { Textarea } from "@/components/ui/textarea";
import {
  ReservationValues,
  useReservationForm,
} from "@/hooks/use-reservation-form";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { PackageOption } from "@/types/package-types";
import { MenuItem } from "@/types/menu-types";
import CategoryOptionsBadge from "./CategoryOptionsBadge";
import { Label } from "@/components/ui/label";
import SelectServingSize from "./SelectServingSize";
import { defaultCategoryAndCount } from "@/types/menu-types";
import CheckboxMenusList from "./CheckboxMenusList";

export default function CategoryOptions({
  setIsCategoryError,
  cateringOptions,
}: {
  setIsCategoryError: (value: boolean) => void;
  cateringOptions: string;
}) {
  const { control, setValue, watch, clearErrors, setError } =
    useFormContext<ReservationValues>();

  const { getMenuItem, getPackageItem } = useReservationForm();

  const selectedMenus = watch("selectedMenus");

  // State to hold loaded menu items
  const [menuItemsMap, setMenuItemsMap] = useState<Record<string, MenuItem>>(
    {}
  );

  // Preload all menu items used in selectedMenus
  useEffect(() => {
    async function loadMenuItems() {
      const menuIds: string[] = [];
      Object.values(selectedMenus || {}).forEach(
        (category: Record<string, unknown>) => {
          Object.keys(category || {}).forEach((menuId) => {
            if (!menuIds.includes(menuId)) menuIds.push(menuId);
          });
        }
      );
      // Only fetch missing ones
      const missing = menuIds.filter((id) => !menuItemsMap[id]);
      if (missing.length === 0) return;
      const newItems: Record<string, MenuItem> = {};
      await Promise.all(
        missing.map(async (id) => {
          const item = await getMenuItem(id);
          if (item) newItems[id] = item;
        })
      );
      if (Object.keys(newItems).length > 0) {
        setMenuItemsMap((prev) => ({ ...prev, ...newItems }));
      }
    }
    loadMenuItems();
  }, [selectedMenus]);

  const selectedPackage = watch("selectedPackage");

  const serviceFee = watch("serviceFee");
  const deliveryFee = watch("deliveryFee");

  const [currentPackage, setCurrentPackage] = useState<string>();

  const [categoryAndCount, setCategoryAndCount] = useState<PackageOption[]>(
    defaultCategoryAndCount
  );

  useEffect(() => {
    if (cateringOptions === "menus" && !!selectedPackage) {
      setCurrentPackage("");
      setValue("selectedPackage", "");
      setValue("selectedMenus", {});
      clearErrors("selectedMenus");
      setCategoryAndCount(defaultCategoryAndCount);
      return;
    }
    if (selectedPackage) {
      async function fetchPackage() {
        if (!selectedPackage) return;

        const selectedPackageData = await getPackageItem(selectedPackage);

        if (selectedPackageData) {
          setCurrentPackage(selectedPackageData.name);
          setCategoryAndCount(selectedPackageData.options);
        }
      }

      fetchPackage();
    }
  }, [cateringOptions, selectedPackage]);

  useEffect(() => {
    if (cateringOptions === "packages" && selectedPackage) {
      const hasIncompleteCategory = categoryAndCount.some(
        ({ category, count }) =>
          Object.keys(selectedMenus[category] || {}).length !== count
      );

      if (hasIncompleteCategory) {
        setIsCategoryError(true);
        setError("selectedMenus", {
          type: "manual",
          message:
            "Please select the required number of items for each category.",
        });
      } else {
        setIsCategoryError(false);
        clearErrors("selectedMenus");
      }
    }
  }, [selectedMenus, categoryAndCount]);

  return (
    <div className="space-y-6 overflow-hidden">
      {selectedPackage && (
        <div>
          <h3 className="mb-2 text-base font-medium">
            Available Categories for {currentPackage}
          </h3>

          <CategoryOptionsBadge
            categoryAndCount={categoryAndCount}
            selectedMenus={selectedMenus}
          />
        </div>
      )}
      <FormField
        control={control}
        name="selectedMenus"
        render={({ field }) => (
          <FormItem>
            {categoryAndCount.map(({ category, count }) => {
              return (
                <CheckboxMenusList
                  key={category}
                  category={category}
                  field={field}
                  selectedMenus={selectedMenus}
                  count={count}
                />
              );
            })}
            <FormMessage />
          </FormItem>
        )}
      />
      {watch("selectedMenus") &&
        Object.keys(watch("selectedMenus")).some(
          (category) =>
            Object.keys(watch("selectedMenus")[category] || {}).length > 0
        ) &&
        !selectedPackage && (
          <FormField
            control={control}
            name="selectedMenus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Menu Quantity
                </FormLabel>
                <FormControl>
                  <div className="space-y-6">
                    {Object.keys(field.value)
                      .filter(
                        (category) =>
                          Object.keys(field.value[category] || {}).length > 0
                      )
                      .map((category) => (
                        <div key={category} className="pb-4 border-b">
                          <h3 className="mb-2 font-medium text-gray-700 text-md">
                            {category}
                          </h3>
                          <ul className="space-y-2">
                            {Object.keys(field.value[category]).map((menu) => (
                              <li
                                key={menu}
                                className="flex justify-between items-center space-x-4"
                              >
                                <span>
                                  {menuItemsMap[menu]?.name || "Loading..."}
                                </span>
                                <div className="flex space-x-2">
                                  <SelectServingSize
                                    category={category}
                                    menu={menu}
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        )}
      <FormField
        control={control}
        name="specialRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Requests</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any special requests or dietary requirements?"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {watch("totalPrice") > 0 && watch("selectedPackage") === "" && (
        <div className="flex justify-between items-end">
          <Label>{serviceFee && deliveryFee ? "Total" : "Partial"} Price</Label>
          <span className="text-2xl text-green-500 underline underline-offset-4">
            &#8369;{" "}
            {`${new Intl.NumberFormat("en-US").format(watch("totalPrice"))}.00`}
          </span>
        </div>
      )}
    </div>
  );
}
