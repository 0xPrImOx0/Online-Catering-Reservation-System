"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/shared/caterer/StatusMessage";
import { BusinessDetailsForm } from "@/components/shared/caterer/BusinessDetailsForm";
import { BusinessLogoUpload } from "@/components/shared/caterer/BusinessLogoUpload";
import { SocialMediaLinks } from "@/components/shared/caterer/SocialMediaLinks";
import { ProfileInformation } from "@/components/shared/caterer/ProfileInformation";
import { PasswordChange } from "@/components/shared/caterer/PasswordChange";
import { useSettingsForm } from "@/hooks/use-settings-form";
import { Form } from "@/components/ui/form";
import { SuccessDialog } from "@/components/shared/caterer/SuccessDialog";

export default function Page() {
  const router = useRouter();
  const {
    settingsForm,
    onSubmit,
    isSubmitSuccess,
    setIsSubmitSuccess,
    validateStep,
  } = useSettingsForm();
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    const isValid = await validateStep();
    if (isValid) {
      settingsForm.handleSubmit(async (data) => {
        onSubmit(data);
        setIsSubmitSuccess(true);
        // Wait 1 second, then show dialog
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShowSuccessDialog(true);
      })();
    }
  };

  useEffect(() => {
    if (!showSuccessDialog) {
      setIsSubmitSuccess(false);
    }
  }, [showSuccessDialog]);

  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto">
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Changes Saved!"
        description="Your business and account settings have been updated successfully."
        buttonText="Close"
      />
      <div className="">
        <h1 className="text-2xl font-bold">Business Settings</h1>
        <p className="text-muted-foreground">
          Manage your catering business information and appearance
        </p>
      </div>

      {statusMessage.type && (
        <StatusMessage
          type={statusMessage.type}
          message={statusMessage.message}
        />
      )}

      <Form {...settingsForm}>
        <div className="mt-6 space-y-6">
          <BusinessDetailsForm />

          <BusinessLogoUpload />

          <SocialMediaLinks />
        </div>
        <div className="mt-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">
              Manage your personal account information and security
            </p>
          </div>

          <div className="space-y-6">
            <ProfileInformation />

            <PasswordChange />

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitSuccess}
                className="bg-sidebar-accent-foreground text-background"
              >
                {isSubmitSuccess ? "Saving..." : "Save Changes"}
                {!isSubmitSuccess && <Save className="ml-2 w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </main>
  );
}
