"use client";

import { useEffect, useState } from "react";
import {
  eventPackageFormSteps,
  cateringPackages,
} from "@/lib/customer/packages-metadata";
import CustomerInformation from "@/components/shared/customer/CustomerInformation";
import EventDetails from "@/components/shared/customer/ReservationDetails";
import CategoryOptions from "./CategoryOptions";
import SummaryBooking from "./SummaryBooking";
import { Form } from "@/components/ui/form";
import { useReservationForm } from "@/hooks/use-reservation-form";
import { FormStepType, MultiStepForm } from "../MultiStepForm";
import { usePathname, useRouter } from "next/navigation";
import PackageSelection from "./PackageSelection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Check } from "lucide-react";

export default function BookNowForm({ id }: { id: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const deconstructedId = id && id[0];

  const {
    reservationForm,
    validateStep,
    onSubmit,
    showPackageSelection,
    setShowPackageSelection,
    getMenuItem,
  } = useReservationForm();
  const [currentStep, setCurrentStep] = useState(2);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [nextPageCount, setNextPageCount] = useState(0);
  const { watch, setValue } = reservationForm;

  const cateringOptions = watch("cateringOptions");

  const dynamicPreviousBtn =
    showPackageSelection && currentStep === 1
      ? "Change Catering Options"
      : "Previous";
  const dynamicNextBtn =
    cateringOptions === "custom" || currentStep !== 1
      ? "Next"
      : !showPackageSelection
      ? "Choose a Package"
      : "Next";

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = eventPackageFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description ?? "", // Description is optional
  }));

  // Handle next step validation
  const handleNextStep = async (currentStep: number) => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      if (pathname === `/book-now/${id}` && nextPageCount < 2) {
        setCurrentStep(currentStep + 2);
      } else {
        setCurrentStep(currentStep + 1);
      }
      setNextPageCount((prev) => prev + 1);
    }
    return isValid;
  };

  const handlePreviousStep = (currentStep: number) => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      return true;
    }
    return false;
  };

  // Add a handleCancel function:
  const handleCancel = () => {
    router.push("/");
  };

  // Handle form submission
  const handleSubmit = () => {
    setShowConfirmation(true);
    reservationForm.handleSubmit((data) => {
      onSubmit(data);
      setIsSubmitComplete(true);
    })();
  };

  // Handle form completion (close dialog and reset)
  const handleComplete = () => {
    setCurrentStep(0);
    setIsSubmitComplete(false);
  };

  useEffect(() => {
    const isMenu = getMenuItem(deconstructedId);
    const isPackage = cateringPackages.some(
      (pkg) => pkg._id === deconstructedId
    );

    if (deconstructedId) {
      if (isMenu) {
        const prev = watch("selectedMenus") || {};
        setValue("cateringOptions", "custom");
        setValue("selectedMenus", {
          ...prev,
          [isMenu.category]: {
            ...(prev?.[isMenu.category] || {}),
            [deconstructedId]: {
              quantity: 1,
              paxSelected: "4-6 pax",
              pricePerPax: isMenu.prices[0].price,
            },
          },
        });
      }
      if (isPackage) {
        setValue("cateringOptions", "event");
        setValue("selectedPackage", deconstructedId);
        setShowPackageSelection(true);
        return;
      }
    }
  }, [id, deconstructedId]);

  useEffect(() => {
    console.log(watch("selectedMenus"));
  }, [watch("selectedMenus")]);

  const reservationFormComponents = [
    <CustomerInformation key={"customer-information"} />,
    <PackageSelection
      key={"package-selection"}
      showPackageSelection={showPackageSelection}
    />,
    <CategoryOptions key={"category-options"} />,
    <EventDetails key={"event-details"} />,
    <SummaryBooking key={"summary-booking"} />,
  ];

  const formContent = (
    <Form {...reservationForm}>
      <MultiStepForm
        title={"Reserve Your Catering Service"}
        description={"Complete the form below to book your event"}
        formSteps={multiFormSteps}
        onSubmit={handleSubmit}
        onNextStep={handleNextStep}
        onPrevStep={handlePreviousStep}
        onComplete={handleComplete}
        onCancel={handleCancel}
        initialStep={currentStep}
        nextButtonText={dynamicNextBtn}
        previousButtonText={dynamicPreviousBtn}
        isSubmitComplete={isSubmitComplete}
        doneButtonText="Close"
        isReservationForm
        setShowPackageSelection={setShowPackageSelection}
      >
        {reservationFormComponents}
      </MultiStepForm>
    </Form>
  );
  return (
    <section>
      {formContent}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservation Request Sent!</DialogTitle>
            <DialogDescription>
              Thank you for your reservation request. Our caterer will call you
              within 1 hour to discuss the details and provide you with a quote.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <div className="p-3 bg-green-500 rounded-full">
              <Check className="text-foreground size-10" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant={"ghost"}
              onClick={() => setShowConfirmation(false)}
            >
              Close
            </Button>
            <Button
              variant={"default"}
              onClick={() => setShowConfirmation(false)}
              asChild
            >
              <Link href={"/"}>Go to home</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
