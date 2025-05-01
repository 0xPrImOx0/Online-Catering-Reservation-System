"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";

// Custom Components
import { StatusMessage } from "@/components/shared/caterer/StatusMessage";
import { BusinessDetailsForm } from "@/components/shared/caterer/BusinessDetailsForm";
import { BusinessLogoUpload } from "@/components/shared/caterer/BusinessLogoUpload";
import { SocialMediaLinks } from "@/components/shared/caterer/SocialMediaLinks";
import { ProfileInformation } from "@/components/shared/caterer/ProfileInformation";
import { PasswordChange } from "@/components/shared/caterer/PasswordChange";
import { AccountManagement } from "@/components/shared/caterer/AccountManagement";

export default function Page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Sample initial account data
  const [accountData, setAccountData] = useState({
    fullName: "Maria Santos",
    email: "maria@tasteofmanila.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePicture: "/placeholder.svg?height=200&width=200",
  });

  // Handle profile picture upload
  const handleProfilePictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateAccountField("profilePicture", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: null, message: "" });

    // Validate required fields
    if (!accountData.fullName || !accountData.email) {
      setStatusMessage({
        type: "error",
        message: "Please fill in all required fields (Full Name and Email).",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate password if changing
    if (
      accountData.newPassword ||
      accountData.confirmPassword ||
      accountData.currentPassword
    ) {
      if (!accountData.currentPassword) {
        setStatusMessage({
          type: "error",
          message: "Current password is required to change your password.",
        });
        setIsSubmitting(false);
        return;
      }

      if (accountData.newPassword !== accountData.confirmPassword) {
        setStatusMessage({
          type: "error",
          message: "New password and confirmation do not match.",
        });
        setIsSubmitting(false);
        return;
      }

      if (accountData.newPassword.length < 8) {
        setStatusMessage({
          type: "error",
          message: "New password must be at least 8 characters long.",
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Saving account settings:", accountData);
      setIsSubmitting(false);
      setStatusMessage({
        type: "success",
        message: "Account settings updated successfully!",
      });

      // Reset password fields after successful update
      setAccountData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        if (statusMessage.type === "success") {
          setStatusMessage({ type: null, message: "" });
        }
      }, 5000);
    }, 1500);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Deleting account");
      setIsSubmitting(false);
      setDeleteDialogOpen(false);

      // Redirect to login page after account deletion
      router.push("/login");
    }, 2000);
  };

  // Sample initial business data
  const [businessData, setBusinessData] = useState({
    name: "Food Sentinel",
    email: "contact@tasteofmanila.com",
    phone: "+63 (2) 8123 4567",
    address: "123 Makati Avenue, Makati City, Metro Manila, Philippines",
    description:
      "Authentic Filipino cuisine for all occasions. We specialize in traditional dishes prepared with modern techniques, offering a unique culinary experience for corporate events, weddings, and private parties.",
    logo: "",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/tasteofmanila" },
      { platform: "facebook", url: "https://facebook.com/tasteofmanila" },
    ],
  });

  // Function to update business data fields
  const updateBusinessField = (field: string, value: string) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to update account data fields
  const updateAccountField = (field: string, value: string) => {
    setAccountData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to add a new social link
  const addSocialLink = () => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "instagram", url: "" }],
    }));
  };

  // Function to remove a social link
  const removeSocialLink = (index: number) => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  // Function to update a social link
  const updateSocialLink = (index: number, field: string, value: string) => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateBusinessField("logo", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Business Settings</h1>
        <p className="text-muted-foreground">
          Manage your catering business information and appearance
        </p>
      </div>

      {statusMessage.type && <StatusMessage type={statusMessage.type} message={statusMessage.message} />}

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <BusinessDetailsForm 
          businessData={businessData} 
          updateField={updateBusinessField} 
        />

        <BusinessLogoUpload 
          logo={businessData.logo} 
          handleLogoUpload={handleLogoUpload} 
        />

        <SocialMediaLinks 
          socialLinks={businessData.socialLinks} 
          addSocialLink={addSocialLink} 
          removeSocialLink={removeSocialLink} 
          updateSocialLink={updateSocialLink} 
        />
      </form>
      <div className="mt-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal account information and security
          </p>
        </div>

        {statusMessage.type && <StatusMessage type={statusMessage.type} message={statusMessage.message} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfileInformation 
            accountData={accountData}
            updateField={updateAccountField}
            fileInputRef={fileInputRef}
            triggerFileInput={triggerFileInput}
            handleProfilePictureUpload={handleProfilePictureUpload}
          />

          <PasswordChange 
            accountData={accountData}
            showCurrentPassword={showCurrentPassword}
            showNewPassword={showNewPassword}
            showConfirmPassword={showConfirmPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            setShowNewPassword={setShowNewPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            updateField={updateAccountField}
          />

          <AccountManagement 
            deleteDialogOpen={deleteDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            handleDeleteAccount={handleDeleteAccount}
            isSubmitting={isSubmitting}
          />

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-sidebar-accent-foreground text-background"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
              {!isSubmitting && <Save className="ml-2 w-4 h-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
