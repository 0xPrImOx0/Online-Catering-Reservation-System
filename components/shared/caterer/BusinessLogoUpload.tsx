"use client";

import React, { useCallback, useRef, useState } from "react";
import { PenSquare, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { BusinessSettingsValues } from "@/hooks/use-settings-form";
import Image from "next/image";
import ImageDropzone from "./ImageDropzone";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function BusinessLogoUpload() {
  const { watch, setValue } = useFormContext<BusinessSettingsValues>();
  const { open } = useSidebar();

  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  // Watch the profilePicture field to get the current value
  const watchedPic = watch("businessLogo");

  // Store the initial profile picture only once using useRef
  const initialProfilePicRef = useRef<string>(
    typeof watchedPic === "string"
      ? watchedPic
      : "/placeholder.svg?height=256&width=256"
  );

  // Derive current preview image
  const displayImage = previewImage
    ? previewImage
    : initialProfilePicRef.current;

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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
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
          setValue("businessLogo", file);

          // Hide the edit mode after successful upload
          setIsEditingPhoto(false);
        }
      }
    },
    [setValue]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (validateFile(file)) {
        // Create a preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);

        // Set the file in the form
        setValue("businessLogo", file);

        // Hide the edit mode after successful upload
        setIsEditingPhoto(false);
      }
    }
  };

  const cancelImageEdit = () => {
    setPreviewImage(null);
    setIsEditingPhoto(false);
  };

  const startImageEdit = () => {
    setIsEditingPhoto(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Logo</CardTitle>
        <CardDescription>
          Upload your business logo to display on your profile and invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "flex flex-col gap-6 items-start",
            !isEditingPhoto && "justify-center md:justify-center",
            open ? "md:flex-col lg:flex-row" : "lg:flex-row"
          )}
        >
          <div
            className={cn("w-full", isEditingPhoto ? "lg:w-1/2" : "lg:w-auto")}
          >
            <div className="relative">
              <div className="relative size-80 rounded-full overflow-hidden border-4 border-muted shadow-md mx-auto my-10">
                <Image
                  src={displayImage}
                  alt="Profile"
                  fill
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.svg?height=256&width=256";
                  }}
                />
              </div>

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
          </div>

          <div
            className={cn(
              "space-y-4 w-full lg:w-1/2 m-auto",
              !isEditingPhoto && "hidden"
            )}
          >
            <ImageDropzone
              dragActive={dragActive}
              fileError={fileError}
              isVisible={isEditingPhoto}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
