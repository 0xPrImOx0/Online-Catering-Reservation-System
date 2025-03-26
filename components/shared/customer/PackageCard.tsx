"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Users } from "lucide-react";
import Image from "next/image";
import {
  PackageCardProps,
  // PlatedPackage,
} from "@/types/customer/package-types";
import PackageDetailsDialog from "./PackageDetailsDialog";
import { RenderStarRatings } from "../CustomStarRating";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PackageCard({
  item,
  openImageDialog,
}: PackageCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const isPlated = "serviceHours" in item;
  const isAvailable = true; // Assuming all packages are available by default

  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader className="p-0 relative overflow-hidden rounded-t-lg z-0">
        <div
          className="relative h-52 w-full cursor-pointer"
          onClick={() =>
            openImageDialog && openImageDialog(item.imageUrl, item.name)
          }
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="w-full object-cover overflow-hidden transition-transform duration-500 hover:scale-105"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="absolute top-2 right-2">
            <Badge
              variant={isAvailable ? "default" : "destructive"}
              className={
                isAvailable
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-500"
              }
            >
              {isAvailable ? "Available" : "Unavailable"}
            </Badge>
          </div>

          {/* Star Ratings */}
          <div className="absolute bottom-3 left-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-black/70 backdrop-blur-sm rounded px-2.5 py-1.5">
                    {RenderStarRatings(item.rating, "medium")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {item.rating} out of 5 ({item.ratingCount} reviews)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="bg-black/70 backdrop-blur-sm text-white rounded px-2 py-1 font-bold">
              &#8369; {item.pricePerPax.toFixed(2)} / pax
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-muted-foreground text-sm text-justify">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Min: {item.minimumPax} | Recommended: {item.recommendedPax} | Max:{" "}
              {item.maximumPax}
            </span>
          </div>

          {isPlated && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {item?.serviceHours} hours of service included
              </span>
            </div>
          )}

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Menu Options:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-2">
              {item.options.map((option, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className="text-xs whitespace-nowrap"
                  >
                    {option.count} {option.category}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Inclusions:</h4>
            <ul className="text-sm space-y-1 text-justify">
              {/* Show rice trays for buffet and plated packages */}
              {!item.id.includes("event") && (
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  {Math.ceil(item.minimumPax / 2)} trays of steamed rice (good
                  for {item.minimumPax / 2} pax)
                </li>
              )}
              {item.inclusions.slice(0, 4).map((inclusion, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  {inclusion}
                </li>
              ))}
              {item.inclusions.length > 4 && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => setDialogOpen(true)}
                >
                  +{item.inclusions.length - 4} more inclusions
                </Button>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={() => setDialogOpen(true)}>
          Select Package
        </Button>
      </CardFooter>

      <section className="mt-auto">
        <PackageDetailsDialog
          pkg={item}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </section>
    </Card>
  );
}
