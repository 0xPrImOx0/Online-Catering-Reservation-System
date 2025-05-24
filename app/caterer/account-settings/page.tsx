"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileInformation } from "@/components/shared/caterer/ProfileInformation";
import { PasswordChange } from "@/components/shared/caterer/PasswordChange";
import { useSettingsForm } from "@/hooks/use-settings-form";
import { Form } from "@/components/ui/form";
import { SuccessDialog } from "@/components/shared/caterer/SuccessDialog";

export default function Page() {
  const router = useRouter();
  const {
    accountSettingsForm,
    isSubmitSuccess,
    setIsSubmitSuccess,
    validateAccountStep,
    onSubmitAccountSettings,
  } = useSettingsForm();

  const [dots, setDots] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    const isValid = await validateAccountStep();
    if (isValid) {
      accountSettingsForm.handleSubmit(async (data) => {
        setIsSubmitSuccess(true);
        await onSubmitAccountSettings(data);
        setShowSuccessDialog(true);
      })();
    }
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
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto">
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Changes Saved!"
        description="Your account settings have been updated successfully."
        buttonText="Close"
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal account information and security
        </p>
      </div>

      <Form {...accountSettingsForm}>
        <div className="mt-8">
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
                {isSubmitSuccess ? `Saving${dots}` : "Save Changes"}
                {!isSubmitSuccess && <Save className="ml-2 w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </main>
  );
}
