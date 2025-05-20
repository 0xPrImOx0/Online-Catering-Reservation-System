"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { usePackageForm } from "@/hooks/use-package-form";
import { Info } from "lucide-react";

interface PricingCapacityStepProps {
  formHook: ReturnType<typeof usePackageForm>;
}

export function PricingCapacityStep({ formHook }: PricingCapacityStepProps) {
  const { form, validationAttempted } = formHook;
  const [errors, setErrors] = useState({
    minimum: "",
    recommended: "",
    maximum: "",
  });

  // Validate capacity values without changing them
  const validateCapacityValues = useCallback(() => {
    const minimum = form.getValues("minimumPax");
    const recommended = form.getValues("recommendedPax");
    const maximum = form.getValues("maximumPax");

    const newErrors = {
      minimum: minimum < 10 ? "Minimum must be at least 10" : "",
      recommended:
        recommended < minimum
          ? "Recommended must not be less than minimum"
          : maximum > 0 && recommended > maximum
          ? "Recommended must not be higher than maximum"
          : "",
      maximum:
        maximum < minimum
          ? "Maximum must not be less than minimum"
          : maximum < recommended
          ? "Maximum must not be less than recommended"
          : "",
    };

    setErrors(newErrors);
  }, [form]);

  // Validate on any value change
  useEffect(() => {
    const subscription = form.watch((_value, { name }) => {
      if (
        name === "minimumPax" ||
        name === "recommendedPax" ||
        name === "maximumPax"
      ) {
        validateCapacityValues();
      }
    });

    return () => subscription.unsubscribe();
  }, [form, validateCapacityValues]);

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="pricePerPax"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Price Per Person
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  &#8369;
                </span>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0.00"
                  className="pl-7"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "0" || value === "") {
                      field.onChange(0);
                    } else {
                      field.onChange(Number(value.replace(/^0+/, "")));
                    }
                  }}
                  value={field.value || ""}
                />
              </div>
            </FormControl>
            <FormDescription>
              Base price per person for this package
            </FormDescription>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-medium">Guest Capacity</h3>
          <p className="text-sm text-muted-foreground">
            Set the minimum, recommended, and maximum number of guests for this
            package
          </p>
        </div>

        <Alert variant="default" className="bg-muted/50 border-muted">
          <Info className="h-4 w-4 mr-2" />
          <AlertDescription>
            Please enter each capacity value individually. Ensure that minimum ≤
            recommended ≤ maximum.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="minimumPax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="10"
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      field.onChange(value);
                    }}
                    value={field.value || ""}
                    className={errors.minimum ? "border-destructive" : ""}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Minimum 10 guests
                </FormDescription>
                {errors.minimum && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.minimum}
                  </p>
                )}
                {validationAttempted && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recommendedPax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recommended</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="10"
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      field.onChange(value);
                    }}
                    value={field.value || ""}
                    className={errors.recommended ? "border-destructive" : ""}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Must be ≥ minimum
                </FormDescription>
                {errors.recommended && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.recommended}
                  </p>
                )}
                {validationAttempted && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maximumPax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="10"
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      field.onChange(value);
                    }}
                    value={field.value || ""}
                    className={errors.maximum ? "border-destructive" : ""}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Must be ≥ recommended
                </FormDescription>
                {errors.maximum && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.maximum}
                  </p>
                )}
                {validationAttempted && <FormMessage />}
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
