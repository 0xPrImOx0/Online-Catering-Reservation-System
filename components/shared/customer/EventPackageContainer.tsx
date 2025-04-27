"use client";

import { Button } from "@/components/ui/button";
import { type EventType, eventTypes } from "@/types/package-types";
import { EventPackageContainerProps } from "@/types/component-types";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import PlatedWarning from "../PlatedWarning";
import CustomerPackageCard from "./CustomerPackageCard";
import { CatererPackageCard } from "../caterer/CatererPackageCard";

export default function EventPackageContainer({
  cateringPackages,
  isCaterer,
  open,
}: EventPackageContainerProps) {
  const [serviceType, setServiceType] = useState("Buffet");
  const [selectedEventType, setSelectedEventType] = useState<EventType>("All");
  const [isPlated, setIsPlated] = useState(false);
  const [changeEventMobile, setChangeEventMobile] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsPlated(serviceType === "Plated");
    setChangeEventMobile(false);
  }, [serviceType, selectedEventType]);

  const eventPackages =
    selectedEventType === "All"
      ? cateringPackages
      : cateringPackages.filter((pkg) => pkg.eventType === selectedEventType);

  const pkgDescriptions = [
    {
      event: "All",
      description:
        "Celebrate your special day with our delicious Filipino cuisine.",
    },
    {
      event: "Birthday",
      description:
        "Celebrate your special day with our delicious Filipino cuisine.",
    },
    {
      event: "Wedding",
      description:
        "Make your wedding reception memorable with our exquisite catering services.",
    },
    {
      event: "Corporate",
      description:
        "Impress your colleagues and clients with our professional catering.",
    },
    {
      event: "Graduation",
      description:
        "Celebrate academic achievements with our special graduation packages.",
    },
  ];

  // Filter content that will be used in both desktop and mobile views
  const filterContent = (
    <section>
      <div>
        <Label className="text-muted-foreground">Event Types</Label>
        <div className="flex flex-col items-s space-y-4 mt-4">
          <Button
            variant={selectedEventType === "All" ? "default" : "ghost"}
            className={cn("font-medium rounded-sm justify-start", {
              "text-muted-foreground": selectedEventType !== "All",
            })}
            onClick={() => setSelectedEventType("All")}
          >
            <span className="text-left">All</span>
          </Button>
          {eventTypes.map((event) => (
            <Button
              variant={selectedEventType === event ? "default" : "ghost"}
              className={cn("font-medium rounded-sm justify-start", {
                "text-muted-foreground": selectedEventType !== event,
              })}
              onClick={() => setSelectedEventType(event)}
              key={event}
            >
              <span className="text-left">{event}</span>
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col space-y-4">
        <Label className="text-muted-foreground">Package Types</Label>
        {["Buffet", "Plated"].map((type) => (
          <Button
            variant={type === serviceType ? "default" : "ghost"}
            className={cn("font-medium rounded-sm justify-start", {
              "text-muted-foreground": type !== serviceType,
            })}
            onClick={() => setServiceType(type)}
            key={type}
          >
            <span className="text-left">{type}</span>
          </Button>
        ))}
      </div>
    </section>
  );

  return (
    <section
      className={cn(
        "flex gap-10 relative min-h-screen",
        isMobile && "flex-col gap-0"
      )}
    >
      {/* Mobile Filter Toggle Button */}
      {isMobile && (
        <Card className="w-full my-4 shadow-md">
          <Button
            className="w-full flex items-center justify-between !bg-transparent"
            onClick={() => setChangeEventMobile((prev) => !prev)}
            variant="ghost"
          >
            <span>Filter Packages</span>
            <div
              className={cn(
                "transition-transform duration-300",
                changeEventMobile ? "-rotate-180" : "rotate-0"
              )}
            >
              <ChevronDown />
            </div>
          </Button>
          {/* Mobile Filter Dropdown */}
          {isMobile && changeEventMobile && (
            <>
              <Separator />

              <CardContent>
                <CardContent className="mt-4 p-0 -mx-2">
                  {filterContent}
                </CardContent>
              </CardContent>
            </>
          )}
        </Card>
      )}

      {/* Desktop Sticky Sidebar */}
      {!isMobile && (
        <div className="sticky top-16 self-start h-fit min-w-[250px] border rounded-lg p-4 bg-background z-20 mt-5">
          {filterContent}
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-8 flex-1">
        <div className="mt-6 space-y-5">
          <div className="relative">
            {selectedEventType === "All" && (
              <h3 className="text-4xl font-semibold">All Event Packages</h3>
            )}
            {eventTypes.map((event, index) => (
              <h3 className="text-4xl font-semibold" key={index}>
                {event === selectedEventType && `${event} Packages`}
              </h3>
            ))}
            {pkgDescriptions.map(({ event, description }, index) => (
              <p className="text-sm text-muted-foreground mt-2" key={index}>
                {selectedEventType === event && description}
              </p>
            ))}
          </div>
          {serviceType === "Plated" && <PlatedWarning />}
        </div>
        <div
          className={`flex-1 grid grid-cols-1 ${
            open && isCaterer
              ? "lg:grid-cols-1 xl:grid-cols-2"
              : "lg:grid-cols-2"
          } gap-10`}
        >
          {eventPackages.length > 0 ? (
            eventPackages.map((pkg, index) =>
              isCaterer ? (
                <CatererPackageCard
                  key={index}
                  item={pkg}
                  isPlated={isPlated}
                />
              ) : (
                <CustomerPackageCard
                  key={index}
                  item={pkg}
                  isPlated={isPlated}
                />
              )
            )
          ) : (
            <div className="col-span-3 min-h-[50vh] flex justify-center items-center">
              <span className="font-bold text-4xl">No Package Found</span>{" "}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
