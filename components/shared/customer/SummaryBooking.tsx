"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  useReservationForm,
  type ReservationValues,
} from "@/hooks/use-reservation-form";
import {
  Calendar,
  Check,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  User,
  Mail,
  Users,
  Utensils,
  Building,
  LucideIcon,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { SelectedMenu } from "@/types/reservation-types";
import { format } from "date-fns";

export default function SummaryBooking() {
  const { watch } = useFormContext<ReservationValues>();
  const { getMenuItem, getPackageItem } = useReservationForm();

  // Use watch to get reactive form values
  const formValues = watch();

  const formattedDate = formValues.reservationDate
    ? new Date(formValues.reservationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  const formattedTime = formValues.reservationTime
    ? `${formValues.reservationTime} ${formValues.period}`
    : "No time selected";

  const currency = (amount: number) =>
    amount ? `₱${Number(amount).toLocaleString()}` : "₱0";
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const DetailRow = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: LucideIcon;
    label: string;
    value: string | number;
  }) => {
    return (
      <li className="flex items-start">
        <span className="flex flex-1 items-center text-gray-500 shrink-0">
          <Icon className="mr-2 w-4 h-4" />
          {label}
        </span>
        <span className="ml-2 font-medium text-gray-800">
          {value || "Not provided"}
        </span>
      </li>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="space-y-8"
    >
      {/* Customer Information & Reservation Details */}
      <motion.div
        variants={fadeIn}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <User className="mr-2 w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Customer Information
              </h3>
            </div>
            <ul className="space-y-4">
              <DetailRow icon={User} label="Name" value={formValues.fullName} />
              <DetailRow icon={Mail} label="Email" value={formValues.email} />
              <DetailRow
                icon={Phone}
                label="Phone"
                value={formValues.contactNumber}
              />
            </ul>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Calendar className="mr-2 w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Reservation Details
              </h3>
            </div>
            <ul className="space-y-4">
              <DetailRow
                icon={Utensils}
                label="Reservation Type"
                value={formValues.reservationType}
              />
              {formValues.eventType != "No Event" && (
                <DetailRow
                  icon={Utensils}
                  label="Event Type"
                  value={formValues.eventType || "Not provided"}
                />
              )}
              <DetailRow icon={Calendar} label="Date" value={formattedDate} />
              <DetailRow icon={Clock} label="Time" value={formattedTime} />
              <DetailRow
                icon={Users}
                label="Guests"
                value={formValues.guestCount || "Not provided"}
              />
              {formValues.reservationType === "event" && (
                <>
                  <DetailRow
                    icon={Utensils}
                    label="Service Type"
                    value={formValues.serviceType || "Not provided"}
                  />
                  {formValues.serviceType === "Plated" && (
                    <>
                      <DetailRow
                        icon={Building}
                        label="Venue"
                        value={formValues.venue || "Not provided"}
                      />
                      <DetailRow
                        icon={Clock}
                        label="Service Hours"
                        value={formValues.serviceHours as string}
                      />
                    </>
                  )}
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Selected Package */}
      {formValues.selectedPackage && (
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <Check className="mr-2 w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Selected Package
                </h3>
              </div>
              <span className="font-medium text-gray-800 text-md">
                {getPackageItem(formValues.selectedPackage)?.name}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Selected Menus */}

      {formValues.selectedMenus &&
        Object.keys(formValues.selectedMenus).length > 0 && (
          <motion.div variants={fadeIn}>
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Utensils className="mr-2 w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Selected Menus
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {Object.entries(formValues.selectedMenus).map(
                    ([category, menuIds]: [string, SelectedMenu]) => {
                      const menuIdArray = Object.keys(menuIds);
                      if (menuIdArray.length === 0) return null;
                      return (
                        <div key={category} className="space-y-4">
                          <h4 className="pb-2 font-medium text-gray-700 border-b border-gray-100 text-md">
                            {category}
                          </h4>
                          <ul className="space-y-3">
                            {menuIdArray.map((id) => {
                              const menu = getMenuItem(id);
                              return menu ? (
                                <li
                                  key={id}
                                  className="flex gap-2 items-center text-gray-700"
                                >
                                  {menuIds[id].quantity > 1 ? (
                                    <span className="text-green-600">
                                      {menuIds[id].quantity} X
                                    </span>
                                  ) : (
                                    <div className="flex justify-center items-center w-6 h-6 bg-green-50 rounded-full">
                                      <Check className="h-3.5 w-3.5 text-green-600" />
                                    </div>
                                  )}
                                  <span>{menu.name}</span>
                                </li>
                              ) : null;
                            })}
                          </ul>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

      {/* Payment & Status */}
      <motion.div variants={fadeIn}>
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <Check className="mr-2 w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Payment & Status
              </h3>
            </div>
            <ul className="space-y-4">
              <DetailRow
                icon={Check}
                label="Total Price"
                value={currency(formValues.totalPrice)}
              />
              <DetailRow
                icon={Check}
                label="Service Fee"
                value={currency(formValues.serviceFee)}
              />
              <DetailRow
                icon={Check}
                label="Delivery Fee"
                value={currency(formValues.deliveryFee)}
              />
              <DetailRow
                icon={Check}
                label="Payment Reference"
                value={formValues.paymentReference as string}
              />
              <DetailRow
                icon={Check}
                label="Status"
                value={formValues.status}
              />
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delivery Details */}
      {formValues.deliveryOption === "Delivery" &&
        (formValues.deliveryAddress || formValues.deliveryInstructions) && (
          <motion.div variants={fadeIn}>
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <MapPin className="mr-2 w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Delivery Details
                  </h3>
                </div>
                <ul className="space-y-4">
                  <DetailRow
                    icon={MapPin}
                    label="Delivery Option"
                    value={formValues.deliveryOption}
                  />
                  {formValues.deliveryAddress && (
                    <DetailRow
                      icon={MapPin}
                      label="Address"
                      value={formValues.deliveryAddress}
                    />
                  )}
                  {formValues.deliveryInstructions && (
                    <DetailRow
                      icon={MessageSquare}
                      label="Instructions"
                      value={formValues.deliveryInstructions}
                    />
                  )}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

      {/* Additional Information */}

      {(formValues.specialRequests ||
        formValues.createdAt ||
        formValues.updatedAt) && (
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <MessageSquare className="mr-2 w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Additional Information
                </h3>
              </div>
              <ul className="space-y-4">
                {formValues.specialRequests && (
                  <DetailRow
                    icon={MessageSquare}
                    label="Special Requests"
                    value={formValues.specialRequests}
                  />
                )}
                {formValues.createdAt && (
                  <DetailRow
                    icon={Clock}
                    label="Created At"
                    value={format(new Date(formValues.createdAt), "PPP - HH:mm:ss")}
                  />
                )}
                {formValues.updatedAt && (
                  <DetailRow
                    icon={Clock}
                    label="Last Updated"
                    value={format(new Date(formValues.updatedAt), "PPP - HH:mm:ss")}
                  />
                )}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
