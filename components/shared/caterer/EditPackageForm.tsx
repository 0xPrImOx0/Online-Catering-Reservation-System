"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePackageForm } from "@/hooks/use-package-form";
import {
  EditPackageDialogProps,
  packageFormSteps,
} from "@/types/package-types";
import { FormStepType, MultiStepForm } from "../MultiStepForm";
import { PackageTypeStep } from "./package-form-steps/PackageTypeStep";
import { BasicInfoStep } from "./package-form-steps/BasicInfoStep";
import { PackageOptionsStep } from "./package-form-steps/PackageOptionsStep";
import { PricingCapacityStep } from "./package-form-steps/PricingCapacityStep";
import { InclusionsServicesStep } from "./package-form-steps/InclusionsServicesStep";
import { ImageStep } from "./package-form-steps/ImageStep";
import ReviewStep from "./package-form-steps/ReviewStep";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { toast } from "sonner";

export default function EditPackageForm({
  isEditPackageOpen,
  setIsEditPackageOpen,
  item,
}: EditPackageDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const packageFormHook = usePackageForm({
    initialData: item,
    isEditMode: true,
  });
  const { form, onSubmit, validateStep, resetForm } = packageFormHook;

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = packageFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description ?? "",
  }));

  // Handle next step validation
  const handleNextStep = async (currentStep: number) => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
    return isValid;
  };

  // Add a handleCancel function:
  const handleCancel = () => {
    setIsEditPackageOpen(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const data = form.getValues();
    const isSuccess = onSubmit(data, "update", item._id);

    if (!isSuccess) {
      toast.error("Submission Failed");
      return;
    }

    setIsSubmitComplete(true);
  };

  // Handle form completion (close dialog and reset)
  const handleComplete = () => {
    setIsEditPackageOpen(false);
    resetForm();
    setCurrentStep(0);
    setIsSubmitComplete(false);
  };

  // Create the form steps components
  const formStepComponents = [
    <PackageTypeStep key="package-type" formHook={packageFormHook} />,
    <BasicInfoStep key="basic-info" formHook={packageFormHook} />,
    <PackageOptionsStep key="package-options" formHook={packageFormHook} />,
    <PricingCapacityStep key="pricing-capacity" formHook={packageFormHook} />,
    <InclusionsServicesStep
      key="inclusions-services"
      formHook={packageFormHook}
    />,
    <ImageStep key="image" formHook={packageFormHook} />,
    <ReviewStep key="review" formHook={packageFormHook} />,
  ];

  // Content for both Dialog and Drawer
  const formContent = (
    <Form {...form}>
      <MultiStepForm
        title={"Edit Package Item"}
        description={"Update the form to modify the existing package item"}
        formSteps={multiFormSteps}
        onSubmit={handleSubmit}
        onNextStep={handleNextStep}
        onComplete={handleComplete}
        onCancel={handleCancel}
        initialStep={currentStep}
        isSubmitComplete={isSubmitComplete}
        doneButtonText="Close"
      >
        {formStepComponents}
      </MultiStepForm>
    </Form>
  );

  if (isDesktop) {
    return (
      <Dialog open={isEditPackageOpen} onOpenChange={setIsEditPackageOpen}>
        <DialogContent className="sm:max-w-[600px] md:max-w-[800px] h-[90vh] p-0 flex flex-col overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Menu Form</DialogTitle>
          </VisuallyHidden>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isEditPackageOpen} onOpenChange={setIsEditPackageOpen}>
      <DrawerContent className="h-[90vh] p-0 flex flex-col overflow-hidden">
        <VisuallyHidden>
          <DrawerTitle>Menu Form</DrawerTitle>
        </VisuallyHidden>
        {formContent}
      </DrawerContent>
    </Drawer>
  );
}
