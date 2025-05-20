"use client";

import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddMenuFormProps, nutritionUnits } from "@/types/menu-types";
import Image from "next/image";
import { NutritionInfo } from "@/types/menu-types";

export function ReviewStep({ formHook }: AddMenuFormProps) {
  const { form, previewImage, isSubmitSuccess, calculateSavings } = formHook;

  return (
    <div className="space-y-6">
      {isSubmitSuccess ? (
        <div className="text-center py-20 md:py-32">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2 mt-4">
            Menu Item Added Successfully!
          </h3>
          <p className="text-muted-foreground">
            Your new menu item has been added to the catalog.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <Check className="h-12 w-12 mx-auto mb-2 text-green-600" />
            <h3 className="text-lg font-medium">Review Your Menu Item</h3>
            <p className="text-muted-foreground">
              Please review all information before submitting
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Name
                    </h5>
                    <p className="text-base font-medium">
                      {form.watch("name")}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Category
                    </h5>
                    <p className="text-base">{form.watch("category")}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Short Description
                  </h5>
                  <p className="text-base">{form.watch("shortDescription")}</p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Full Description
                  </h5>
                  <p className="text-base">{form.watch("fullDescription")}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Available
                    </h5>
                    <Badge
                      variant={form.watch("available") ? "default" : "outline"}
                    >
                      {form.watch("available") ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Spicy
                    </h5>
                    <Badge
                      variant={form.watch("spicy") ? "destructive" : "outline"}
                    >
                      {form.watch("spicy") ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">
                  Ingredients & Allergens
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Ingredients
                  </h5>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {form.watch("ingredients")?.map((ingredient, index) => (
                      <Badge key={index} variant="outline">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Allergens
                  </h5>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {form.watch("allergens")?.length > 0 ? (
                      form.watch("allergens")?.map((allergen, index) => (
                        <Badge key={index} variant="secondary">
                          {allergen}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        None
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Preparation</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Preparation Method
                  </h5>
                  <p className="text-base">{form.watch("preparationMethod")}</p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Serving Size
                  </h5>
                  <p className="text-base">{form.watch("perServing")} g</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Regular Price Per Pax
                  </h5>
                  <p className="text-base font-medium">
                    &#8369; {form.watch("regularPricePerPax").toFixed(2)}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Price Tiers
                  </h5>
                  <div className="space-y-2 mt-1">
                    {form.watch("prices")?.map((price, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 border rounded-md"
                      >
                        <div>
                          <span className="font-medium">
                            {price.minimumPax} - {price.maximumPax} pax
                          </span>
                          <div className="text-sm text-muted-foreground">
                            {price.discount > 0 &&
                              `${price.discount.toFixed(2)}% discount`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            &#8369; {price.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-green-600">
                            Saved &#8369;{" "}
                            {calculateSavings({
                              regularPricePerPax:
                                form.watch("regularPricePerPax"),
                              price: price.price,
                              servingSize: price.maximumPax,
                            }).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-lg">Nutrition Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4 text-base">
                  {Object.entries(nutritionUnits).map(([key, unit]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize text-sm font-medium text-muted-foreground">
                        {key}
                      </span>
                      <span>
                        {form.watch(
                          `nutritionInfo.${key}` as `nutritionInfo.${keyof NutritionInfo}`
                        )}{" "}
                        {unit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {(form.watch("imageUrl") || previewImage) && (
              <Card>
                <CardHeader className="bg-primary/5 pb-2">
                  <CardTitle className="text-lg">Image</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="relative overflow-hidden h-96 flex items-center justify-center bg-muted rounded-md">
                    <Image
                      src={
                        form.watch("imageUploadType") === "url"
                          ? form.watch("imageUrl") || "/placeholder.svg"
                          : previewImage ?? "/placeholder.svg"
                      }
                      alt="Menu item preview"
                      fill
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
