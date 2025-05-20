import React from "react";
import { User, Mail, Phone } from "lucide-react";
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
import { AccountSettingsValues } from "@/hooks/use-settings-form";

export function ProfileInformation() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AccountSettingsValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-6 items-start md:flex-row">
          <div className="space-y-4 w-full md:w-2/3">
            {/* Full Name */}
            <FormField
              control={control}
              name="ownerName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    htmlFor="full-name"
                    className="flex gap-2 items-center"
                  >
                    <User className="w-4 h-4 text-muted-foreground" />
                    Full Name <span className="text-red-500">*</span>
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
              name="ownerEmail"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    htmlFor="email"
                    className="flex gap-2 items-center"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email Address <span className="text-red-500">*</span>
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
                  {errors.ownerEmail ? (
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
              name="ownerPhone"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel
                    htmlFor="phone"
                    className="flex gap-2 items-center"
                  >
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Phone Number <span className="text-destructive">*</span>
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

          {/* <div className="w-full md:w-1/3">
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={accountData.profilePicture || "/placeholder.svg"}
                    alt="Profile"
                    className="object-cover w-32 h-32 rounded-full border-2 border-muted"
                  />
                  <div
                    className="flex absolute inset-0 justify-center items-center bg-black bg-opacity-50 rounded-full opacity-0 transition-opacity cursor-pointer group-hover:opacity-100"
                    onClick={triggerFileInput}
                  >
                    <Upload className="w-6 h-6 text-background" />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={triggerFileInput}
                >
                  Change Picture
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureUpload}
                />
                <p className="mt-2 text-xs text-center text-muted-foreground">
                  JPG, PNG or GIF
                  <br />
                  Max 2MB
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
