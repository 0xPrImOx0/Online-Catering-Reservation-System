import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type PasswordChangeProps = {
  accountData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  setShowCurrentPassword: (show: boolean) => void;
  setShowNewPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  updateField: (field: string, value: string) => void;
};

export function PasswordChange({
  accountData,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  setShowCurrentPassword,
  setShowNewPassword,
  setShowConfirmPassword,
  updateField,
}: PasswordChangeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to maintain account security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Password */}
        <div className="space-y-2">
          <Label
            htmlFor="current-password"
            className="flex items-center gap-2"
          >
            <Lock className="h-4 w-4 text-muted-foreground" />
            Current Password
          </Label>
          <div className="relative">
            <Input
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              value={accountData.currentPassword}
              onChange={(e) =>
                updateField("currentPassword", e.target.value)
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label
            htmlFor="new-password"
            className="flex items-center gap-2"
          >
            <Lock className="h-4 w-4 text-muted-foreground" />
            New Password
          </Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={accountData.newPassword}
              onChange={(e) => updateField("newPassword", e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Password must be at least 8 characters long
          </p>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <Label
            htmlFor="confirm-password"
            className="flex items-center gap-2"
          >
            <Lock className="h-4 w-4 text-muted-foreground" />
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={accountData.confirmPassword}
              onChange={(e) =>
                updateField("confirmPassword", e.target.value)
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
