"use client";

import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Info, Users } from "lucide-react";
import type {
  BookingFormData,
  PackageBookFormProps,
  // PlatedPackage,
} from "@/types/package-types";
import { bookingSteps } from "@/lib/shared/packages-metadata";

export default function PackageBookForm({
  package: pkg,
}: PackageBookFormProps) {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    venue: "",
    serviceHours: "4",
    specialRequests: "",
  });

  const handleBookingChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const nextBookingStep = () => {
    if (bookingStep < bookingSteps.length - 1) {
      setBookingStep(bookingStep + 1);
    }
  };

  const prevBookingStep = () => {
    if (bookingStep > 0) {
      setBookingStep(bookingStep - 1);
    }
  };

  const submitBooking = () => {
    setBookingComplete(true);
    setBookingStep(0); // Reset the step when completing the booking
  };

  const resetBooking = () => {
    setBookingStep(0);
    setBookingComplete(false);
    setBookingDialogOpen(false);
    setBookingData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      guestCount: "",
      venue: "",
      serviceHours: "4",
      specialRequests: "",
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setBookingDialogOpen(true)}>
        Book Now
      </Button>

      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {bookingComplete ? "Booking Confirmed!" : `Book ${pkg.name}`}
            </DialogTitle>
            <DialogDescription>
              {bookingComplete
                ? "Thank you for your booking. Our team will contact you shortly to confirm the details."
                : "Complete the form below to book this package for your event."}
            </DialogDescription>
          </DialogHeader>

          {!bookingComplete ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  {bookingSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex flex-col items-center ${
                        index < bookingStep
                          ? "text-primary"
                          : index === bookingStep
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          index < bookingStep
                            ? "bg-primary text-primary-foreground"
                            : index === bookingStep
                            ? "border-2 border-primary"
                            : "border-2 border-muted"
                        }`}
                      >
                        {index < bookingStep ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  ))}
                </div>
                <div className="relative mt-2">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                    <div
                      className="absolute top-0 left-0 h-1 bg-primary transition-all"
                      style={{
                        width: `${
                          (bookingStep / (bookingSteps.length - 1)) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="py-4">
                {bookingStep === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="booking-name">Full Name</Label>
                        <Input
                          id="booking-name"
                          placeholder="Enter your full name"
                          value={bookingData.name}
                          onChange={(e) =>
                            handleBookingChange("name", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="booking-email">Email Address</Label>
                        <Input
                          id="booking-email"
                          type="email"
                          placeholder="Enter your email address"
                          value={bookingData.email}
                          onChange={(e) =>
                            handleBookingChange("email", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="booking-phone">Phone Number</Label>
                        <Input
                          id="booking-phone"
                          placeholder="Enter your phone number"
                          value={bookingData.phone}
                          onChange={(e) =>
                            handleBookingChange("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="booking-eventType">Event Type</Label>
                        <Select
                          onValueChange={(value) =>
                            handleBookingChange("eventType", value)
                          }
                          value={bookingData.eventType}
                        >
                          <SelectTrigger id="booking-eventType">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="birthday">Birthday</SelectItem>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="graduation">
                              Graduation
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="booking-eventDate">Event Date</Label>
                        <Input
                          id="booking-eventDate"
                          type="date"
                          value={bookingData.eventDate}
                          onChange={(e) =>
                            handleBookingChange("eventDate", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="booking-guestCount">
                          Number of Guests
                        </Label>
                        <Input
                          id="booking-guestCount"
                          type="number"
                          placeholder="Enter expected number of guests"
                          value={bookingData.guestCount}
                          onChange={(e) =>
                            handleBookingChange("guestCount", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="booking-venue">Venue</Label>
                        <Input
                          id="booking-venue"
                          placeholder="Enter event venue"
                          value={bookingData.venue}
                          onChange={(e) =>
                            handleBookingChange("venue", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="booking-serviceHours">
                        Service Hours
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleBookingChange("serviceHours", value)
                        }
                        value={bookingData.serviceHours}
                      >
                        <SelectTrigger id="booking-serviceHours">
                          <SelectValue placeholder="Select service hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="5">5 hours</SelectItem>
                          <SelectItem value="6">6 hours</SelectItem>
                          <SelectItem value="8">8 hours</SelectItem>
                          <SelectItem value="10">10 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-6">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-3">
                        Selected Package: {pkg.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {pkg.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              Min: {pkg.minimumPax} | Recommended:{" "}
                              {pkg.recommendedPax} | Max: {pkg.maximumPax}
                            </span>
                          </div>
                          {pkg.serviceHours && (
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {pkg.serviceHours} hours of service included
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-xl font-bold text-primary">
                            &#8369;{pkg.pricePerPax.toLocaleString()} per pax
                          </div>
                          <div className="mt-2">
                            <h4 className="font-medium mb-1">Menu Options:</h4>
                            <div className="grid grid-cols-2 gap-1">
                              {pkg.options
                                // .filter((option) => option.required)
                                .map((option, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-1"
                                  >
                                    <Badge
                                      variant="default"
                                      className="text-xs"
                                    >
                                      {option.count} {option.category}
                                      {option.count > 1 ? "s" : ""}
                                    </Badge>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <div className="space-y-2">
                      <Label htmlFor="booking-specialRequests">
                        Special Requests
                      </Label>
                      <Textarea
                        id="booking-specialRequests"
                        placeholder="Any special requests, dietary requirements, or specific menu preferences?"
                        value={bookingData.specialRequests}
                        onChange={(e) =>
                          handleBookingChange("specialRequests", e.target.value)
                        }
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">
                          Customer Information
                        </h3>
                        <ul className="text-sm space-y-1">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span>{bookingData.name}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Email:
                            </span>
                            <span>{bookingData.email}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Phone:
                            </span>
                            <span>{bookingData.phone}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Event Details</h3>
                        <ul className="text-sm space-y-1">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Event Type:
                            </span>
                            <span>{bookingData.eventType}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span>{bookingData.eventDate}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Guests:
                            </span>
                            <span>{bookingData.guestCount}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Venue:
                            </span>
                            <span>{bookingData.venue}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">
                              Service Hours:
                            </span>
                            <span>{bookingData.serviceHours} hours</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Selected Package</h3>
                      <div className="bg-muted p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{pkg.name}</span>
                          <span className="font-bold">
                            &#8369;{pkg.pricePerPax.toLocaleString()} per pax
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {pkg.description}
                        </p>
                      </div>
                    </div>

                    {bookingData.specialRequests && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-2">Special Requests</h3>
                          <p className="text-sm bg-muted p-3 rounded-md">
                            {bookingData.specialRequests}
                          </p>
                        </div>
                      </>
                    )}

                    <div className="bg-primary/10 p-4 rounded-md mt-4">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Booking Summary</h4>
                          <p className="text-sm mt-1">
                            Total estimated cost:{" "}
                            <span className="font-bold">
                              &#8369;
                              {(Number.parseInt(bookingData.guestCount) || 0) *
                                pkg.pricePerPax}
                            </span>{" "}
                            for {bookingData.guestCount || 0} guests
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            A 50% deposit is required to confirm your booking.
                            Our team will contact you with payment instructions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex justify-between">
                {bookingStep > 0 ? (
                  <Button variant="outline" onClick={prevBookingStep}>
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}
                {bookingStep < bookingSteps.length - 1 ? (
                  <Button onClick={nextBookingStep}>Next</Button>
                ) : (
                  <Button onClick={submitBooking}>Confirm Booking</Button>
                )}
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <Check className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Booking Successful!</h3>
                <p className="text-center text-muted-foreground mb-6 max-w-md">
                  Thank you for booking with us. We&apos;ve sent a confirmation
                  email to {bookingData.email}. Our team will contact you within
                  24 hours to finalize the details.
                </p>
                <div className="bg-muted p-4 rounded-md w-full max-w-md">
                  <h4 className="font-medium mb-2">Booking Reference</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Booking ID:</span>
                    <span className="font-mono">{`BK-${Date.now()
                      .toString()
                      .slice(-6)}`}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-muted-foreground">Package:</span>
                    <span>{pkg.name}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-muted-foreground">Event Date:</span>
                    <span>{bookingData.eventDate}</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={resetBooking}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
