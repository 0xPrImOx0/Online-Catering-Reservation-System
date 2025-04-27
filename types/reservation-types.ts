import { useReservationForm } from "@/hooks/use-reservation-form";
import { ServiceType } from "./package-types";

//Reservation Related Types
export type PaxArrayType = "4-6 pax" | "8-10 pax" | "13-15 pax" | "18-20 pax";

export const paxArray: PaxArrayType[] = [
  "4-6 pax",
  "8-10 pax",
  "13-15 pax",
  "18-20 pax",
];

export type ReservationStatusType =
  | "All"
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export const reservationStatusArray: ReservationStatusType[] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export interface MenuReservationDetails {
  quantity: number;
  paxSelected: PaxArrayType;
  pricePerPax: number;
}

export type SelectedMenu = Record<string, MenuReservationDetails>;

export type SelectedMenus = Record<string, SelectedMenu>;

export interface ReservationItem {
  fullName: string;
  email: string;
  contactNumber: string;
  reservationType: "event" | "personal";
  eventType: string;
  reservationDate: Date;
  reservationTime: string;
  period: "A.M." | "P.M.";
  guestCount: number;
  venue: string;
  cateringOptions: "event" | "custom";
  serviceType: ServiceType;
  serviceFee: number;
  serviceHours?: string;
  selectedPackage: string;
  selectedMenus: SelectedMenus;
  totalPrice: number;
  specialRequests?: string;
  deliveryOption: "Pickup" | "Delivery";
  deliveryFee: number;
  deliveryAddress?: string;
  deliveryInstructions?: string;
  status: ReservationStatusType;
  createdAt: Date;
  updatedAt: Date;
}

export type ReservationTableProps = {
  reservations: ReservationItem[];
  dashboard?: boolean;
};

export interface BookNowProps {
  formHook: ReturnType<typeof useReservationForm>;
}

export interface SelectServingSizeProps {
  category: string;
  menu: string;
  value: SelectedMenus;
  onChange: (value: SelectedMenus) => void;
}
