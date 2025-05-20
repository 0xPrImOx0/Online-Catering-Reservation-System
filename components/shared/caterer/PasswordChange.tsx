"use client";

import { Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { useFormContext } from "react-hook-form";
import { SettingsValues } from "@/hooks/use-settings-form";

export function PasswordChange() {
  const { control, trigger } = useFormContext<SettingsValues>();

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
        <FormField
          control={control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel
                htmlFor="currentPassword"
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                Current Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  id="currentPassword"
                  placeholder="Current Password"
                  autoComplete="current-password"
                  onChange={(value) => {
                    field.onChange(value);
                    trigger("newPassword");
                    trigger("confirmNewPassword");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel
                htmlFor="newPassword"
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                New Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  id="newPassword"
                  placeholder="New Password"
                  autoComplete="new-password"
                  onChange={(value) => {
                    field.onChange(value);
                    trigger("confirmNewPassword");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm New Password */}
        <FormField
          control={control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel
                htmlFor="confirmNewPassword"
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                Confirm New Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  id="confirmNewPassword"
                  placeholder="Confirm New Password"
                  autoComplete="new-password"
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
