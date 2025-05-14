"use client";

import { useEffect, useState } from "react";
import CustomerInformation from "@/components/shared/customer/CustomerInformation";
import ReservationDetails from "@/components/shared/customer/ReservationDetails";
import CategoryOptions from "./CategoryOptions";
import SummaryBooking from "./SummaryBooking";
import { Form } from "@/components/ui/form";
import { useReservationForm } from "@/hooks/use-reservation-form";
import { FormStepType, MultiStepForm } from "../MultiStepForm";
import { useRouter } from "next/navigation";
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
import {
  cateringPackages,
  eventPackageFormSteps,
} from "@/lib/shared/packages-metadata";
import { useAuthContext } from "@/contexts/AuthContext";

export default function BookNowForm({ id }: { id: string }) {
  const router = useRouter();
  const deconstructedId = id && id[0];
  const { customer } = useAuthContext();

  const {
    form,
    reservationForm,
    validateStep,
    onSubmit,
    showPackageSelection,
    setShowPackageSelection,
    getMenuItem,
    cateringOptions,
    setCateringOptions,
    isCategoryError,
    setIsCategoryError,
  } = useReservationForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { watch, setValue } = reservationForm;

  useEffect(() => {
    if (customer) {
      const { fullName, email, contactNumber } = customer;

      // if fullname, email, and contactNumber do have values then step should direct to step 2
      if (fullName && email && contactNumber) setCurrentStep(1);
      return;
    }

    return setCurrentStep(0);
  }, [customer]);

  const [previousBtn, setPreviousBtn] = useState<string>(
    showPackageSelection && currentStep === 1
      ? "Change Catering Options"
      : "Previous"
  );
  const [nextBtn, setNextBtn] = useState<string>(
    cateringOptions === "menus" || currentStep !== 1
      ? "Next"
      : !showPackageSelection
      ? "Choose a Package"
      : "Next"
  );

  useEffect(() => {
    setPreviousBtn(
      showPackageSelection && currentStep === 1
        ? "Change Catering Options"
        : "Previous"
    );
    setNextBtn(
      cateringOptions === "menus" || currentStep !== 1
        ? "Next"
        : !showPackageSelection
        ? "Choose a Package"
        : "Next"
    );
  }, [showPackageSelection, currentStep, cateringOptions]);

  // Convert our form steps to the format expected by MultiStepForm
  const multiFormSteps: FormStepType[] = eventPackageFormSteps.map((step) => ({
    id: step.id,
    title: step.title,
    description: step.description ?? "", // Description is optional
  }));

  // Handle next step validation
  const handleNextStep = async (currentStep: number) => {
    console.log("isCategoryError: ", isCategoryError);
    if (!isCategoryError) {
      const isValid = await validateStep(currentStep);
      if (isValid && nextBtn === "Next") {
        setCurrentStep(currentStep + 1);
      }
      return isValid;
    }
    return false;
  };

  const handlePreviousStep = (currentStep: number) => {
    if (currentStep > 0 && previousBtn === "Previous") {
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
      console.log(JSON.stringify(data, null, 2));
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
    if (currentStep !== 2 || cateringOptions === "menus") {
      setIsCategoryError(false);
    }
  }, [currentStep, cateringOptions]);

  useEffect(() => {
    const fetchMenuOrPackage = async () => {
      const menu = await getMenuItem(deconstructedId);
      const isPackage = cateringPackages.some((pkg) => pkg._id === id);

      if (menu) {
        const prev = watch("selectedMenus") || {};
        setCateringOptions("menus");
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
        setCateringOptions("packages");
        setValue("selectedPackage", id as string);
        setShowPackageSelection(true);
        return;
      }
    };
    if (deconstructedId) {
      fetchMenuOrPackage();
    }
  }, [deconstructedId]);

  const reservationFormStepComponents = [
    <CustomerInformation key={"customer-information"} />, // Already Fixed
    <PackageSelection
      key={"package-selection"}
      showPackageSelection={showPackageSelection}
      cateringOptions={cateringOptions}
      setCateringOptions={setCateringOptions}
    />,
    <CategoryOptions
      key={"category-options"}
      setIsCategoryError={setIsCategoryError}
      cateringOptions={cateringOptions}
    />,
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
        nextButtonText={nextBtn}
        previousButtonText={previousBtn}
        isSubmitComplete={isSubmitComplete}
        doneButtonText="Close"
        isReservationForm
        setShowPackageSelection={setShowPackageSelection}
        isCategoryError={isCategoryError}
      >
        {reservationFormStepComponents}
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
