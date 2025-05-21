"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import api from "@/lib/api/axiosInstance";
import { businessMetadata } from "@/lib/caterer/business-metadata";
import { CustomerProps } from "@/types/customer-types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const businessSettingsSchema = z.object({
  businessName: z.string().min(1, "Name is required"),

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

    address: z.string().min(1, "Address is required"),
  }),

  systemName: z.string().min(1, "Sys is required"),

  tagline: z.string().min(1, "Tagline is required"),

  businessLogo: z.any().optional().nullable(),

  businessHours: z.string().min(1, "Business Hours is required"),

  businessDays: z.string().min(1, "Business Days is required"),

  socialMediaLinks: z.array(
    z.object({
      platform: z.string().min(1, "Platform is required"),

      url: z.string().url("Invalid URL"),
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

const {
  businessName,
  map,
  systemName,
  tagline,
  businessLogo,
  businessHours,
  businessDays,
  socialMediaLinks,
} = businessMetadata;

const defaultBusinessValues: BusinessSettingsValues = {
  businessName: businessName,
  map: {
    link: map.link,
    embeddedLink: map.embeddedLink,
    address: map.address,
  },
  systemName: systemName,
  tagline: tagline,
  businessLogo: businessLogo,
  businessHours: businessHours,
  businessDays: businessDays,
  socialMediaLinks: socialMediaLinks,
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
  }, [customerData, accountSettingsForm]);

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
  const onSubmitAccountSettings = (data: AccountSettingsValues) => {
    // Create menu item object
    const settings: AccountSettingsValues = {
      ...data,
    };
    // Here you would typically send this to your API
    // If there's an image file, you would upload it first and then update the imageUrl

    // Show success message
    setIsSubmitSuccess(true);

    // Return the new menu item
    return settings;
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
