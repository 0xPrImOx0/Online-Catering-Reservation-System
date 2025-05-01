import React from "react";
import { Plus, Trash2, Instagram, Facebook, Twitter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SocialLink = {
  platform: string;
  url: string;
};

type SocialMediaLinksProps = {
  socialLinks: SocialLink[];
  addSocialLink: () => void;
  removeSocialLink: (index: number) => void;
  updateSocialLink: (index: number, field: string, value: string) => void;
};

// Simple Select component
function Select({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </select>
  );
}

export function SocialMediaLinks({ 
  socialLinks, 
  addSocialLink, 
  removeSocialLink, 
  updateSocialLink 
}: SocialMediaLinksProps) {
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
            className="bg-sidebar-accent-foreground hover:bg-[#218838] text-foreground"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Link
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {socialLinks.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No social media links added. Click "Add Link" to connect your
              social accounts.
            </div>
          ) : (
            socialLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-end gap-4 p-4 border rounded-md bg-muted/10"
              >
                <div className="w-1/3">
                  <Label htmlFor={`platform-${index}`}>Platform</Label>
                  <Select
                    id={`platform-${index}`}
                    value={link.platform}
                    onChange={(value) =>
                      updateSocialLink(index, "platform", value)
                    }
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor={`url-${index}`}>URL</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                      {link.platform === "instagram" && (
                        <Instagram className="h-4 w-4" />
                      )}
                      {link.platform === "facebook" && (
                        <Facebook className="h-4 w-4" />
                      )}
                      {link.platform === "twitter" && (
                        <Twitter className="h-4 w-4" />
                      )}
                    </div>
                    <Input
                      id={`url-${index}`}
                      placeholder={`Enter your ${link.platform} URL`}
                      value={link.url}
                      onChange={(e) =>
                        updateSocialLink(index, "url", e.target.value)
                      }
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
