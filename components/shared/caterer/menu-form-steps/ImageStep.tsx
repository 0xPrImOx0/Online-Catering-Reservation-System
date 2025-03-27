"use client";

import { useRef } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ImageIcon, Upload, Link } from "lucide-react";
import type { useMenuForm } from "@/hooks/use-menu-form";
import Image from "next/image";

interface ImageStepProps {
  formHook: ReturnType<typeof useMenuForm>;
}

export function ImageStep({ formHook }: ImageStepProps) {
  const { form, previewImage, handleFileChange, validationAttempted } =
    formHook;
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="imageUploadType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              Image Source
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url" className="flex items-center">
                    <Link className="h-4 w-4 mr-2" />
                    Provide URL
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload" className="flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            {validationAttempted && <FormMessage />}
          </FormItem>
        )}
      />

      {form.watch("imageUploadType") === "url" ? (
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Enter a URL for the menu item image
              </FormDescription>
              {validationAttempted && <FormMessage />}
            </FormItem>
          )}
        />
      ) : (
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Upload Image</Label>
            <div className="mt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full h-24 flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-6 w-6 mb-2" />
                <span>Click to upload</span>
                <span className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, GIF up to 10MB
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {(form.watch("imageUrl") || previewImage) && (
        <div className="mt-4">
          <Label className="text-base font-medium">Image Preview</Label>
          <div className="mt-2 border rounded-md overflow-hidden aspect-video flex items-center justify-center bg-muted">
            {form.watch("imageUploadType") === "url" ? (
              form.watch("imageUrl") ? (
                <Image
                  src={form.watch("imageUrl") || "/placeholder.svg"}
                  alt="Menu item preview"
                  className="max-h-full max-w-full object-contain"
                  onError={() => {
                    console.log("Error loading image");
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-10 w-10 mb-2" />
                  <span>No image provided</span>
                </div>
              )
            ) : previewImage ? (
              <Image
                src={previewImage || "/placeholder.svg"}
                alt="Menu item preview"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="h-10 w-10 mb-2" />
                <span>No image uploaded</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
