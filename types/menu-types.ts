import { useMenuForm } from "@/hooks/use-menu-form";
import { SetStateBoolean } from "./global-types";
import { PackageOption, ReviewsProps } from "./package-types";
import { CustomSelectItemProps } from "./component-types";

export type ServingSize = 6 | 10 | 15 | 20;

// Define the types
export type CategoryProps =
  | "All"
  | "Soup"
  | "Salad"
  | "Beef"
  | "Pork"
  | "Noodle"
  | "Chicken"
  | "Seafood"
  | "Vegetable"
  | "Dessert"
  | "Beverage";

export const FOOD_CATEGORIES = [
  "Soup",
  "Salad",
  "Beef",
  "Pork",
  "Noodle",
  "Chicken",
  "Seafood",
  "Vegetable",
  "Dessert",
  "Beverage",
];

export type AllergenProps =
  | "Milk"
  | "Eggs"
  | "Fish"
  | "Shellfish"
  | "Tree nuts"
  | "Peanuts"
  | "Wheat"
  | "Soybeans"
  | "Sesame"
  | "Gluten"
  | "Mustard"
  | "Celery"
  | "Lupin"
  | "Molluscs"
  | "Sulphites"
  | "Soy"
  | "Nuts"
  | "None"
  | "";

export const FOOD_ALLERGENS = [
  "None",
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
  "Gluten",
  "Mustard",
  "Celery",
  "Lupin",
  "Molluscs",
  "Sulphites",
  "Soy",
  "Nuts",
];

// Update the interfaces to match the new data structure
export interface NutritionInfo {
  calories?: string; // Now includes "kcal" unit
  protein?: string; // Now includes "g" unit
  fat?: string; // Now includes "g" unit
  carbs?: string; // Now includes "g" unit
  sodium?: string; // Now includes "mg" unit
  fiber?: string; // Now includes "g" unit
  sugar?: string; // Now includes "g" unit
  cholesterol?: string; // Now includes "mg" unit
}

export interface PriceInfo {
  minimumPax: number;
  maximumPax: number;
  price: number;
  discount: number;
}

export interface MenuItem {
  _id?: string;
  name: string;
  category: CategoryProps;
  available: boolean;
  spicy: boolean;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  allergens: AllergenProps[];
  preparationMethod: string;
  regularPricePerPax: number;
  prices: PriceInfo[]; // Now an array of price tiers
  imageUrl?: string;
  rating: number;
  ratingCount: number;
  perServing: string; // New property for serving size
  nutritionInfo: NutritionInfo;
  reviews?: ReviewsProps[];
}

export interface MenuCardProps {
  menu: MenuItem;
}

export interface PaginatedMenuProps {
  items: MenuItem[];
}

export type CalculationParams = {
  regularPricePerPax: number;
  price: number;
  servingSize: number;
};

export type StarSize = "small" | "medium" | "large";

export interface MenuDetailsDialogProps {
  menu: MenuItem;
  isMenuDetailsDialogOpen: boolean;
  setIsMenuDetailsDialogOpen: SetStateBoolean;
}

export interface CategoryBadgeProps {
  category: CategoryProps;
  size?: "small" | "medium";
}

export interface AddMenuDialogProps {
  isAddMenuOpen: boolean;
  setIsAddMenuOpen: SetStateBoolean;
}

export interface EditMenuDialogProps {
  isEditMenuOpen: boolean;
  setIsEditMenuOpen: SetStateBoolean;
  menu: MenuItem;
}

export type DeleteMenuDialogProps = {
  menu: MenuItem;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: SetStateBoolean;
};

export type HeaderWithAddButtonProps = {
  title: string;
  setIsAddInstanceOpen: SetStateBoolean;
};

export const allergens: AllergenProps[] = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
  "Gluten",
  "Mustard",
  "Celery",
  "Lupin",
  "Molluscs",
  "Sulphites",
  "Soy",
  "Nuts",
];

export const predefinedPaxRanges = [
  { min: 4, max: 6 },
  { min: 8, max: 10 },
  { min: 13, max: 15 },
  { min: 18, max: 20 },
];

export const categories: CategoryProps[] = [
  "Soup",
  "Salad",
  "Beef",
  "Pork",
  "Noodle",
  "Chicken",
  "Seafood",
  "Vegetable",
  "Dessert",
  "Beverage",
];

export const nutritionUnits = {
  calories: "kcal",
  protein: "g",
  fat: "g",
  carbs: "g",
  sodium: "mg",
  fiber: "g",
  sugar: "g",
  cholesterol: "mg",
};

export const addMenuFormSteps = [
  {
    id: "basic-info",
    title: "Basic Info",
    description: "Enter the basic details about your menu item",
  },
  {
    id: "ingredients-allergens",
    title: "Ingredients & Allergens",
    description: "Add ingredients and select allergens present in this item",
  },
  {
    id: "preparation",
    title: "Preparation",
    description: "Describe how this menu item is prepared",
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "Set the pricing tiers for this menu item",
  },
  {
    id: "nutrition",
    title: "Nutrition",
    description: "Add nutrition information for this menu item",
  },
  {
    id: "image",
    title: "Image",
    description: "Upload or provide a URL for the menu item image",
  },
  {
    id: "review",
    title: "Review",
  },
];

export interface AddMenuFormProps {
  formHook: ReturnType<typeof useMenuForm>;
}

export const selectorItems: CustomSelectItemProps[] = [
  { value: "default", title: "Default" },
  { value: "price-asc", title: "Price: Low to High" },
  { value: "price-desc", title: "Price: High to Low" },
  { value: "rating-desc", title: "Highest Rated" },
  { value: "name-asc", title: "Name: A to Z" },
  { value: "name-desc", title: "Name: Z to A" },
];

export const categorySelect: CustomSelectItemProps[] = [
  { value: "all", title: "All" },
  { value: "soup", title: "Soup" },
  { value: "salad", title: "Salad" },
  { value: "beef", title: "Beef" },
  { value: "pork", title: "Pork" },
  { value: "noodle", title: "Noodle" },
  { value: "chicken", title: "Chicken" },
  { value: "seafood", title: "Seafood" },
  { value: "vegetable", title: "Vegetable" },
  { value: "dessert", title: "Dessert" },
  { value: "beverage", title: "Beverage" },
];

export const allergensSelect: CustomSelectItemProps[] = [
  { value: "Milk", title: "Milk" },
  { value: "Eggs", title: "Eggs" },
  { value: "Fish", title: "Fish" },
  { value: "Shellfish", title: "Shellfish" },
  { value: "Tree Nuts", title: "Tree nuts" },
  { value: "Peanuts", title: "Peanuts" },
  { value: "Wheat", title: "Wheat" },
  { value: "Soybeans", title: "Soybeans" },
  { value: "Sesame", title: "Sesame" },
  { value: "Gluten", title: "Gluten" },
  { value: "Mustard", title: "Mustard" },
  { value: "Celery", title: "Celery" },
  { value: "Lupin", title: "Lupin" },
  { value: "Molluscs", title: "Molluscs" },
  { value: "Sulphites", title: "Sulphites" },
  { value: "Soy", title: "Soy" },
  { value: "Nuts", title: "Nuts" },
];

export const defaultCategoryAndCount: PackageOption[] = [
  { category: "Soup", count: 5 },
  { category: "Salad", count: 5 },
  { category: "Beef", count: 5 },
  { category: "Pork", count: 5 },
  { category: "Noodle", count: 5 },
  { category: "Chicken", count: 5 },
  { category: "Seafood", count: 5 },
  { category: "Vegetable", count: 5 },
  { category: "Dessert", count: 5 },
  { category: "Beverage", count: 5 },
];
