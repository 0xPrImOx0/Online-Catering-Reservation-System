import React from "react";
import { Building2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { SettingsValues } from "@/hooks/use-settings-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Image from "next/image";

export function BusinessLogoUpload() {
  const { control, watch } = useFormContext<SettingsValues>();
  const businessLogo = watch("businessLogo");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Logo</CardTitle>
        <CardDescription>
          Upload your business logo to display on your profile and invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 items-start md:flex-row">
          <div className="space-y-4 w-full md:w-1/2">
            <FormField
              control={control}
              name="businessLogo"
              render={({ field }) => (
                <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                  <FormLabel htmlFor="logo-upload" className="">
                    Logo Link
                  </FormLabel>

                  {/* <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <Upload className="mb-2 w-8 h-8 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or SVG (MAX. 2MB)
                    </p>
                  </div> */}
                  <FormControl>
                    <Input
                      id="logo-upload"
                      type="text"
                      // accept="image/*"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full md:w-1/2">
            <Label>Logo Preview</Label>
            <div className="relative flex justify-center items-center mt-2 w-full h-56 rounded-md border bg-muted/20">
              {businessLogo ? (
                <Image
                  src={businessLogo || "/placeholder.svg"}
                  alt="Business Logo"
                  fill
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <Building2 className="mx-auto mb-2 w-10 h-10" />
                  <p>No logo uploaded</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
