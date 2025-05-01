import React from "react";
import { Building2, Mail, Phone, MapPin, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

export function BusinessDetailsForm({ businessData, updateField }: BusinessDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
        <CardDescription>
          Update your business information visible to customers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Name */}
          <div className="space-y-2">
            <Label
              htmlFor="business-name"
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Business Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="business-name"
              placeholder="Enter your business name"
              value={businessData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Contact Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your contact email"
              value={businessData.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={businessData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Business Address
            </Label>
            <Input
              id="address"
              placeholder="Enter your business address"
              value={businessData.address}
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Business Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your catering business"
            className="min-h-[120px]"
            value={businessData.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            This description will appear on your public profile and in
            search results
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
