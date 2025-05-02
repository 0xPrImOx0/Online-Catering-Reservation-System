"use client";

import { useEffect, useState } from "react";
import {
  eventPackageFormSteps,
  cateringPackages,
} from "@/lib/customer/packages-metadata";
import CustomerInformation from "@/components/shared/customer/CustomerInformation";
import ReservationDetails from "@/components/shared/customer/ReservationDetails";
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
    if (isValid && dynamicNextBtn === "Next") {
      setCurrentStep(currentStep + 1);
    }
    return isValid;
  };

  const handlePreviousStep = (currentStep: number) => {
    if (currentStep > 0 && dynamicPreviousBtn === "Previous") {
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
    async function fetchMenuOrPackage() {
      const menu = await getMenuItem(id as string);
      const isPackage = cateringPackages.some((pkg) => pkg._id === id);

      if (deconstructedId) {
        if (menu) {
          const prev = watch("selectedMenus") || {};
          setValue("cateringOptions", "custom");
          setValue("selectedMenus", {
            ...prev,
            [menu.category]: {
              ...(prev?.[menu.category] || {}),
              [deconstructedId as string]: {
                quantity: 1,
                paxSelected: "4-6 pax",
                pricePerPax: menu.prices[0].price,
              },
            },
          });
        }
        if (isPackage) {
          setValue("cateringOptions", "event");
          setValue("selectedPackage", id as string);
          setShowPackageSelection(true);
          return;
        }
      }
    }
    fetchMenuOrPackage();
  }, [deconstructedId]);

  const reservationFormComponents = [
    <CustomerInformation key={"customer-information"} />,
    <PackageSelection
      key={"package-selection"}
      showPackageSelection={showPackageSelection}
    />,
    <CategoryOptions key={"category-options"} />,
    <ReservationDetails key={"reservation-details"} />,
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
          <div className="flex justify-center items-center py-4">
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
