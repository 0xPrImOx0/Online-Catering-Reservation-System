"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { User, Mail, Phone, X, PenSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import type { AccountSettingsValues } from "@/hooks/use-settings-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImageDropzone from "./ImageDropzone";

export function ProfileInformation() {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<AccountSettingsValues>();

  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<string | null>(null);

  // Derive current display image

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setFileError("Only image files are allowed");
      return false;
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setFileError("File size must be less than 10MB");
      return false;
    }

    setFileError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      if (validateFile(file)) {
        // Create a preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);

        // Set the file in the form
        if (!currentProfile) {
          setCurrentProfile(watch("profileImage"));
        }

        setValue("profileImage", file);

        // Hide the edit mode after successful upload
        setIsEditingPhoto(false);
        console.log("File selected:", file.name, file.type, file.size);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (validateFile(file)) {
        // Create a preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);

        // Set the file in the form
        if (!currentProfile) {
          setCurrentProfile(watch("profileImage"));
        }

        setValue("profileImage", file);

        // Hide the edit mode after successful upload
        setIsEditingPhoto(false);
        console.log("File selected:", file.name, file.type, file.size);
      }
    }
  };

  const cancelImageEdit = () => {
    setPreviewImage(currentProfile);
    console.log("GET VALUES OF PROFILE IMAGE", watch("profileImage"));
    console.log("GET VALUES OF CURRENT  PROFILE IMAGE", currentProfile);
    // Only set the value if it's not an empty string
    const currentImage = !currentProfile
      ? watch("profileImage")
      : currentProfile;

    setValue("profileImage", currentImage);

    console.log("GET VALUES OF AFTERRRR PROFILE IMAGE", watch("profileImage"));

    setIsEditingPhoto(false);
  };

  const startImageEdit = () => {
    setIsEditingPhoto(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            {/* Large Profile Picture Display */}
            <div className="relative">
              <div className="relative size-64 rounded-full overflow-hidden border-4 border-muted shadow-md">
                <Image
                  src={
                    previewImage ||
                    watch("profileImage") ||
                    "/placeholder.svg?height=256&width=256"
                  }
                  alt="Profile"
                  fill
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.svg?height=256&width=256";
                  }}
                />
              </div>

              {/* Edit/Close Button */}
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-0 right-0 rounded-full shadow-md"
                onClick={isEditingPhoto ? cancelImageEdit : startImageEdit}
              >
                {isEditingPhoto ? (
                  <X className="w-4 h-4" />
                ) : (
                  <PenSquare className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Drag & Drop Area - Only shown when editing */}
            <ImageDropzone
              dragActive={dragActive}
              fileError={fileError}
              isVisible={isEditingPhoto}
              className="lg:hidden"
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
            />
          </div>

          {/* Personal Information Section */}
          <div className="space-y-6 md:col-span-2">
            {/* Full Name */}
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    htmlFor="full-name"
                    className="flex gap-2 items-center"
                  >
                    <User className="w-4 h-4 text-muted-foreground" /> Full Name{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="full-name"
                      placeholder="Enter your full name"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    htmlFor="email"
                    className="flex gap-2 items-center"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground" /> Email
                    Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      required
                    />
                  </FormControl>
                  {errors.email ? (
                    <FormMessage />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      This email will be used for account notifications and
                      communications
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel
                    htmlFor="contactNumber"
                    className="flex gap-2 items-center"
                  >
                    <Phone className="w-4 h-4 text-muted-foreground" /> Phone
                    Number <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      defaultCountry="PH"
                      placeholder="912 345 6789"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Drag & Drop Area - Only shown when editing */}
        <ImageDropzone
          dragActive={dragActive}
          fileError={fileError}
          isVisible={isEditingPhoto}
          className="max-lg:hidden"
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
        />
      </CardContent>
    </Card>
  );
}
