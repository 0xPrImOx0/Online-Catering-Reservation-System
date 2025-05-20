"use client";

import React from "react";
import { Building2, Link, Map, MapPin, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { BusinessSettingsValues } from "@/hooks/use-settings-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MapComponent from "../MapComponent";
import { Label } from "@/components/ui/label";

export function BusinessDetailsForm() {
  const form = useFormContext<BusinessSettingsValues>();

  const embeddedLink = form.watch("map.embeddedLink");
  const hasError = !!form.formState.errors?.map?.embeddedLink;
  const showMapPreview = embeddedLink && !hasError;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>
          Keep your business details up to date for greater engagement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Business Name */}
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel
                  htmlFor="business-name"
                  className="flex gap-2 items-center"
                >
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  Business Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="business-name"
                    placeholder="Enter your business name"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tagline */}
          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel
                  htmlFor="tagline"
                  className="flex gap-2 items-center"
                >
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  Business Tagline <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="tagline"
                    placeholder="Describe your catering business"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address */}
        <FormField
          control={form.control}
          name="map.address"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="address" className="flex gap-2 items-center">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                Business Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="address"
                  placeholder="Enter your business address"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Google Maps URL */}
          <FormField
            control={form.control}
            name="map.link"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel
                  htmlFor="google-maps-url"
                  className="flex gap-2 items-center"
                >
                  <Link className="w-4 h-4 text-muted-foreground" />
                  Business Address Google Maps URL{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="google-maps-url"
                    placeholder="Enter Google Maps URL of your business address"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will be used for redirecting to Google Maps in Contact Us
                  Page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Embedded Google Maps URL */}
          <FormField
            control={form.control}
            name="map.embeddedLink"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel
                  htmlFor="google-maps-embedded-url"
                  className="flex gap-2 items-center"
                >
                  <Link className="w-4 h-4 text-muted-foreground" />
                  Business Address Embedded Google Maps URL{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="google-maps-embedded-url"
                    placeholder="Enter Google Maps Embedded URL of your business address"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will be used for embedding Google Maps in Contact Us Page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {showMapPreview && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Map className="size-6" />
              <Label className="font-bold text-lg">
                Business Address Google Maps Preview
              </Label>
            </div>
            <MapComponent
              isCaterer
              embeddedURL={form.watch("map.embeddedLink")}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
