import React from "react";
import { Building2, Mail, Phone, MapPin, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

type BusinessDetailsProps = {
  businessData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
  };
  updateField: (field: string, value: string) => void;
};

export function BusinessDetailsForm() {
  const { control } = useFormContext<SettingsValues>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
        <CardDescription>
          Update your business information visible to customers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Business Name */}
          <FormField
            control={control}
            name="name"
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

          {/* Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="email" className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Contact Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your contact email"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="phone" className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Phone Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    {...field}
                    required
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
                  Business Address
                </FormLabel>
                <FormControl>
                  <Input
                    id="address"
                    placeholder="Enter your business address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel
                htmlFor="description"
                className="flex gap-2 items-center"
              >
                <FileText className="w-4 h-4 text-muted-foreground" />
                Business Description
              </FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Describe your catering business"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-sm text-muted-foreground">
                This description will appear on your public profile and in
                search results
              </p>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
