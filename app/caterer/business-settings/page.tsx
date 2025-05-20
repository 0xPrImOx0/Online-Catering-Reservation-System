"use client";

import { BusinessDetailsForm } from "@/components/shared/caterer/BusinessDetailsForm";
import { BusinessLogoUpload } from "@/components/shared/caterer/BusinessLogoUpload";
import { SocialMediaLinks } from "@/components/shared/caterer/SocialMediaLinks";
import { SuccessDialog } from "@/components/shared/caterer/SuccessDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSettingsForm } from "@/hooks/use-settings-form";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BusinessSettings = () => {
  const router = useRouter();
  const {
    businessSettingsForm,
    isSubmitSuccess,
    setIsSubmitSuccess,
    validateBusinessStep,
    onSubmitBusinessSettings,
  } = useSettingsForm();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    const isValid = await validateBusinessStep();
    console.log("IS BUSINESS SETINGS FORMS VALIE", isValid);
    if (isValid) {
      businessSettingsForm.handleSubmit(async (data) => {
        onSubmitBusinessSettings(data);
        setIsSubmitSuccess(true);
        // Wait 1 second, then show dialog
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShowSuccessDialog(true);
      })();
    }
    console.log(
      "ERRORS IN BUSINESS SETTINGS",
      businessSettingsForm.formState.errors
    );
  };

  useEffect(() => {
    if (!showSuccessDialog) {
      setIsSubmitSuccess(false);
    }
  }, [showSuccessDialog, setIsSubmitSuccess]);

  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto mb-20">
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Changes Saved!"
        description="Your account settings have been updated successfully."
        buttonText="Close"
      />

      <div className="">
        <h1 className="text-2xl font-bold">Business Settings</h1>
        <p className="text-muted-foreground">
          Manage your catering business information and appearance
        </p>
      </div>

      <Form {...businessSettingsForm}>
        <div className="mt-6 space-y-6">
          <BusinessDetailsForm />

          <BusinessLogoUpload />

          <SocialMediaLinks />

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
      </Form>
    </main>
  );
};

export default BusinessSettings;
