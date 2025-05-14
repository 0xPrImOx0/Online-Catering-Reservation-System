"use client";

import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";
import clsx from "clsx";
import { MultiStepFormProps } from "@/types/component-types";

export type FormStepType = {
  id: string;
  title: string;
  description: string;
};

export function MultiStepForm({
  formSteps,
  title,
  description,
  children,
  onSubmit,
  onNextStep,
  onPrevStep,
  onComplete,
  onCancel,
  initialStep,
  isSubmitComplete = false,
  submitButtonText = "Submit",
  nextButtonText = "Next",
  previousButtonText = "Previous",
  doneButtonText = "Done",
  cancelButtonText = "Cancel",
  isReservationForm = false,
  setShowPackageSelection,
}: MultiStepFormProps) {
  const [formStep, setFormStep] = useState<number>(initialStep || 0);
  // const { trigger } = useFormContext<ReservationValues>();
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(false);
  const reservationRef = useRef<HTMLDivElement>(null);
  const checkSizing = isReservationForm ? 24 : 16;

  // Function to go to next form step
  const nextStep = async () => {
    // If validation function is provided, use it
    if (onNextStep) {
      const isValid = await onNextStep(formStep);

      if (nextButtonText === "Choose a Package" && setShowPackageSelection) {
        setShowPackageSelection(true);
        setFormStep(formStep);
        return;
      }
      if (isValid) {
        setFormStep(formStep + 1);
      }
    } else {
      // Otherwise just go to next step
      setFormStep(formStep + 1);
    }
    if (formStep < formSteps.length - 1) {
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  };

  // Function to go to previous form step
  const prevStep = () => {
    if (previousButtonText === "Change Catering Options") {
      setFormStep(1);
      setShowPackageSelection?.(false);
      return;
    }
    if (onPrevStep && isReservationForm) {
      const isValid = onPrevStep(formStep);
      if (isValid) {
        setFormStep(formStep - 1);
      }
    }
    setFormStep(formStep - 1);
  };
  // Function to submit the form
  const submitForm = () => {
    onSubmit();
  };

  // Function to complete the form process
  const completeForm = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div
      className={clsx("flex flex-col mx-auto w-full max-w-4xl h-full", {
        "p-4 rounded-xl border bg-card text-card-foreground": isReservationForm,
      })}
    >
      {isReservationForm && (
        <div className="absolute top-0" ref={reservationRef} />
      )}
      <div
        className={clsx("px-6 pb-2 bg-background md:pt-4", {
          "sticky top-0 z-10": !isReservationForm,
        })}
      >
        <div className="mb-4 text-center">
          <h2
            className={clsx(
              "font-bold",
              isReservationForm ? "mb-2 text-3xl" : "text-2xl"
            )}
          >
            {title}
          </h2>
          <p
            className={clsx("text-muted-foreground", {
              "text-sm": !isReservationForm,
            })}
          >
            {description}
          </p>
        </div>

        {/* Mobile step indicator */}
        <div className="flex flex-col mb-2 space-y-2 sm:hidden">
          <span className="text-sm text-muted-foreground">
            Step {formStep + 1} of {formSteps.length}
          </span>
          <div className="flex gap-2 items-center mt-1">
            <div
              className={`size-8 rounded-full border-2 border-primary flex items-center justify-center ${
                isSubmitComplete && "bg-primary text-primary-foreground"
              }`}
            >
              {isSubmitComplete ? <Check className="w-4 h-4" /> : formStep + 1}
            </div>
            <span className="font-medium">{formSteps[formStep].title}</span>
          </div>
        </div>

        {/* Desktop step indicators */}
        <div className="hidden justify-between items-start sm:flex">
          {formSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 flex flex-col items-center  ${
                index < formStep
                  ? "text-primary"
                  : index === formStep
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <div
                className={clsx(
                  "rounded-full flex items-center justify-center mb-1 mt-22",
                  index < formStep || isSubmitComplete
                    ? "bg-primary text-primary-foreground"
                    : index === formStep
                    ? "border-2 border-primary"
                    : "border-2 border-muted",
                  isReservationForm ? "w-9 h-9" : "w-7 h-7"
                )}
              >
                {index < formStep ? (
                  <Check width={checkSizing} height={checkSizing} />
                ) : isSubmitComplete ? (
                  <Check width={checkSizing} height={checkSizing} />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span
                className={clsx(
                  "px-1 text-xs font-medium text-center line-clamp-2 min-h-8",
                  { "lg:text-sm": isReservationForm }
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative mt-2 mb-4">
          <div className="absolute top-0 right-0 left-0 h-1 bg-muted">
            <Progress
              value={
                isSubmitComplete ? 100 : (formStep / formSteps.length) * 100
              }
            />
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden flex-col flex-1">
        <div className="overflow-y-auto flex-1 px-6 py-4">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0 pt-4">
              <CardTitle className="flex text-lg">
                {!isSubmitComplete && formSteps[formStep].title}
              </CardTitle>
              <CardDescription>
                {formSteps[formStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-16">
              {children[formStep]}
            </CardContent>
          </Card>
        </div>

        <div className="sticky bottom-0 px-6 pt-2 pb-6 border-t bg-background md:py-2">
          <div className="flex justify-between mt-2">
            {isSubmitComplete ? (
              <Button className="ml-auto" onClick={completeForm}>
                {doneButtonText}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  // effect={"hoverUnderline"}
                  onClick={onCancel}
                  className="hover:bg-destructive hover:text-background"
                >
                  {cancelButtonText}
                </Button>
                <div className="flex gap-2">
                  {formStep > 0 && (
                    <Button variant="secondary" onClick={prevStep}>
                      {previousButtonText}
                    </Button>
                  )}
                  {formStep < formSteps.length - 1 ? (
                    <Button onClick={nextStep} disabled={isNextButtonDisabled}>
                      {nextButtonText}
                    </Button>
                  ) : (
                    <Button effect={"hoverUnderline"} onClick={submitForm}>
                      {submitButtonText}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
