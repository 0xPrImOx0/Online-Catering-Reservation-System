"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import { PackageCategory, FormData } from "@/types/package-types";
import Link from "next/link";
import { menuItems } from "@/lib/shared/menus-metadata";
import { categories } from "@/types/menu-types";

export default function CustomPackageForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    venue: "",
    serviceType: "Buffet",
    serviceHours: "4",
    selectedMenus: {} as Record<PackageCategory, string[]>,
    specialRequests: "",
  });

  // Function to handle form data changes
  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Function to handle dish selection
  const handleDishSelection = (
    category: PackageCategory,
    dishId: string,
    selected: boolean
  ) => {
    setFormData((prev) => {
      const currentSelection = prev.selectedMenus[category] || [];
      let newSelection;

      if (selected) {
        newSelection = [...currentSelection, dishId];
      } else {
        newSelection = currentSelection.filter((id) => id !== dishId);
      }

      return {
        ...prev,
        selectedMenus: {
          ...prev.selectedMenus,
          [category]: newSelection,
        },
      };
    });
  };

  // Function to get dishes by category
  const getDishesByCategory = (category: PackageCategory) => {
    return menuItems.filter((dish) => dish.category === category);
  };
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center gap-4">
          <div className="w-10 h-10 text-background bg-foreground rounded-full border-2 border-primary flex items-center justify-center">
            <Check className="h-5 w-5" />
          </div>
          <span className="text-2xl font-medium">Create Your Own Package!</span>
        </div>
      </div>

      <Card className="">
        <CardHeader>
          <CardTitle>Package Information</CardTitle>
          <CardDescription>
            Please select all the menus you want to add in your package!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category} className="space-y-2">
                <h3 className="font-medium">{category} Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getDishesByCategory(category as PackageCategory).map(
                    (dish) => (
                      <div
                        key={dish._id}
                        className="flex items-start space-x-2"
                      >
                        <Checkbox
                          id={`dish-${dish._id}`}
                          onCheckedChange={(checked) =>
                            handleDishSelection(
                              category as PackageCategory,
                              dish._id!,
                              checked as boolean
                            )
                          }
                          checked={(
                            formData.selectedMenus[
                              category as PackageCategory
                            ] || []
                          ).includes(dish._id!)}
                        />
                        <div className="grid gap-1.5">
                          <Label
                            htmlFor={`dish-${dish._id}`}
                            className="font-medium"
                          >
                            {dish.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {dish.shortDescription}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                placeholder="Any special requests or dietary requirements?"
                value={formData.specialRequests}
                onChange={(e) =>
                  handleFormChange("specialRequests", e.target.value)
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button asChild>
            <Link href={"/book-now"}>Proceed</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
