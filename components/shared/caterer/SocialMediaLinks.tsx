import React from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SettingsValues } from "@/hooks/use-settings-form";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

// Function to add a new social link
export function SocialMediaLinks() {
  const { control, getValues, setValue } = useFormContext<SettingsValues>();
  const socialLinks = getValues("socialMediaLinks");

  const addSocialLink = () => {
    setValue("socialMediaLinks", [...socialLinks, { platform: "", url: "" }]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>
              Connect your social media accounts to your business profile
            </CardDescription>
          </div>
          <Button
            type="button"
            onClick={addSocialLink}
            className="bg-sidebar-accent-foreground hover:bg-sidebar-accent-foreground/80 text-background"
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Link
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {socialLinks.length === 0 ? (
            <div className="py-4 text-center text-muted-foreground">
              No social media links added. Click &quot;Add Link&quot; to connect
              your social accounts.
            </div>
          ) : (
            <FormField
              control={control}
              name="socialMediaLinks"
              render={({ field }) => (
                <FormItem>
                  {(field.value || []).map(({ platform, url }, index) => (
                    <div
                      className="flex gap-4 p-4 rounded-md border max-sm:flex-col sm:items-end bg-muted/10"
                      key={index}
                    >
                      <div className="sm:w-1/3">
                        <FormLabel htmlFor={`platform-${index}`}>
                          Platform
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`platform-${index}`}
                            value={platform}
                            onChange={(e) =>
                              field.onChange(
                                field.value.map((link, i) =>
                                  i === index
                                    ? { ...link, platform: e.target.value }
                                    : link
                                )
                              )
                            }
                            placeholder="Enter platform name"
                            className="w-full"
                          />
                        </FormControl>
                      </div>
                      <div className="flex-1">
                        <FormLabel htmlFor={`url-${index}`}>URL</FormLabel>
                        <div className="flex">
                          <Input
                            id={`url-${index}`}
                            placeholder={`Enter your ${platform} URL`}
                            value={url}
                            onChange={(e) =>
                              field.onChange(
                                field.value.map((link, i) =>
                                  i === index
                                    ? { ...link, url: e.target.value }
                                    : link
                                )
                              )
                            }
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          field.onChange(
                            field.value.filter((_, i) => i !== index)
                          );
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sm:hidden">Remove</span>
                      </Button>
                    </div>
                  ))}
                </FormItem>
              )}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
