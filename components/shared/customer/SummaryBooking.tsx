"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useReservationForm,
  type ReservationValues,
} from "@/hooks/use-reservation-form";
import { Calendar, Check, MessageSquare, User, Utensils } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SelectedMenu } from "@/types/reservation-types";
import { CateringPackagesProps } from "@/types/package-types";

interface MenuItem {
  id: string;
  name: string;
}

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <li className="flex items-start">
      <span className="flex flex-1 items-center text-foreground font-medium shrink-0">
        {label}
      </span>
      <span className="ml-2 text-foreground">{value || "Not provided"}</span>
    </li>
  );
};

export default function SummaryBooking() {
  const { watch, setValue } = useFormContext<ReservationValues>();
  const { getMenuItem, getPackageItem } = useReservationForm();

  // Use watch to get reactive form values
  const formValues = watch();

  const [menuItems, setMenuItems] = useState<Record<string, MenuItem>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch menu item names when the component mounts or when selectedMenus changes
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!formValues.selectedMenus) {
        setIsLoading(false);
        return;
      }

      // Get all unique menu IDs from selectedMenus
      const menuIds = new Set<string>();
      Object.values(formValues.selectedMenus).forEach((menuGroup) => {
        Object.keys(menuGroup).forEach((id) => menuIds.add(id));
      });

      // Only fetch if there are menu items to process
      if (menuIds.size === 0) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch menu items in parallel
        const menuPromises = Array.from(menuIds).map(async (id) => {
          try {
            const menu = await getMenuItem(id);
            return menu ? { id, name: menu.name } : null;
          } catch (error) {
            console.error(`Error fetching menu item ${id}:`, error);
            return null;
          }
        });

        const menuItemsArray = await Promise.all(menuPromises);

        // Convert array to map for easier lookups
        const menuItemsMap = menuItemsArray.reduce<
          Record<string, { id: string; name: string }>
        >((acc, item) => {
          if (item) {
            acc[item.id] = item;
          }
          return acc;
        }, {});

        setMenuItems(menuItemsMap);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchMenuItems();
  }, [formValues.selectedMenus]);

  const formattedDate = formValues.reservationDate
    ? new Date(formValues.reservationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  const formattedTime = formValues.reservationTime
    ? `${formValues.reservationTime}`
    : "No time selected";

  const currency = (amount: number) =>
    amount ? `₱${Number(amount).toLocaleString()}` : "₱0";
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [selectedPackageData, setSelectedPackageData] =
    useState<CateringPackagesProps | null>(null);

  useEffect(() => {
    if (!formValues.selectedPackage) {
      setSelectedPackageData(null);
      return;
    }

    async function fetchPackage() {
      const pkg = await getPackageItem(formValues.selectedPackage!);
      setSelectedPackageData(pkg);
    }

    fetchPackage();
  }, [formValues.selectedPackage]);

  useEffect(() => {
    if (formValues.serviceType === "Plated") {
      setValue("orderType", "");
      setValue("deliveryAddress", "");
      setValue("deliveryInstructions", "");
      setValue("deliveryFee", 0);
    }
  }, [formValues.serviceType, setValue]);

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
      <motion.div variants={fadeIn}>
        <Card className="overflow-hidden border-2 shadow-md">
          <CardHeader className="py-4 border-b">
            <div className="flex items-center">
              <User className="mr-2 w-5 h-5 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                Customer Information
              </h3>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-4">
              <DetailRow label="Name" value={formValues.fullName} />
              <DetailRow label="Email" value={formValues.email} />
              <DetailRow label="Phone" value={formValues.contactNumber} />
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card className="overflow-hidden border-2 shadow-md">
          <CardHeader className="py-4 border-b">
            <div className="flex items-center">
              <Calendar className="mr-2 w-5 h-5 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                Reservation Details
              </h3>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-4">
              <DetailRow
                label="Reservation Type"
                value={formValues.eventType}
              />
              {formValues.eventType != "Others" && (
                <DetailRow
                  label="Event Type"
                  value={formValues.eventType || "Not provided"}
                />
              )}
              <DetailRow label="Date" value={formattedDate} />
              <DetailRow label="Time" value={formattedTime} />
              <DetailRow
                label="Guests"
                value={formValues.guestCount || "Not provided"}
              />
              <DetailRow
                label="Service Type"
                value={formValues.serviceType || "Not provided"}
              />
              {formValues.serviceType === "Plated" && (
                <>
                  <DetailRow
                    label="Venue"
                    value={formValues.venue || "Not provided"}
                  />
                  <DetailRow
                    label="Service Hours"
                    value={formValues.serviceHours as string}
                  />
                </>
              )}
              {formValues.serviceType !== "Plated" && (
                <>
                  {formValues.orderType === "Pickup" ? (
                    <DetailRow
                      label="Order Type"
                      value={formValues.orderType || "Not provided"}
                    />
                  ) : (
                    <>
                      <DetailRow
                        label="Order Type"
                        value={formValues.orderType || "Not provided"}
                      />
                      <DetailRow
                        label="Delivery Address"
                        value={formValues.deliveryAddress || "Not provided"}
                      />
                      <DetailRow
                        label="Delivery Instructions"
                        value={
                          formValues.deliveryInstructions || "Not provided"
                        }
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
          <Card className="overflow-hidden border-2 shadow-md">
            <CardHeader className="py-4 border-b">
              <div className="flex items-center">
                <Check className="mr-2 w-5 h-5 text-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Selected Package
                </h3>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <span className="font-medium text-foreground text-md">
                {selectedPackageData?.name || "No package selected"}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Selected Menus */}

      {formValues.selectedMenus &&
        Object.keys(formValues.selectedMenus).length > 0 && (
          <motion.div variants={fadeIn}>
            <Card className="overflow-hidden border-2 shadow-md">
              <CardHeader className="py-4 border-b">
                <div className="flex items-center">
                  <Utensils className="mr-2 w-5 h-5 text-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Selected Menus
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Conditionally apply grid-cols-2 only if there are more than 1 categories */}
                <div
                  className={`grid grid-cols-1 gap-8 ${
                    Object.entries(formValues.selectedMenus).filter(
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      ([_, menuIds]) => Object.keys(menuIds).length > 0
                    ).length > 1
                      ? "md:grid-cols-2"
                      : ""
                  }`}
                >
                  {Object.entries(formValues.selectedMenus).map(
                    ([category, menuIds]: [string, SelectedMenu]) => {
                      const menuIdArray = Object.keys(menuIds);
                      if (menuIdArray.length === 0) return null;
                      return (
                        // Each category is now wrapped in its own Card component
                        <Card
                          key={category}
                          className="overflow-hidden border shadow"
                        >
                          <CardHeader className="py-3 border-b bg-muted/30">
                            <h4 className="font-medium text-foreground text-md">
                              {category}
                            </h4>
                          </CardHeader>
                          <CardContent className="p-4">
                            <ul className="space-y-3">
                              {menuIdArray.map((id) => {
                                const menu = menuItems[id];
                                if (!menu) return null;

                                return (
                                  <li
                                    key={id}
                                    className="flex gap-2 items-center text-foreground"
                                  >
                                    {menuIds[id].quantity > 1 ? (
                                      <span className="text-green-600">
                                        {menuIds[id].quantity} X
                                      </span>
                                    ) : (
                                      <div className="flex justify-center items-center w-6 h-6 bg-green-700 rounded-full">
                                        <Check className="size-4 text-white" />
                                      </div>
                                    )}
                                    <span>{menu.name}</span>
                                  </li>
                                );
                              })}
                              {isLoading && menuIdArray.length === 0 && (
                                <div className="text-sm text-foreground">
                                  Loading menu items...
                                </div>
                              )}
                            </ul>
                          </CardContent>
                        </Card>
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
        <Card className="overflow-hidden border-2 shadow-md">
          <CardHeader className="py-4 border-b">
            <div className="flex items-center">
              <Check className="mr-2 w-5 h-5 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                Payment & Status
              </h3>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-4">
              <DetailRow
                label="Total Price"
                value={currency(formValues.totalPrice)}
              />
              {formValues.serviceFee > 0 && (
                <DetailRow
                  label="Service Fee"
                  value={currency(formValues.serviceFee)}
                />
              )}
              {formValues.deliveryFee > 0 && (
                <DetailRow
                  label="Delivery Fee"
                  value={currency(formValues.deliveryFee)}
                />
              )}
              {/* <DetailRow
                icon={Check}
                label="Payment Reference"
                value={formValues.paymentReference as string}
              />
              <DetailRow
                icon={Check}
                label="Status"
                value={formValues.status}
              /> */}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Information */}

      {formValues.specialRequests && (
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden border-2 shadow-md">
            <CardHeader className="py-4 border-b">
              <div className="flex items-center">
                <MessageSquare className="mr-2 w-5 h-5 text-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Additional Information
                </h3>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {formValues.specialRequests && (
                  <DetailRow
                    label="Special Requests"
                    value={formValues.specialRequests}
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
