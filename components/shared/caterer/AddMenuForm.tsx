"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMenuForm } from "@/hooks/use-menu-form";
import { AddMenuDialogProps, addMenuFormSteps } from "@/types/menu-types";
import { BasicInfoStep } from "./menu-form-steps/BasicInfoStep";
import { IngredientsStep } from "./menu-form-steps/IngredientsStep";
import { PreparationStep } from "./menu-form-steps/PreparationStep";
import { PricingStep } from "./menu-form-steps/PricingStep";
import { NutritionStep } from "./menu-form-steps/NutritionStep";
import { ImageStep } from "./menu-form-steps/ImageStep";
import { ReviewStep } from "./menu-form-steps/ReviewStep";
import { FormStepType, MultiStepForm } from "../MultiStepForm";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { useState } from "react";
import { toast } from "sonner";
// import api from "@/lib/axiosInstance";
// import axios from "axios";

export function AddMenuDialog({
  isAddMenuOpen,
  setIsAddMenuOpen,
}: AddMenuDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { form, onSubmit, validateStep, resetForm } = useMenuForm();
  const menuFormHook = useMenuForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = addMenuFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description ?? "", // Description is optional
  }));

  // Handle next step validation
  const handleNextStep = async (currentStep: number) => {
    console.log(
      "BEFORE GETTING LOCAL STORAGE IN INGREDIENT",
      form.getValues("ingredients")
    );
    if (currentStep === 1) {
      // Retrieve ingredients from localStorage
      const getIngredients = localStorage.getItem("ingredients");

      // Parse the ingredients and handle null or invalid JSON
      const ingredients = getIngredients ? JSON.parse(getIngredients) : [];

      // Set ingredients in the form
      form.setValue("ingredients", ingredients);
    }

    const isValid = await validateStep(currentStep);
    console.log("CURRENT STEP: ", currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
    console.log(!isValid && "NOT VALID IN HANDLE NEXTS");

    return isValid;
  };

  // Add a handleCancel function:
  const handleCancel = () => {
    setIsAddMenuOpen(false);
  };

  // Handle form submission
  const handleSubmitForm = async () => {
    const data = form.getValues();
    const isSuccess = await onSubmit(data, "create");

    if (!isSuccess) {
      toast.error("Submission Failed");
      return;
    }

    setIsSubmitComplete(true);
  };

  // Handle form completion (close dialog and reset)
  const handleComplete = () => {
    setIsAddMenuOpen(false);
    resetForm();
    setCurrentStep(0);
    setIsSubmitComplete(false);
  };

  // Create the form steps components
  const formStepComponents = [
    <BasicInfoStep key="basic-info" />,
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
        title={"Add Menu Item"}
        description={"Complete the form to add a new menu item"}
        formSteps={multiFormSteps}
        onSubmit={handleSubmitForm}
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
      <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
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
    <Drawer open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
      <DrawerContent className="h-[90vh] p-0 flex flex-col overflow-hidden">
        <VisuallyHidden>
          <DrawerTitle>Menu Form</DrawerTitle>
        </VisuallyHidden>
        {formContent}
      </DrawerContent>
    </Drawer>
  );
}
