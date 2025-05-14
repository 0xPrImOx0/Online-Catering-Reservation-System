import { Dispatch, ReactNode, SetStateAction } from "react";
import { AllergenProps, MenuItem } from "./menu-types";
import { SetStateBoolean } from "./global-types";
import { CateringPackagesProps } from "./package-types";
import { FormStepType } from "@/components/shared/MultiStepForm";
import { FieldErrors } from "react-hook-form";
import { ReservationValues } from "@/hooks/use-reservation-form";

//Search Bar Types
export type SearchInputProps = {
  query: string;
  setQuery: (query: string) => void;
  placeholderTitle: string;
  iconStyle?: string;
  inputStyle?: string;
  hasFilter?: boolean;
  activeFilterCount?: number;
  openFilter?: boolean;
  setOpenFilter?: Dispatch<SetStateAction<boolean>>;
};

//Custom Select Types
export type CustomSelectItemProps = {
  value: string;
  title: string;
};

export type CustomSelectProps = {
  defaultValue: string;
  placeholder: string;
  items: CustomSelectItemProps[];
  size?: "sm" | "md" | "lg";
  value: string;
  onValueChange: (value: string) => void;
};

//View Mode Props
export type ViewModeButtonsProps = {
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;
};

//  Custom Pagination Types
export type CustomPaginationProps = {
  startIndex: number;
  endIndex: number;
  currentPage: number;
  totalMenus: number;
  menusPerPage: number;
  onPageChange: (e: number) => void;
  title?: string;
};

export type Tag = {
  id: string;
  text: string;
};
export interface TagInputProps {
  id?: string;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  placeholder?: string;
  styleClasses?: {
    tagList?: { container?: string };
    input?: string;
    tag?: { body?: string; closeButton?: string };
  };
  activeTagIndex?: number | null;
  setActiveTagIndex?: React.Dispatch<React.SetStateAction<number | null>>;
  inlineTags?: boolean;
  inputFieldPosition?: "top" | "bottom";
  enableAutocomplete?: boolean;
  restrictTagsToAutocompleteOptions?: boolean;
}

export interface ImageDialogProps {
  item: MenuItem | CateringPackagesProps;
  isImageDialogOpen: boolean;
  setIsImageDialogOpen: SetStateBoolean;
}

export type FiltersProps = {
  category: string;
  allergens: AllergenProps;
  sortBy: string;
  excludedAllergens: AllergenProps[];
  minPrice: number;
  maxPrice: number;
  available: boolean;
  spicy: boolean;
  [key: string]: string | number | boolean | AllergenProps[];
};

export interface FilterSectionProps {
  query?: string;
  setQuery: (query: string) => void;
  filters: FiltersProps;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      allergens: AllergenProps;
      sortBy: string;
      excludedAllergens: AllergenProps[];
      minPrice: number;
      maxPrice: number;
      available: boolean;
      spicy: boolean;
      [key: string]: string | number | boolean | AllergenProps[];
    }>
  >;
}

export type EventPackageContainerProps = {
  cateringPackages: CateringPackagesProps[];
  isCaterer: boolean;
  open?: boolean;
};

export type MultiStepFormProps = {
  formSteps: FormStepType[];
  title: string;
  description: string;
  children: ReactNode[];
  onSubmit: () => void;
  onNextStep?: (currentStep: number) => Promise<boolean>;
  onPrevStep?: (currentStep: number) => boolean;
  onComplete?: () => void;
  onCancel?: () => void;
  initialStep?: number;
  isSubmitComplete?: boolean;
  submitButtonText?: string;
  nextButtonText?: string;
  previousButtonText?: string;
  doneButtonText?: string;
  cancelButtonText?: string;
  isReservationForm?: boolean;
  setShowPackageSelection?: Dispatch<SetStateAction<boolean>>;
  isCategoryError?: boolean;
};

export interface CustomerType {
  name: string;
  email: string;
  phone: string;
  isRegistered: boolean;
}

export interface OrderItemType {
  name: string;
  quantity: number;
  price: number;
}

export interface ReservationType {
  eventDate: Date;
  address: string;
  items: OrderItemType[];
}

export interface PaymentType {
  id: string;
  reservationId: string;
  customer: CustomerType;
  amount: number;
  status: string;
  paymentDate: Date | null;
  paymentMethod: string | null;
  createdDate: Date;
  reservation: ReservationType;
  isUrgent: boolean;
}
