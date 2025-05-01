import React from "react";
import { Building2, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BusinessLogoUploadProps = {
  logo: string;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function BusinessLogoUpload({ logo, handleLogoUpload }: BusinessLogoUploadProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Logo</CardTitle>
        <CardDescription>
          Upload your business logo to display on your profile and invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/2 space-y-4">
            <Label htmlFor="logo-upload">Upload Logo</Label>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="logo-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or SVG (MAX. 2MB)
                  </p>
                </div>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </Label>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <Label>Logo Preview</Label>
            <div className="mt-2 border rounded-md flex items-center justify-center bg-muted/20 h-40 w-full">
              {logo ? (
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Business Logo"
                  className="max-h-full max-w-full object-contain p-4"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <Building2 className="mx-auto h-10 w-10 mb-2" />
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
