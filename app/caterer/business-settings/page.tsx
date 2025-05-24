"use client";

import { BusinessDetailsForm } from "@/components/shared/caterer/BusinessDetailsForm";
import { SocialMediaLinks } from "@/components/shared/caterer/SocialMediaLinks";
import { SuccessDialog } from "@/components/shared/caterer/SuccessDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSettingsForm } from "@/hooks/use-settings-form";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const BusinessSettings = () => {
  const router = useRouter();
  const {
    businessSettingsForm,
    isSubmitSuccess,
    setIsSubmitSuccess,
    onSubmitBusinessSettings,
  } = useSettingsForm();

  const [dots, setDots] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitSuccess(true);

    const data = businessSettingsForm.getValues();
    const isSuccess = await onSubmitBusinessSettings(data);

    if (!isSuccess) {
      toast.error("Submission Failed");
      return;
    }

    setShowSuccessDialog(true);
  };

  useEffect(() => {
    if (!showSuccessDialog) {
      setIsSubmitSuccess(false);
    }
  }, [showSuccessDialog, setIsSubmitSuccess]);

  useEffect(() => {
    if (!isSubmitSuccess) {
      setDots("");
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500); // change speed if needed

    return () => clearInterval(interval);
  }, [isSubmitSuccess]);

  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto mb-20">
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Changes Saved!"
        description="Your business settings have been updated successfully."
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

          {/* <BusinessLogoUpload /> */}

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
              {isSubmitSuccess ? `Saving${dots}` : "Save Changes"}
              {!isSubmitSuccess && <Save className="ml-2 w-4 h-4" />}
            </Button>
          </div>
        </div>
      </Form>
    </main>
  );
};

export default BusinessSettings;
