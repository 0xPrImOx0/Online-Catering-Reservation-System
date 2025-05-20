"use client";

import { Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { usePackageForm } from "@/hooks/use-package-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

interface ReviewStepProps {
  formHook: ReturnType<typeof usePackageForm>;
}

export default function ReviewStep({ formHook }: ReviewStepProps) {
  const { form, previewImage, isSubmitSuccess } = formHook;
  const packageType = form.watch("packageType");

  return (
    <div className="space-y-4">
      {isSubmitSuccess ? (
        <div className="text-center py-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            Package Added Successfully!
          </h3>
          <p className="text-muted-foreground">
            Your new catering package has been added to the catalog.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-4">
            <Check className="h-10 w-10 text-primary mx-auto mb-2" />
            <h3 className="text-lg font-medium">Review Your Package</h3>
            <p className="text-sm text-muted-foreground">
              Please review all information before submitting
            </p>
          </div>

          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Name
                  </h5>
                  <p className="text-sm font-medium">{form.watch("name")}</p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Description
                  </h5>
                  <p className="text-sm break-words">
                    {form.watch("description")}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground">
                      Package Type
                    </h5>
                    <Badge variant="outline" className="mt-1">
                      {packageType === "BuffetPlated"
                        ? "Buffet & Plated"
                        : "Event"}
                    </Badge>
                  </div>

                  {packageType === "Event" ? (
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Event Type
                      </h5>
                      <Badge variant="outline" className="mt-1">
                        {form.watch("eventType") || "Not specified"}
                      </Badge>
                    </div>
                  ) : (
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Service Type
                      </h5>
                      <Badge variant="outline" className="mt-1">
                        {packageType}
                      </Badge>
                    </div>
                  )}
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Available
                  </h5>
                  <Badge
                    variant={form.watch("available") ? "default" : "outline"}
                    className="mt-1"
                  >
                    {form.watch("available") ? "Yes" : "No"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-base">Package Options</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Menu Items
                  </h5>
                  <div className="space-y-2 mt-1">
                    {form.watch("options")?.map((option, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 border rounded-md"
                      >
                        <span className="text-sm font-medium">
                          {option.category}
                        </span>
                        <Badge variant="secondary">
                          {option.count} item{option.count !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-base">Pricing & Capacity</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-3">
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Price Per Person
                  </h5>
                  <p className="text-sm font-medium">
                    &#8369;{form.watch("pricePerPax").toFixed(2)}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Guest Capacity
                  </h5>
                  <div className="flex justify-between text-sm mt-1">
                    <div>
                      <span className="text-muted-foreground">Minimum:</span>
                      <span className="ml-1 font-medium">
                        {form.watch("minimumPax")} guests
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Recommended:
                      </span>
                      <span className="ml-1 font-medium">
                        {form.watch("recommendedPax")} guests
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Maximum:</span>
                      <span className="ml-1 font-medium">
                        {form.watch("maximumPax")} guests
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="text-base">
                  Inclusions & Services
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid gap-4">
                {/* Inclusions Card */}
                <div>
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">
                    Inclusions
                  </h5>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {/* Both Column */}
                    <div>
                      <h6 className="text-xs font-medium text-muted-foreground mb-1">
                        For Both
                      </h6>
                      <div className="space-y-2">
                        {form
                          .watch("inclusions")
                          ?.filter((inc) => inc.typeOfCustomer === "Both")
                          .map((inclusion, index) => (
                            <div
                              key={`both-${index}`}
                              className="p-2 border rounded-md"
                            >
                              <span className="text-sm">
                                {inclusion.includes}
                              </span>
                            </div>
                          ))}
                        {form
                          .watch("inclusions")
                          ?.filter((inc) => inc.typeOfCustomer === "Both")
                          .length === 0 && (
                          <div className="p-2 border rounded-md bg-muted/20">
                            <span className="text-sm text-muted-foreground">
                              No inclusions for both
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buffet Column */}
                    <div>
                      <h6 className="text-xs font-medium text-muted-foreground mb-1">
                        For Buffet
                      </h6>
                      <div className="space-y-2">
                        {form
                          .watch("inclusions")
                          ?.filter((inc) => inc.typeOfCustomer === "Buffet")
                          .map((inclusion, index) => (
                            <div
                              key={`buffet-${index}`}
                              className="p-2 border rounded-md"
                            >
                              <span className="text-sm">
                                {inclusion.includes}
                              </span>
                            </div>
                          ))}
                        {form
                          .watch("inclusions")
                          ?.filter((inc) => inc.typeOfCustomer === "Buffet")
                          .length === 0 && (
                          <div className="p-2 border rounded-md bg-muted/20">
                            <span className="text-sm text-muted-foreground">
                              No inclusions for buffet
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Plated Column */}
                    <div>
                      <h6 className="text-xs font-medium text-muted-foreground mb-1">
                        For Plated
                      </h6>
                      <div className="space-y-2">
                        {form
                          .watch("inclusions")
                          ?.filter((inc) => inc.typeOfCustomer === "Plated")
                          .map((inclusion, index) => (
                            <div
                              key={`plated-${index}`}
                              className="p-2 border rounded-md"
                            >
                              <span className="text-sm">
                                {inclusion.includes}
                              </span>
                            </div>
                          ))}
                        {form
                          .watch("inclusions")
                          ?.filter((inc) => inc.typeOfCustomer === "Plated")
                          .length === 0 && (
                          <div className="p-2 border rounded-md bg-muted/20">
                            <span className="text-sm text-muted-foreground">
                              No inclusions for plated
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Card */}
                <div className="mt-2">
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">
                    Services
                  </h5>

                  <Alert variant="default" className="mb-3">
                    <Info className="h-4 w-4 mr-2" />
                    <AlertDescription className="text-xs">
                      The Total Service Fee (Service Charge per Hour × Service
                      Hours) is divided by the Minimum Pax and added to the
                      Price per Person to calculate the Total Price with
                      Service.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Service Hours
                      </h5>
                      <p className="text-sm">
                        {form.watch("serviceHours")} hours
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Service Charge per Hour
                      </h5>
                      <p className="text-sm">
                        &#8369;{form.watch("serviceCharge")}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Total Service Fee
                      </h5>
                      <p className="text-sm">
                        &#8369;{form.watch("totalServiceFee")}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Total Price with Service
                      </h5>
                      <p className="text-sm font-medium">
                        &#8369;{form.watch("pricePerPaxWithServiceCharge")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {(form.watch("imageUrl") || previewImage) && (
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5 pb-2">
                  <CardTitle className="text-base">Image</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="relative overflow-hidden h-96 flex items-center justify-center bg-muted rounded-md">
                    <Image
                      src={
                        form.watch("imageUploadType") === "url"
                          ? form.watch("imageUrl")
                          : previewImage || ""
                      }
                      alt="Package preview"
                      fill
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
