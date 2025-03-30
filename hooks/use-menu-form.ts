"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  allergens,
  predefinedPaxRanges,
  categories,
  CategoryProps,
  AllergenProps,
  PriceInfo,
  MenuItem,
  CalculationParams,
} from "@/types/menu-types";

// Form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  category: z.enum(categories as [CategoryProps, ...CategoryProps[]]),
  available: z.boolean().default(true),
  shortDescription: z
    .string()
    .min(10, { message: "Short description must be at least 10 characters" }),
  fullDescription: z
    .string()
    .min(20, { message: "Full description must be at least 20 characters" }),
  ingredients: z
    .array(z.string())
    .min(1, { message: "Add at least one ingredient" }),
  allergens: z.array(z.enum(allergens as [AllergenProps, ...AllergenProps[]])),
  preparationMethod: z
    .string()
    .min(10, { message: "Preparation method must be at least 10 characters" }),
  prices: z
    .array(
      z.object({
        minimumPax: z.number().min(1),
        maximumPax: z.number().min(1),
        price: z.number().min(0),
        discount: z.number(),
      })
    )
    .min(1, { message: "Add at least one price tier" }),
  regularPricePerPax: z.number().min(1),
  imageUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.literal("")),
  imageFile: z.instanceof(File).optional(),
  imageUploadType: z.enum(["url", "upload"]).default("url"),
  spicy: z.boolean().default(false),
  perServing: z.string(),
  servingUnit: z.enum(["g", "kg"]).default("g"),
  nutritionInfo: z.object({
    calories: z.string(),
    protein: z.string(),
    fat: z.string(),
    carbs: z.string(),
    sodium: z.string(),
    fiber: z.string(),
    sugar: z.string(),
    cholesterol: z.string(),
  }),
});

export type FormValues = z.infer<typeof formSchema>;

// Default form values
const defaultValues: FormValues = {
  name: "",
  category: "Soup",
  available: true,
  shortDescription: "",
  fullDescription: "",
  ingredients: [],
  allergens: [],
  preparationMethod: "",
  prices: [],
  regularPricePerPax: 0,
  imageUrl: "",
  imageUploadType: "url",
  spicy: false,
  perServing: "",
  servingUnit: "g",
  nutritionInfo: {
    calories: "0",
    protein: "0",
    fat: "0",
    carbs: "0",
    sodium: "0",
    fiber: "0",
    sugar: "0",
    cholesterol: "0",
  },
};

interface UseMenuFormProps {
  initialData?: MenuItem;
  isEditMode?: boolean;
}

export function useMenuForm({
  initialData,
  isEditMode = false,
}: UseMenuFormProps = {}) {
  const [newIngredient, setNewIngredient] = useState("");
  const [newPrice, setNewPrice] = useState<PriceInfo>({
    minimumPax: 4,
    maximumPax: 6,
    price: 0,
    discount: 0,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [availablePaxRanges, setAvailablePaxRanges] = useState([
    ...predefinedPaxRanges,
  ]);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isValidationAttempted, setIsValidationAttempted] = useState(false);

  // Get initial values for edit mode
  const getInitialValues = (): FormValues => {
    if (!isEditMode || !initialData) return defaultValues;

    return {
      name: initialData.name,
      category: initialData.category,
      available: initialData.available,
      shortDescription: initialData.shortDescription,
      fullDescription: initialData.fullDescription,
      ingredients: initialData.ingredients,
      allergens: initialData.allergens,
      preparationMethod: initialData.preparationMethod,
      prices: initialData.prices,
      regularPricePerPax: initialData.regularPricePerPax,
      imageUrl: initialData.imageUrl,
      imageUploadType: initialData.imageUrl ? "url" : "upload",
      spicy: initialData.spicy,
      perServing: initialData.perServing,
      servingUnit: "g", // Default, adjust if needed
      nutritionInfo: initialData.nutritionInfo,
    };
  };

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialValues(),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  // Initialize available pax ranges based on existing prices
  useEffect(() => {
    if (isEditMode && initialData) {
      const usedRanges = initialData.prices.map((price) => ({
        min: price.minimumPax,
        max: price.maximumPax,
      }));

      // Filter out used ranges
      const availableRanges = predefinedPaxRanges.filter(
        (range) =>
          !usedRanges.some(
            (used) => used.min === range.min && used.max === range.max
          )
      );

      setAvailablePaxRanges(availableRanges);

      // Set preview image if available
      if (initialData.imageUrl) {
        setPreviewImage(initialData.imageUrl);
      }
    }
  }, [isEditMode, initialData]);

  // Reset form function
  const resetForm = () => {
    form.reset(defaultValues);
    setNewIngredient("");
    setNewPrice({ minimumPax: 4, maximumPax: 6, price: 0, discount: 0 });
    setPreviewImage(null);
    setAvailablePaxRanges([...predefinedPaxRanges]);
    setIsSubmitSuccess(false);
    setIsValidationAttempted(false);
  };

  // Add ingredient function
  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      const currentIngredients = form.getValues("ingredients") || [];
      form.setValue("ingredients", [
        ...currentIngredients,
        newIngredient.trim(),
      ]);
      setNewIngredient("");
    }
  };

  // Remove ingredient function
  const removeIngredient = (index: number) => {
    const currentIngredients = form.getValues("ingredients");
    form.setValue(
      "ingredients",
      currentIngredients.filter((_, i) => i !== index)
    );
  };

  // Calculate price from discount
  const calculatePriceFromDiscount = (
    discount: number,
    regularPrice: number
  ) => {
    const discountAmount = (discount / 100) * regularPrice;
    return Math.ceil(regularPrice - discountAmount);
  };

  // Calculate discount from price
  const calculateDiscountFromPrice = (price: number, regularPrice: number) => {
    if (regularPrice === 0) return 0;
    const discountPercentage = ((regularPrice - price) / regularPrice) * 100;
    return Math.round(discountPercentage * 100) / 100; // Round to 2 decimal places
  };

  const calculatePricePerPax = useCallback(
    (price: number, maximumPax: number): number => price / maximumPax,
    []
  );

  const calculateSavings = useCallback(
    ({ regularPricePerPax, price, servingSize }: CalculationParams): number =>
      regularPricePerPax * servingSize - price,
    []
  );

  const calculateSavingsPercentage = useCallback(
    ({ regularPricePerPax, price, servingSize }: CalculationParams): number =>
      ((regularPricePerPax * servingSize - price) /
        (regularPricePerPax * servingSize)) *
      100,
    []
  );

  const calculatePrice = useCallback(
    (regularPricePerPax: number, servingSize: number): number =>
      regularPricePerPax * servingSize,
    []
  );

  // Add price tier function
  const addPriceTier = () => {
    if (
      newPrice.minimumPax > 0 &&
      newPrice.maximumPax >= newPrice.minimumPax &&
      form.getValues("regularPricePerPax") > 0
    ) {
      const currentPrices = form.getValues("prices") || [];
      form.setValue("prices", [...currentPrices, { ...newPrice }]);

      // Remove the used range from available ranges
      const updatedRanges = availablePaxRanges.filter(
        (range) =>
          !(
            range.min === newPrice.minimumPax &&
            range.max === newPrice.maximumPax
          )
      );
      setAvailablePaxRanges(updatedRanges);

      // Set to the next available range or reset if none left
      if (updatedRanges.length > 0) {
        setNewPrice({
          minimumPax: updatedRanges[0].min,
          maximumPax: updatedRanges[0].max,
          price: 0,
          discount: 0,
        });
      } else {
        setNewPrice({
          minimumPax: 0,
          maximumPax: 0,
          price: 0,
          discount: 0,
        });
      }
    }
  };

  // Remove price tier function
  const removePriceTier = (index: number) => {
    const currentPrices = form.getValues("prices");
    const removedPrice = currentPrices[index];

    // Add the removed range back to available ranges
    const range = {
      min: removedPrice.minimumPax,
      max: removedPrice.maximumPax,
    };

    // Check if this range is one of our predefined ranges
    const isPredefined = predefinedPaxRanges.some(
      (r) => r.min === range.min && r.max === range.max
    );

    if (isPredefined) {
      setAvailablePaxRanges((prev) =>
        [...prev, range].sort((a, b) => a.min - b.min)
      );
    }

    form.setValue(
      "prices",
      currentPrices.filter((_, i) => i !== index)
    );
  };

  // Handle file change for image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected file
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      form.setValue("imageFile", file);
    }
  };

  // Submit form function
  const onSubmit = (data: FormValues) => {
    // Create menu item object
    const menuItem: MenuItem = {
      id:
        isEditMode && initialData
          ? initialData.id
          : Math.floor(Math.random() * 10000),
      ...data,
      rating: isEditMode && initialData ? initialData.rating : 0,
      ratingCount: isEditMode && initialData ? initialData.ratingCount : 0,
    };

    console.log(
      `${isEditMode ? "Updating" : "Submitting"} menu item:`,
      menuItem
    );
    // Here you would typically send this to your API
    // If there's an image file, you would upload it first and then update the imageUrl

    // Show success message
    setIsSubmitSuccess(true);

    // Return the new menu item
    return menuItem;
  };

  // Helper function to get fields to validate for each step
  const getFieldsToValidate = (step: number): Array<keyof FormValues> => {
    switch (step) {
      case 0:
        return [
          "name",
          "category",
          "shortDescription",
          "fullDescription",
          "available",
          "spicy",
        ];
      case 1:
        return ["ingredients", "allergens"];
      case 2:
        return ["preparationMethod", "perServing"];
      case 3:
        return ["prices", "regularPricePerPax"];
      case 4:
        return ["nutritionInfo"];
      case 5:
        return []; // Make image optional by not validating any fields
      default:
        return [];
    }
  };

  // Validate a specific step
  const validateStep = async (step: number): Promise<boolean> => {
    setIsValidationAttempted(true);
    const fieldsToValidate = getFieldsToValidate(step);
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setIsValidationAttempted(false);
    }

    return isValid;
  };

  // Update the useEffect for price recalculation
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "regularPricePerPax") {
        const regularPrice = value.regularPricePerPax as number;

        // Update the current price tier form
        if (newPrice.discount > 0) {
          const calculatedPrice = calculatePriceFromDiscount(
            newPrice.discount,
            regularPrice
          );
          setNewPrice((prev) => ({
            ...prev,
            price: calculatedPrice,
          }));
        } else if (newPrice.price === 0) {
          // If price is 0 and no discount set, default to 100% discount
          setNewPrice((prev) => ({
            ...prev,
            discount: 100,
            price: 0,
          }));
        }

        // Update all existing price tiers
        const currentPrices = form.getValues("prices") || [];
        if (currentPrices.length > 0) {
          const updatedPrices = currentPrices.map((price) => {
            const calculatedPrice = calculatePriceFromDiscount(
              price.discount,
              regularPrice
            );
            return {
              ...price,
              price: calculatedPrice,
            };
          });
          form.setValue("prices", updatedPrices);
        }

        // If regularPricePerPax is 0, reset all prices
        if (!regularPrice) {
          const resetPrices = currentPrices.map((price) => ({
            ...price,
            price: 0,
            discount: 0,
          }));
          form.setValue("prices", resetPrices);
          setNewPrice((prev) => ({ ...prev, price: 0, discount: 0 }));
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, newPrice.discount, newPrice.price]);

  return {
    form,
    newIngredient,
    setNewIngredient,
    newPrice,
    setNewPrice,
    previewImage,
    setPreviewImage,
    availablePaxRanges,
    isSubmitSuccess,
    isValidationAttempted,
    addIngredient,
    removeIngredient,
    addPriceTier,
    removePriceTier,
    handleFileChange,
    onSubmit,
    validateStep,
    resetForm,
    calculatePriceFromDiscount,
    calculateDiscountFromPrice,
    calculatePricePerPax,
    calculateSavings,
    calculateSavingsPercentage,
    calculatePrice,
  };
}
