import {
  businessMetadata,
  ownerMetadata,
} from "@/lib/caterer/business-metadata";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  map: z.object({
    latitude: z.number(),
    longitude: z.number(),
    zoom: z.number(),
    address: z.string(),
  }),
  label: z.string().min(1, "Label is required"),
  aboutDescription: z.string().min(1, "About Description is required"),
  description: z.string().min(1, "Description is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email"),
  logo: z.string().min(1, "Logo is required"),
  businessHours: z.string().min(1, "Business Hours is required"),
  businessDays: z.string().min(1, "Business Days is required"),
  socialMediaLinks: z.array(
    z.object({
      platform: z.string().min(1, "Platform is required"),
      url: z.string().url("Invalid URL"),
    })
  ),
  ownerName: z.string().min(1, "Owner Name is required"),
  ownerTitle: z.string().min(1, "Owner Title is required"),
  ownerDescription: z.string().min(1, "Owner Description is required"),
  ownerEmail: z.string().email("Invalid email"),
  ownerPhone: z.string().min(1, "Owner Phone is required"),
  ownerProfilePic: z.string().min(1, "Owner Profile Picture is required"),
});

export type SettingsValues = z.infer<typeof settingsSchema>;

const defaultValues: SettingsValues = {
  name: businessMetadata.name,
  address: businessMetadata.address,
  map: {
    latitude: businessMetadata.map.latitude,
    longitude: businessMetadata.map.longitude,
    zoom: businessMetadata.map.zoom,
    address: businessMetadata.map.address,
  },
  label: businessMetadata.label,
  aboutDescription: businessMetadata.aboutDescription,
  description: businessMetadata.description,
  phone: businessMetadata.phone,
  email: businessMetadata.email,
  logo: businessMetadata.logo,
  businessHours: businessMetadata.businessHours,
  businessDays: businessMetadata.businessDays,
  socialMediaLinks: businessMetadata.socialMediaLinks,
  ownerName: ownerMetadata.name,
  ownerTitle: ownerMetadata.title,
  ownerDescription: ownerMetadata.description,
  ownerEmail: ownerMetadata.email,
  ownerPhone: ownerMetadata.phone,
  ownerProfilePic: ownerMetadata.profilePic,
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

  return { settingsForm, onSubmit, validateStep, setIsSubmitSuccess, isSubmitSuccess };
}
