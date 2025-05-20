"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  type CateringPackagesProps,
  type EventType,
  eventTypes,
  type InclusionsProps,
  packageCategories,
  type PackageCategory,
  type PackageOption,
  type PackageType,
} from "@/types/package-types";
import { toast } from "sonner";
import { FOOD_CATEGORIES } from "@/types/menu-types";
import axios from "axios";
import api from "@/lib/api/axiosInstance";

// Form schema using Zod
const formSchema = z
  .object({
    name: z.string().min(5, { message: "Name must be at least 5 characters" }),

    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),

    available: z.boolean().default(true),

    pricePerPax: z
      .number()
      .min(0, { message: "Price per pax must be a positive number" }),

    pricePerPaxWithServiceCharge: z.number().min(0, {
      message: "Price per pax with service charge must be a positive number",
    }), // Changed from totalPriceWithService

    minimumPax: z
      .number()
      .min(10, { message: "Minimum pax must be at least 10" }),

    recommendedPax: z
      .number()
      .min(10, { message: "Recommended pax must be at least 10" }),

    maximumPax: z
      .number()
      .min(10, { message: "Maximum pax must be at least 10" }),

    options: z
      .array(
        z.object({
          category: z.string().refine((val) => FOOD_CATEGORIES.includes(val), {
            message: "Category must be one of: " + FOOD_CATEGORIES.join(", "),
          }),
          count: z
            .number()
            .min(1, { message: "Count for category must be at least 1" }),
        })
      )
      .min(1, { message: "Options must be an array with at least 1 value" }),

    inclusions: z
      .array(
        z.object({
          typeOfCustomer: z
            .enum(["Both", "Buffet", "Plated"] as const)
            .refine((val) => ["Both", "Buffet", "Plated"].includes(val), {
              message: "Type of customer must be one of: Both, Buffet, Plated",
            }),
          includes: z
            .string()
            .min(5, {
              message: "Service included must be at least 5 characters",
            })
            .refine((val) => val.trim().length > 0, {
              message: "Service included must not be empty",
            }),
        })
      )
      .min(1, { message: "Inclusions must be an array with at least 1 value" }),

    serviceHours: z
      .number()
      .min(0, { message: "Service Hours must be a positive number" }),

    serviceCharge: z
      .number()
      .min(0, { message: "Service Charge must be a positive number" }),

    eventType: z.enum(eventTypes as [EventType, ...EventType[]]).optional(),

    packageType: z
      .enum(["BuffetPlated", "Event"] as const)
      .refine((val) => typeof val === "string", {
        message: "Package type must be a String",
      })
      .refine((val) => val.trim() !== "", {
        message: "Please provide the package type",
      }),

    imageUrl: z
      .string()
      .url({ message: "Image URL must be a valid URL" })
      .optional()
      .refine((val) => val === "" || typeof val === "string", {
        message: "Image URL must be a String",
      }),

    imageFile: z.instanceof(File).optional(),

    totalServiceFee: z.number().min(0).optional(),

    imageUploadType: z.enum(["url", "upload"]).default("url"),
  })
  .refine((data) => data.packageType !== "Event" || !!data.eventType, {
    path: ["eventType"],
    message: "Please Select an Event Type",
  })
  .refine((data) => data.pricePerPaxWithServiceCharge > data.pricePerPax, {
    path: ["pricePerPaxWithServiceCharge"],
    message:
      "Price per pax with service charge must be greater than price per pax",
  })
  .refine((data) => data.recommendedPax > data.minimumPax, {
    path: ["recommendedPax"],
    message: "Recommended pax must be greater than minimum pax",
  })
  .refine((data) => data.recommendedPax < data.maximumPax, {
    path: ["recommendedPax"],
    message: "Recommended pax must be less than maximum pax",
  })
  .refine((data) => data.maximumPax > data.minimumPax, {
    path: ["maximumPax"],
    message: "Maximum pax must be greater than minimum pax",
  })
  .refine((data) => data.maximumPax > data.recommendedPax, {
    path: ["maximumPax"],
    message: "Maximum pax must be greater than recommended pax",
  })
  .refine(
    (data) => {
      // Check if packageType is "Event" and ensure eventType is provided
      if (data.packageType === "Event" && !data.eventType) {
        return false;
      }
      return true;
    },
    {
      message: "Please provide the event type for the event package",
      path: ["eventType"], // Specify the field to apply the error message
    }
  )
  .refine(
    (data) => {
      // Check if eventType is one of the valid values if it is provided
      if (
        data.eventType &&
        !["Birthday", "Wedding", "Corporate", "Graduation"].includes(
          data.eventType
        )
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Event type must be one of: Birthday, Wedding, Corporate, Graduation",
      path: ["eventType"], // Specify the field to apply the error message
    }
  );

export type PackageFormValues = z.infer<typeof formSchema>;

// Default form values
const defaultValues: PackageFormValues = {
  name: "",
  description: "",
  available: true,
  pricePerPax: 0,
  pricePerPaxWithServiceCharge: 0, // Changed from totalPriceWithService
  minimumPax: 0,
  recommendedPax: 0,
  maximumPax: 0,
  options: [],
  inclusions: [],
  serviceHours: 0,
  serviceCharge: 0,
  eventType: undefined,
  packageType: "BuffetPlated",
  imageUrl: "",
  totalServiceFee: 0,
  imageUploadType: "url",
};

interface UsePackageFormProps {
  initialData?: CateringPackagesProps;
  isEditMode?: boolean;
}

export function usePackageForm({
  initialData,
  isEditMode = false,
}: UsePackageFormProps = {}) {
  const [newOption, setNewOption] = useState<PackageOption>({
    category: "Soup",
    count: 1,
  });
  const [newInclusion, setNewInclusion] = useState<InclusionsProps>({
    typeOfCustomer: "Both",
    includes: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<
    PackageCategory[]
  >([...packageCategories]);
  const [packageTypeSelected, setPackageTypeSelected] = useState(isEditMode);
  const [previousPackageType, setPreviousPackageType] =
    useState<PackageType | null>(null);

  // Convert initialData to form values if in edit mode
  const getInitialValues = (): PackageFormValues => {
    if (!isEditMode || !initialData) return defaultValues;

    // Map packageType from UI display name to internal value
    const mappedPackageType: PackageType =
      initialData.packageType === "BuffetPlated" ? "BuffetPlated" : "Event";

    return {
      packageType: mappedPackageType,
      name: initialData.name,
      description: initialData.description,
      available: initialData.available ?? true,
      eventType: initialData.eventType,
      options: initialData.options,
      pricePerPax: initialData.pricePerPax,
      minimumPax: initialData.minimumPax,
      recommendedPax: initialData.recommendedPax,
      maximumPax: initialData.maximumPax,
      inclusions: initialData.inclusions,
      serviceCharge: initialData.serviceCharge ?? 0,
      serviceHours: initialData.serviceHours ?? 0,
      totalServiceFee:
        (initialData.serviceCharge ?? 0) * (initialData.serviceHours ?? 0),
      pricePerPaxWithServiceCharge:
        initialData.pricePerPaxWithServiceCharge || // Changed from totalPriceWithService
        initialData.pricePerPax +
          ((initialData.serviceCharge ?? 0) * (initialData.serviceHours ?? 0)) /
            initialData.minimumPax,
      imageUrl: initialData.imageUrl ?? "",
      imageUploadType: initialData.imageUrl ? "url" : "upload",
    };
  };

  // Initialize form
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialValues(),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  // Initialize available categories based on existing options
  useEffect(() => {
    if (isEditMode && initialData) {
      const usedCategories = initialData.options.map(
        (option) => option.category
      );
      setAvailableCategories(
        packageCategories.filter((cat) => !usedCategories.includes(cat))
      );

      // Set preview image if available
      if (initialData.imageUrl) {
        setPreviewImage(initialData.imageUrl);
      }
    }
  }, [isEditMode, initialData]);

  // Reset form function
  const resetForm = () => {
    form.reset(defaultValues);
    setNewOption({ category: "Soup", count: 1 });
    setNewInclusion({ typeOfCustomer: "Both", includes: "" });
    setPreviewImage(null);
    setIsSubmitSuccess(false);
    setValidationAttempted(false);
    setAvailableCategories([...packageCategories]);
    setPackageTypeSelected(false);
    setPreviousPackageType(null);
  };

  // Add package option function
  const addPackageOption = () => {
    if (newOption.category && newOption.count > 0) {
      const currentOptions = form.getValues("options") || [];
      form.setValue("options", [...currentOptions, { ...newOption }]);

      // Remove the category from available categories
      setAvailableCategories((prev) =>
        prev.filter((cat) => cat !== newOption.category)
      );

      // Set the next available category if any
      if (availableCategories.length > 1) {
        const nextCategory =
          availableCategories.find((cat) => cat !== newOption.category) ||
          "Soup";
        setNewOption({ category: nextCategory, count: 1 });
      } else {
        // No more categories available
        setNewOption({ category: "Soup", count: 1 });
      }
    }
  };

  // Modify the removePackageOption function to set the deleted category as the selected one
  // Remove package option function
  const removePackageOption = (index: number) => {
    const currentOptions = form.getValues("options");
    const removedOption = currentOptions[index];

    // Add the category back to available categories
    setAvailableCategories((prev) =>
      [...prev, removedOption.category as PackageCategory].sort()
    );

    // Set the removed category as the selected one in the dropdown
    setNewOption({
      category: removedOption.category as PackageCategory,
      count: newOption.count,
    });

    form.setValue(
      "options",
      currentOptions.filter((_, i) => i !== index)
    );
  };

  // Add inclusion function
  const addInclusion = () => {
    if (newInclusion.includes.trim() !== "") {
      const currentInclusions = form.getValues("inclusions") || [];
      form.setValue("inclusions", [
        ...currentInclusions,
        {
          typeOfCustomer: newInclusion.typeOfCustomer,
          includes: newInclusion.includes.trim(),
        },
      ]);
      setNewInclusion({ typeOfCustomer: "Both", includes: "" });
    }
  };

  // Remove inclusion function
  const removeInclusion = (index: number) => {
    const currentInclusions = form.getValues("inclusions");
    form.setValue(
      "inclusions",
      currentInclusions.filter((_, i) => i !== index)
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
  const onSubmit = async (
    data: PackageFormValues,
    mode: "create" | "update",
    id?: string
  ) => {
    const { imageUrl, ...rest } = data;
    let isSuccess = false;

    // Map packageType from internal value to UI display name
    // const displayPackageType =
    //   data.packageType === "BuffetPlated" ? "BuffetPlated" : "Event";

    // Calculate pricePerPaxWithServiceCharge if not already set
    // const serviceCharge = data.serviceCharge || 0;
    // const serviceHours = data.serviceHours || 0;
    // const minimumPax = data.minimumPax || 1; // Avoid division by zero
    // const pricePerPax = data.pricePerPax || 0;

    // const totalServiceFee = serviceCharge * serviceHours;
    // const serviceChargePerPax =
    //   minimumPax > 0 ? totalServiceFee / minimumPax : 0;
    // const pricePerPaxWithServiceCharge = pricePerPax + serviceChargePerPax;

    // Create package object
    // const packageData: CateringPackagesProps = {
    //   name: data.name,
    //   description: data.description,
    //   available: data.available,
    //   pricePerPax: data.pricePerPax,
    //   minimumPax: data.minimumPax,
    //   recommendedPax: data.recommendedPax,
    //   maximumPax: data.maximumPax,
    //   options: data.options.map((option) => ({
    //     ...option,
    //     category: option.category as PackageCategory, // Cast to PackageCategory
    //   })),
    //   inclusions: data.inclusions,
    //   imageUrl: data.imageUrl || "",
    //   serviceHours: data.serviceHours || 0,
    //   serviceCharge: data.serviceCharge || 0,
    //   eventType: data.packageType === "Event" ? data.eventType : undefined,
    //   packageType: displayPackageType,
    //   pricePerPaxWithServiceCharge: pricePerPaxWithServiceCharge,
    // };

    const packageData: Omit<CateringPackagesProps, "_id"> = {
      ...rest,
      rating: isEditMode && initialData ? initialData.rating : 0,
      ratingCount: isEditMode && initialData ? initialData.ratingCount : 0,
      ...(imageUrl !== "" && { imageUrl }), // Exclude the imageUrl if it's null
      options: data.options.map((option) => ({
        ...option,
        category: option.category as PackageCategory, // Cast category to PackageCategory
      })),
    };

    console.log(
      `${mode === "update" ? "Updating" : "Submitting"} package:`,
      packageData
    );

    console.log("Submitted data:", JSON.stringify(packageData, null, 2));

    try {
      let response;

      if (mode === "create") {
        // Create package API request
        response = await api.post("/packages", packageData);
        toast.success(`${packageData.name} is successfully added to packages`);
        console.log(
          "Submitted data IN JSON JSON:",
          JSON.stringify(response, null, 2)
        );
      } else if (mode === "update" && id) {
        // Update package API request
        console.log("ID OF THE PACKAGE:", id);
        response = await api.put(`/packages/${id}`, packageData);
        toast.success(`${packageData.name} is successfully updated`);
      }

      isSuccess = true;
      setIsSubmitSuccess(true);
      console.log("MESSAGE", response?.data.message);
      console.log("DATAA", response?.data.data);
    } catch (err: unknown) {
      isSuccess = false;
      console.log("ERROR", err);

      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected Error Occur";
        if (err.response?.status === 400) {
          toast.error(`Bad Request: ${message}`);
        } else if (err.response?.status === 403) {
          toast.error(`Unauthorized: ${message}`);
        } else if (err.response?.status === 404) {
          toast.error(`Not Found: ${message}`);
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }

    return isSuccess;
  };

  // Helper function to get fields to validate for each step
  const getFieldsToValidate = (
    step: number
  ): Array<keyof PackageFormValues> => {
    switch (step) {
      case 0:
        return ["packageType"];
      case 1:
        return [
          "name",
          "description",
          "available",
          ...(form.getValues("packageType") === "Event"
            ? (["eventType"] as Array<keyof PackageFormValues>)
            : []),
        ];
      case 2:
        return ["options"];
      case 3:
        return ["pricePerPax", "minimumPax", "recommendedPax", "maximumPax"];
      case 4:
        return ["inclusions"]; //IN EDIT MODE THIS IS ERROR SINCE THE PACKAGE META DATA DOESNT HAVE FOR TYPE IN INCLUSIONS
      case 5:
        return []; // Make image optional by not validating any fields
      default:
        return [];
    }
  };

  // Validate a specific step
  const validateStep = async (step: number): Promise<boolean> => {
    setValidationAttempted(true);
    const fieldsToValidate = getFieldsToValidate(step);
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setValidationAttempted(false);
    }

    return isValid;
  };

  // Set package type selected
  const selectPackageType = (type: PackageType) => {
    const currentType = form.getValues("packageType");

    // Store the previous type before changing
    setPreviousPackageType(currentType);

    // If changing from one type to another, clear fields not relevant to the new type
    if (currentType !== type) {
      if (type === "BuffetPlated") {
        // Clear Event-specific fields
        form.setValue("eventType", undefined);
      } else if (type === "Event") {
        // Clear BuffetPlated-specific fields
        // (none to clear in this case, but would go here)
      }
    }

    form.setValue("packageType", type);
    setPackageTypeSelected(true);
  };

  // Calculate service fees and total price
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      // Calculate service fees and total price
      if (
        name === "serviceCharge" ||
        name === "serviceHours" ||
        name === "pricePerPax" ||
        name === "minimumPax"
      ) {
        const serviceCharge = (value.serviceCharge as number) || 0;
        const serviceHours = (value.serviceHours as number) || 0;
        const pricePerPax = (value.pricePerPax as number) || 0;
        const minimumPax = (value.minimumPax as number) || 0;

        const totalServiceFee = serviceCharge * serviceHours;
        form.setValue("totalServiceFee", totalServiceFee);

        if (minimumPax > 0) {
          const serviceChargePerPax = totalServiceFee / minimumPax;
          const pricePerPaxWithServiceCharge =
            pricePerPax + serviceChargePerPax;
          form.setValue(
            "pricePerPaxWithServiceCharge",
            pricePerPaxWithServiceCharge
          ); // Changed from totalPriceWithService
        }
      }

      // Watch for package type changes
      if (name === "packageType" && previousPackageType !== null) {
        const newType = value.packageType as PackageType;

        // If changing from one type to another, clear fields not relevant to the new type
        if (previousPackageType !== newType) {
          if (newType === "BuffetPlated") {
            // Clear Event-specific fields
            form.setValue("eventType", undefined);
          } else if (newType === "Event") {
            // Clear BuffetPlated-specific fields
            // (none to clear in this case, but would go here)
          }

          // Update previous type
          setPreviousPackageType(newType);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, previousPackageType]);

  return {
    form,
    newOption,
    setNewOption,
    newInclusion,
    setNewInclusion,
    previewImage,
    setPreviewImage,
    isSubmitSuccess,
    validationAttempted,
    availableCategories,
    packageTypeSelected,
    addPackageOption,
    removePackageOption,
    addInclusion,
    removeInclusion,
    handleFileChange,
    onSubmit,
    validateStep,
    resetForm,
    selectPackageType,
    isEditMode,
  };
}
