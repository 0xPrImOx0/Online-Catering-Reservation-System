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
import { PaxArrayType, SelectedMenu } from "@/types/reservation-types";

export default function SummaryBooking() {
  const { watch } = useFormContext<ReservationValues>();
  const { getMenuItem } = useReservationForm();

  // Use watch to get reactive form values
  const formValues = watch();

  const formattedDate = formValues.reservationDate
    ? formValues.reservationDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";
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
        <span className="flex items-center flex-1 text-gray-500 shrink-0">
          <Icon className="w-4 h-4 mr-2" />
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
      <motion.div
        variants={fadeIn}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 mr-2 text-gray-500" />
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
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Event Details
              </h3>
            </div>
            <ul className="space-y-4">
              <DetailRow
                icon={Utensils}
                label="Event Type"
                value={formValues.eventType || "Not provided"}
              />
              <DetailRow icon={Calendar} label="Date" value={formattedDate} />
              <DetailRow
                icon={Users}
                label="Guests"
                value={formValues.guestCount || "Not provided"}
              />
              {formValues.reservationType === "event" && (
                <>
                  <DetailRow
                    icon={Building}
                    label="Venue"
                    value={formValues.venue || "Not provided"}
                  />
                  <DetailRow
                    icon={Utensils}
                    label="Service"
                    value={formValues.serviceType || "Not provided"}
                  />
                  <DetailRow
                    icon={Utensils}
                    label="Service"
                    value={formValues.serviceType || "Not provided"}
                  />

                  {formValues.serviceType === "Plated" &&
                    formValues.serviceHours && (
                      <DetailRow
                        icon={Clock}
                        label="Hours"
                        value={formValues.serviceHours}
                      />
                    )}
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <Utensils className="w-5 h-5 mr-2 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Selected Menu
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {Object.entries(formValues.selectedMenus).map(
                ([category, menuIds]: [string, SelectedMenu]) => {
                  console.log(menuIds);

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
                              className="flex items-center gap-2 text-gray-700"
                            >
                              {menuIds[id].quantity > 1 ? (
                                <span className="text-green-600">
                                  {menuIds[id].quantity} X
                                </span>
                              ) : (
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50">
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

      {(formValues.specialRequests ||
        formValues.deliveryAddress ||
        formValues.deliveryInstructions) && (
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-5 h-5 mr-2 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Additional Information
                </h3>
              </div>

              <div className="space-y-6">
                {formValues.specialRequests && (
                  <div className="space-y-2">
                    <h4 className="flex items-center font-medium text-gray-700 text-md">
                      <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                      Special Requests
                    </h4>
                    <p className="p-3 text-sm text-gray-700 rounded-md bg-gray-50">
                      {formValues.specialRequests}
                    </p>
                  </div>
                )}

                {formValues.deliveryAddress && (
                  <div className="space-y-2">
                    <h4 className="flex items-center font-medium text-gray-700 text-md">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      Delivery Address
                    </h4>
                    <p className="p-3 text-sm text-gray-700 rounded-md bg-gray-50">
                      {formValues.deliveryAddress}
                    </p>
                  </div>
                )}

                {formValues.deliveryInstructions && (
                  <div className="space-y-2">
                    <h4 className="flex items-center font-medium text-gray-700 text-md">
                      <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                      Delivery Instructions
                    </h4>
                    <p className="p-3 text-sm text-gray-700 rounded-md bg-gray-50">
                      {formValues.deliveryInstructions}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
