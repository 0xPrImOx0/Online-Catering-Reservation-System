import {
  businessMetadata,
  ownerMetadata,
} from "@/lib/caterer/business-metadata";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const settingsSchema = z.object({
  businessName: z.string().min(1, "Name is required"),

  address: z.string().min(1, "Address is required"),

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

    address: z.string(),
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

  ownerName: z.string().min(1, "Owner Name is required"),

  ownerDescription: z.string().min(1, "Owner Description is required"),

  ownerEmail: z.string().email("Invalid email"),

  ownerPhone: z.string().min(1, "Owner Phone is required"),

  ownerProfilePic: z.string().min(1, "Owner Profile Picture is required"),
});

export type SettingsValues = z.infer<typeof settingsSchema>;

const {
  businessName,
  address,
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

const defaultValues: SettingsValues = {
  businessName: businessName,
  address: address,
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
  ownerName: ownerName,
  ownerDescription: ownerDescription,
  ownerEmail: email,
  ownerPhone: phone,
  ownerProfilePic: profilePic,
};

export function useSettingsForm() {
  const settingsForm = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const validateStep = async (): Promise<boolean> => {
    const isValid = await settingsForm.trigger();
    return isValid;
  };

  // Submit form function
  const onSubmit = (data: SettingsValues) => {
    // Create menu item object
    const settings: SettingsValues = {
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
    settingsForm,
    onSubmit,
    validateStep,
    setIsSubmitSuccess,
    isSubmitSuccess,
  };
}
