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

export type HoursArrayTypes =
  | "4 hours"
  | "4.5 hours"
  | "5 hours"
  | "5.5 hours"
  | "6 hours"
  | "6.5 hours"
  | "8 hours"
  | "8.5 hours"
  | "10 hours";

export interface MenuReservationDetails {
  quantity: number;
  paxSelected: PaxArrayType;
  pricePerPax: number;
}

export type SelectedMenu = Record<string, MenuReservationDetails>;

export type SelectedMenus = Record<string, SelectedMenu>;

export const reservationEventTypes = [
  "Birthday",
  "Wedding",
  "Corporate",
  "Graduation",
  "Others",
] as const;

export type ReservationEventTypes = (typeof reservationEventTypes)[number];

export interface ReservationItem {
  id?: string;
  fullName: string;
  email: string;
  contactNumber: string;
  selectedPackage?: string;
  selectedMenus: SelectedMenus;
  eventType: ReservationEventTypes;
  guestCount: number;
  serviceType: ServiceType;
  orderType: "Pickup" | "Delivery" | "";
  reservationDate: Date;
  reservationTime: string;
  deliveryFee?: number;
  deliveryAddress?: string;
  deliveryInstructions?: string;
  totalPrice: number;
  specialRequests?: string;
  venue?: string;
  serviceFee: number;
  serviceHours?: HoursArrayTypes;
  // paymentReference?: string;
  status?: ReservationStatusType;
  createdAt?: Date;
  updatedAt?: Date;
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
