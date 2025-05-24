"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import api from "@/lib/api/axiosInstance";
import { BusinessMetadataProps } from "@/lib/caterer/business-metadata";
import { CustomerProps } from "@/types/customer-types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const businessSettingsSchema = z.object({
  businessName: z
    .string()
    .min(5, { message: "Business name must be at least 5 characters long" })
    .trim(),

  map: z.object({
    link: z
      .string()
      .url({ message: "Link URL must be a valid URL" })
      .refine(
        (url) =>
          url.includes("google.com/maps") || url.includes("maps.app.goo.gl"),
        {
          message: "Link must be a valid Google Maps URL",
        }
      ),

    embeddedLink: z
      .string()
      .url({ message: "Embedded link must be a valid URL" })
      .refine((url) => url.includes("google.com/maps/embed"), {
        message: "Embedded link must be a valid embedded Google Maps URL",
      }),

    address: z
      .string()
      .min(5, {
        message: "Business address must be at least 5 characters long",
      })
      .trim(),
  }),

  systemName: z
    .string()
    .min(5, { message: "System name must be at least 5 characters long" })
    .trim(),

  tagline: z
    .string()
    .min(5, { message: "Tagline must be at least 5 characters long" })
    .trim(),

  // businessLogo: z.any().optional().nullable(),

  businessHours: z
    .string()
    .min(5, { message: "Business hours must be at least 5 characters long" })
    .trim(),

  businessDays: z
    .string()
    .min(5, { message: "Business Days must be at least 5 characters long" })
    .trim(),

  socialMediaLinks: z.array(
    z.object({
      platform: z
        .string()
        .min(5, { message: "Platform must be at least 5 characters long" })
        .trim(),

      url: z.any().optional().nullable(),
    })
  ),
});

const accountSettingsSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full Name must be at least 2 characters")
      .max(50, "Full Name must not exceed 50 characters"),

    email: z.string().email("Please enter a valid email address"),

    contactNumber: z
      .string()
      .min(1, "Phone Number is required")
      .refine((val) => /^\+639\d{9}$/.test(val), {
        message: "Phone number must start with 9 and have 10 digits total",
      }),

    profileImage: z.any().optional().nullable(),

    currentPassword: z.string().optional(),

    newPassword: z.string().optional(),

    confirmNewPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    const hasAnyValue =
      !!currentPassword || !!newPassword || !!confirmNewPassword;

    const isEmpty = (val: unknown) => !val || val === "";

    if (hasAnyValue) {
      if (isEmpty(currentPassword)) {
        ctx.addIssue({
          code: "custom",
          path: ["currentPassword"],
          message: "Current Password field is required",
        });
      }

      if (isEmpty(newPassword)) {
        ctx.addIssue({
          code: "custom",
          path: ["newPassword"],
          message: "New Password field is required",
        });
      }

      if (isEmpty(confirmNewPassword)) {
        ctx.addIssue({
          code: "custom",
          path: ["confirmNewPassword"],
          message: "Confirm New Password field is required",
        });
      }

      if (
        isEmpty(currentPassword) ||
        isEmpty(newPassword) ||
        isEmpty(confirmNewPassword)
      )
        return;

      if (currentPassword === newPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["newPassword"],
          message: "New password must not be the same as Current Password",
        });
      }

      if (newPassword !== confirmNewPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["confirmNewPassword"],
          message: "Passwords do not match",
        });
      }

      const passwordRegex = /^[a-zA-Z0-9]+$/;

      const validatePassword = (
        field: "currentPassword" | "newPassword" | "confirmNewPassword",
        value: string
      ) => {
        if (value.length < 6 || value.length > 15) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: `${field} must be between 6 and 15 characters`,
          });
        }

        if (!passwordRegex.test(value)) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: `${field} must be alphanumeric`,
          });
        }
      };

      validatePassword("currentPassword", currentPassword!);
      validatePassword("newPassword", newPassword!);
      validatePassword("confirmNewPassword", confirmNewPassword!);
    }
  });

export type AccountSettingsValues = z.infer<typeof accountSettingsSchema>;

export type BusinessSettingsValues = z.infer<typeof businessSettingsSchema>;

const defaultBusinessValues: BusinessSettingsValues = {
  businessName: "",
  map: {
    link: "",
    embeddedLink: "",
    address: "",
  },
  systemName: "",
  tagline: "",
  // businessLogo: businessLogo,
  businessHours: "",
  businessDays: "",
  socialMediaLinks: [{ platform: "", url: "" }],
};

const defaultAccountValues: AccountSettingsValues = {
  fullName: "",
  email: "",
  contactNumber: "",
  profileImage: "/placeholder.svg",
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export function useSettingsForm() {
  const [customerData, setCustomerData] = useState<CustomerProps>();
  const [businessSettingsData, setBusinessSettingsData] =
    useState<BusinessMetadataProps>();
  const { customer } = useAuthContext();

  useEffect(() => {
    if (!customer) return;

    const getCustomer = async () => {
      try {
        const response = await api.get(`/customers/${customer._id}`);
        setCustomerData(response.data.data);

        // Save only if window is defined
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "customerData",
            JSON.stringify(response.data.data)
          );
        }

        console.log(response.data.data);
      } catch (err: unknown) {
        console.log("ERRRORRR", err);

        if (axios.isAxiosError<{ error: string }>(err)) {
          const message = err.response?.data.error || "Unexpected Error Occur";

          console.error("ERROR FETCHING CUSTOMER DATA", message);
        } else {
          console.error("Something went wrong. Please try again.");
        }
      }
    };

    getCustomer();
  }, []);

  useEffect(() => {
    const getBusinessSettingsData = async () => {
      try {
        const response = await api.get(`/business-settings`);
        setBusinessSettingsData(response.data.data);

        // Save only if window is defined
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "businessSettingsData",
            JSON.stringify(response.data.data)
          );
        }

        console.log(response.data.data);
      } catch (err: unknown) {
        console.log("ERRRORRR", err);

        if (axios.isAxiosError<{ error: string }>(err)) {
          const message = err.response?.data.error || "Unexpected Error Occur";

          console.error("ERROR FETCHING BUSINESS SETTINGS DATA", message);
        } else {
          console.error("Something went wrong. Please try again.");
        }
      }
    };

    getBusinessSettingsData();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR issues

    const saved = localStorage.getItem("customerData");
    if (saved) {
      setCustomerData(JSON.parse(saved));
    }
  }, []);

  const accountSettingsForm = useForm<AccountSettingsValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: defaultAccountValues,
    mode: "all",
    reValidateMode: "onSubmit",
  });

  const businessSettingsForm = useForm<BusinessSettingsValues>({
    resolver: zodResolver(businessSettingsSchema),
    defaultValues: defaultBusinessValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (!customerData) return;

    accountSettingsForm.reset({
      fullName: customerData.fullName,
      email: customerData.email,
      contactNumber: customerData.contactNumber || "",
      profileImage: customerData.profileImage,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    console.log("Form reset with values:", {
      fullName: customerData.fullName,
      email: customerData.email,
      contactNumber: customerData.contactNumber,
      profileImage: customerData.profileImage,
    });
  }, [customerData, accountSettingsForm]);

  useEffect(() => {
    if (!businessSettingsData) return;

    businessSettingsForm.reset({
      businessName: businessSettingsData.businessName,
      map: businessSettingsData.map,
      systemName: "",
      tagline: businessSettingsData.tagline,
      // businessLogo: businessLogo,
      businessHours: businessSettingsData.businessHours,
      businessDays: businessSettingsData.businessDays,
      socialMediaLinks: businessSettingsData.socialMediaLinks,
    });

    console.log("Form reset with values:", {
      businessName: businessSettingsData.businessName,
      map: businessSettingsData.map,
      tagline: businessSettingsData.tagline,
      businessHours: businessSettingsData.businessHours,
    });
  }, [businessSettingsData]);

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const validateAccountStep = async (): Promise<boolean> => {
    const isValid = await accountSettingsForm.trigger();
    return isValid;
  };

  const validateBusinessStep = async (): Promise<boolean> => {
    const isValid = await businessSettingsForm.trigger();
    return isValid;
  };

  // Submit form function for Account Settings
  // Add this function to your useSettingsForm hook to properly handle form data with files
  const onSubmitAccountSettings = async (data: AccountSettingsValues) => {
    console.log("DATA AFTER SUBMITTING ACCOUNT SETTINGS", data);

    let isSuccess = false;

    try {
      // Create FormData object for multipart/form-data submission
      const formData = new FormData();

      // Add all text fields to the FormData
      Object.keys(data).forEach((key) => {
        // Skip the profileImage field as we'll handle it separately
        if (key !== "profileImage") {
          formData.append(
            key,
            data[key as keyof AccountSettingsValues] as string
          );
        }
      });

      // Handle the profile image - could be a File object or a string URL
      if (data.profileImage) {
        if (typeof data.profileImage === "object") {
          // If it's a File object, append it with the correct field name
          formData.append("profileImage", data.profileImage);
        } else if (
          typeof data.profileImage === "string" &&
          data.profileImage.startsWith("http")
        ) {
          // If it's a URL and hasn't changed, we don't need to send it
          // But if you need to keep track of the existing URL, uncomment:
          // formData.append('existingProfileImage', data.profileImage);
        }
      }

      // Make the API request with the FormData
      const response = await api.put(`/customers/${customer?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully");
      isSuccess = true;
      setIsSubmitSuccess(true);
      console.log("LOG RESPONSE AFTER SUBMITTING", response.data);
    } catch (err: unknown) {
      isSuccess = false;
      console.log("ERRORRRR", err);
      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected Error Occur";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }

    return isSuccess;
  };

  // Submit form function for Business Settings
  const onSubmitBusinessSettings = (data: BusinessSettingsValues) => {
    // Create menu item object

    console.log("SUBMITTED BUSINESS SETTINGS", data);
    const settings: BusinessSettingsValues = {
      ...data,
    };
    // Here you would typically send this to your API
    // If there's an image file, you would upload it first and then update the imageUrl

    // Show success message
    setIsSubmitSuccess(true);

    // Return the new menu item
    return settings;
  };

  return {
    accountSettingsForm,
    businessSettingsForm,
    onSubmitAccountSettings,
    onSubmitBusinessSettings,
    validateAccountStep,
    validateBusinessStep,
    setIsSubmitSuccess,
    isSubmitSuccess,
  };
}
