"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMenuForm } from "@/hooks/use-menu-form";
import { addMenuFormSteps, EditMenuDialogProps } from "@/types/menu-types";
import { FormStepType, MultiStepForm } from "../MultiStepForm";
import { BasicInfoStep } from "./menu-form-steps/BasicInfoStep";
import { IngredientsStep } from "./menu-form-steps/IngredientsStep";
import { PreparationStep } from "./menu-form-steps/PreparationStep";
import { PricingStep } from "./menu-form-steps/PricingStep";
import { NutritionStep } from "./menu-form-steps/NutritionStep";
import { ImageStep } from "./menu-form-steps/ImageStep";
import { ReviewStep } from "./menu-form-steps/ReviewStep";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { toast } from "sonner";

export default function EditMenuForm({
  isEditMenuOpen,
  setIsEditMenuOpen,
  menu,
}: EditMenuDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const menuFormHook = useMenuForm({
    initialData: menu,
    isEditMode: true,
  });
  const { form, onSubmit, validateStep } = menuFormHook;

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = addMenuFormSteps.map((step) => ({
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
    setIsEditMenuOpen(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const data = form.getValues();
    const isSuccess = onSubmit(data, "update", menu._id);

    if (!isSuccess) {
      toast.error("Submission Failed");
      return;
    }

    setIsSubmitComplete(true);
  };

  // Handle form completion (close dialog and reset)
  const handleComplete = () => {
    setIsEditMenuOpen(false);
    setCurrentStep(0);
    setIsSubmitComplete(false);
  };

  // Create the form steps components
  const formStepComponents = [
    <BasicInfoStep key="basic-info" formHook={menuFormHook} />,
    <IngredientsStep key="ingredients" formHook={menuFormHook} />,
    <PreparationStep key="preparation" formHook={menuFormHook} />,
    <PricingStep key="pricing" formHook={menuFormHook} />,
    <NutritionStep key="nutrition" formHook={menuFormHook} />,
    <ImageStep key="image" formHook={menuFormHook} />,
    <ReviewStep key="review" formHook={menuFormHook} />,
  ];

  // Content for both Dialog and Drawer
  const formContent = (
    <Form {...form}>
      <MultiStepForm
        title={"Edit Menu menu"}
        description={"Update the form to modify the existing menu menu"}
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
      <Dialog open={isEditMenuOpen} onOpenChange={setIsEditMenuOpen}>
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
    <Drawer open={isEditMenuOpen} onOpenChange={setIsEditMenuOpen}>
      <DrawerContent className="h-[90vh] p-0 flex flex-col overflow-hidden">
        <VisuallyHidden>
          <DrawerTitle>Menu Form</DrawerTitle>
        </VisuallyHidden>
        {formContent}
      </DrawerContent>
    </Drawer>
  );
}
