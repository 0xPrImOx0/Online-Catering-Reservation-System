"use client";

import { Plus } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { allergens } from "@/types/menu-types";
import { useMenuForm } from "@/hooks/use-menu-form";

export function IngredientsStep() {
  const {
    form,
    newIngredient,
    setNewIngredient,
    addIngredient,
    removeIngredient,
    isValidationAttempted,
  } = useMenuForm();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-medium">Ingredients</Label>
        <div className="flex space-x-2">
          <Input
            placeholder="Add an ingredient"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addIngredient();
              }
            }}
          />
          <Button type="button" onClick={addIngredient} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {form.watch("ingredients")?.map((ingredient, index) => {
            return (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm flex items-center gap-1"
              >
                {ingredient}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => removeIngredient(index)}
                >
                  ×
                </Button>
              </Badge>
            );
          })}
        </div>
        {form.formState.errors.ingredients?.message && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.ingredients.message}
          </p>
        )}

        {Array.isArray(form.formState.errors.ingredients) &&
          form.formState.errors.ingredients.map((error, index) =>
            error?.message ? (
              <p key={index} className="text-sm font-medium text-destructive">
                Ingredient {index + 1}: {error.message}
              </p>
            ) : null
          )}
      </div>

      <FormField
        control={form.control}
        name="allergens"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base font-medium">Allergens</FormLabel>
              <FormDescription>
                Select all allergens present in this menu item
              </FormDescription>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-2">
              {allergens.map((allergen) => (
                <FormField
                  key={allergen}
                  control={form.control}
                  name="allergens"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={allergen}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(allergen)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, allergen])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== allergen
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {allergen}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
