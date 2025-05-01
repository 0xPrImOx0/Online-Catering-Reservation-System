import React from "react";
import { User, Mail, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type ProfileInformationProps = {
  accountData: {
    fullName: string;
    email: string;
    profilePicture: string;
  };
  updateField: (field: string, value: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null> | null;
  triggerFileInput: () => void;
  handleProfilePictureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ProfileInformation({
  accountData,
  updateField,
  fileInputRef,
  triggerFileInput,
  handleProfilePictureUpload,
}: ProfileInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-2/3 space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="full-name"
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4 text-muted-foreground" />
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="full-name"
                placeholder="Enter your full name"
                value={accountData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={accountData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                This email will be used for account notifications and
                communications
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={accountData.profilePicture || "/placeholder.svg"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-2 border-muted"
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-6 w-6 text-background" />
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
                <p className="text-xs text-muted-foreground text-center mt-2">
                  JPG, PNG or GIF
                  <br />
                  Max 2MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
