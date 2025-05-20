"use client";

import {
  businessMetadata,
  ownerMetadata,
} from "@/lib/caterer/business-metadata";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

  businessLogo: z.string().min(1, "Logo is required"),

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
    ownerName: z
      .string()
      .min(2, "Full Name must be at least 2 characters")
      .max(50, "Full Name must not exceed 50 characters"),

    ownerDescription: z.string().min(1, "Owner Description is required"),

    ownerEmail: z.string().email("Please enter a valid email address"),

    ownerPhone: z
      .string()
      .min(1, "Phone Number is required")
      .refine((val) => /^\+639\d{9}$/.test(val), {
        message: "Phone number must start with 9 and have 10 digits total",
      }),

    ownerProfilePic: z.string().min(1, "Owner Profile Picture is required"),

    currentPassword: z
      .string()
      .nonempty({ message: "Password field is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(15, "Password must be at most 15 characters")
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),

    newPassword: z
      .string()
      .nonempty({ message: "Confirm Password field is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(15, "Password must be at most 15 characters")
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),

    confirmNewPassword: z
      .string()
      .nonempty({ message: "Confirm Password field is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(15, "Password must be at most 15 characters")
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must not be the same as Current Password",
  })
  .refine((data) => data.currentPassword !== data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "New password must not be the same as Current Password",
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

const {
  name: ownerName,
  description: ownerDescription,
  email,
  phone,
  profilePic,
} = ownerMetadata;

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
  ownerName: ownerName,
  ownerDescription: ownerDescription,
  ownerEmail: email,
  ownerPhone: phone,
  ownerProfilePic: profilePic,
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export function useSettingsForm() {
  const accountSettingsForm = useForm<AccountSettingsValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: defaultAccountValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const businessSettingsForm = useForm<BusinessSettingsValues>({
    resolver: zodResolver(businessSettingsSchema),
    defaultValues: defaultBusinessValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

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
