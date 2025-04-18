import { CategoryProps, MenuItem } from "@/types/menu-types";
import {
  EventType,
  eventTypes,
  PackageCategory,
  reservationEventTypes,
} from "@/types/package-types";
import { ReservationItem } from "@/types/reservation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Reservation Schema for Zod
const reservationSchema = z
  .object({
    fullName: z
      .string({ required_error: "Please provide your Full Name" })
      .min(2, "Full Name must be at least 2 characters")
      .max(50, "Full Name must not exceed 50 characters"),
    email: z
      .string({ required_error: "Please provide your email address" })
      .email("Please enter a valid email address"),
    contactNumber: z
      .string({ required_error: "Please provide your Contact Number" })
      .regex(/^\d{10}$/, "Contact Number must have exactly 10 digits"),
    reservationType: z.enum(["event", "personal"]),
    eventType: z.enum(reservationEventTypes as [EventType, ...EventType[]], {
      required_error: "Please select an Event Type",
    }),
    eventDate: z.date({
      required_error: "Please provide the Event Date",
    }),
    eventTime: z
      .string({ required_error: "Please provide the Event Time" })
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Please enter a valid time (HH:mm)"
      ),
    guestCount: z
      .number({ required_error: "Please provide the Guest Count" })
      .min(20, "Guest Count must be at least 20")
      .max(200, "Guest Count must not exceed 200"),
    venue: z
      .string({ required_error: "Please provide the Venue" })
      .min(3, "Venue must be at least 3 characters")
      .max(100, "Venue must not exceed 100 characters"),
    cateringOptions: z.enum(["event", "custom"], {
      required_error: "Please select a Service Mode",
    }),
    serviceType: z.enum(["Buffet", "Plated"], {
      required_error: "Please select a Service Type",
    }),
    serviceHours: z.string().optional(),
    selectedPackage: z
      .string({ required_error: "Please select a Package" })
      .min(1, "Package selection is required"),
    selectedMenus: z
      .record(z.string(), z.record(z.string(), z.number()))
      .refine(
        (menus) =>
          Object.values(menus).some(
            (dishMap) => Object.keys(dishMap).length > 0
          ),
        {
          message: "You must select at least one menu item.",
        }
      ),
    specialRequests: z
      .string()
      .max(500, "Special Requests must not exceed 500 characters")
      .optional(),
    deliveryOption: z.enum(["Pickup", "Delivery"], {
      required_error: "Please select a Delivery Option",
    }),
    deliveryAddress: z
      .string()
      .min(1, "Delivery address is required")
      .max(200, "Delivery address must not exceed 200 characters")
      .optional(),
    deliveryInstructions: z
      .string()
      .max(300, "Delivery Instructions must not exceed 300 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.selectedPackage) {
      const allCategoriesHaveMenus = Object.values(data.selectedMenus).every(
        (categoryMenus) => Object.keys(categoryMenus).length > 0
      );

      if (!allCategoriesHaveMenus) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one menu item must be selected for each category",
          path: ["selectedMenus"],
        });
      }
    }
  });

export type ReservationValues = z.infer<typeof reservationSchema>;

const defaultValues: ReservationValues = {
  fullName: "",
  email: "",
  contactNumber: "0",
  reservationType: "event",
  eventType: "Birthday",
  eventDate: new Date(),
  eventTime: "",
  guestCount: 0,
  venue: "",
  cateringOptions: "event",
  serviceType: "Buffet",
  serviceHours: "",
  selectedPackage: "",
  selectedMenus: {} as Record<PackageCategory, Record<string, number>>,
  specialRequests: "",
  deliveryOption: "Pickup",
  deliveryAddress: "",
  deliveryInstructions: "",
};

export function useReservationForm() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);

  const reservationForm = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const { watch } = reservationForm;
  const cateringOptions = watch("cateringOptions");
  const selectedPackage = watch("selectedPackage");
  const reservationType = watch("reservationType");
  // Validate a specific step
  const validateStep = async (step: number): Promise<boolean> => {
    if (cateringOptions === "event" && selectedPackage === "" && step !== 0) {
      setShowPackageSelection(true);
    }
    if (cateringOptions === "custom" && step === 1) {
      return true;
    }
    const fieldsToValidate = getFieldsToValidate(step);
    const isValid = await reservationForm.trigger(fieldsToValidate);
    return isValid;
  };

  // Submit form function
  const onSubmit = (data: ReservationValues) => {
    // Create menu item object
    const reservation: ReservationItem = {
      ...data,
    };
    // Here you would typically send this to your API
    // If there's an image file, you would upload it first and then update the imageUrl

    // Show success message
    setIsSubmitSuccess(true);

    // Return the new menu item
    return reservation;
  };

  const getFieldsToValidate = (
    step: number
  ): Array<keyof ReservationValues> => {
    switch (step) {
      case 0:
        return ["fullName", "email", "contactNumber"];
      case 1:
        return ["cateringOptions", "selectedPackage"];
      case 2:
        return ["selectedMenus"];
      case 3:
        if (reservationType === "event") {
          return [
            "eventType",
            "eventDate",
            "guestCount",
            "venue",
            "serviceType",
            "serviceHours",
          ];
        }
        if (reservationType === "personal") {
          return ["eventDate", "guestCount"];
        }
      default:
        return [];
    }
  };

const handleCheckboxChange = (
  checked: boolean | string,
  field: any,
  category: PackageCategory,
  menu: MenuItem,
  count: number
) => {
  const currentSelection = field.value[category] || {};
  const updatedMenus: Record<string, number> = { ...currentSelection };
  const uniqueDishesSelected = Object.keys(updatedMenus).length;

  if (checked === true) {
    // Allow adding a new dish if under the limit
    if (uniqueDishesSelected < count) {
      updatedMenus[menu._id] = 1; // Set quantity to 1 when checked
    }
  } else {
    // Remove the dish completely when unchecked
    delete updatedMenus[menu._id];
  }

  // Clean up: remove category if no dishes are selected
  const cleanedMenus = { ...field.value };
  if (Object.keys(updatedMenus).length > 0) {
    cleanedMenus[category] = updatedMenus;
  } else {
    delete cleanedMenus[category];
  }

  field.onChange(cleanedMenus);
};

  return {
    reservationForm,
    validateStep,
    onSubmit,
    isSubmitSuccess,
    handleCheckboxChange,
    showPackageSelection,
    setShowPackageSelection,
  };
}
