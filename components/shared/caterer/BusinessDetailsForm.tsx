import React from "react";
import { Building2, MapPin, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { SettingsValues } from "@/hooks/use-settings-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function BusinessDetailsForm() {
  const { control } = useFormContext<SettingsValues>();
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
            control={control}
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

          {/* Address */}
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel
                  htmlFor="address"
                  className="flex gap-2 items-center"
                >
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
        </div>

        {/* Tagline */}
        <FormField
          control={control}
          name="tagline"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="tagline" className="flex gap-2 items-center">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Business Tagline <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  id="tagline"
                  placeholder="Describe your catering business"
                  className="min-h-[120px]"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
