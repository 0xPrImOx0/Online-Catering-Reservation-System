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
import { Check, CheckCircle2Icon, Clock, Users } from "lucide-react";
import Image from "next/image";
import { PackageCardProps } from "@/types/package-types";
import PackageDetailsDialog from "./PackageDetailsDialog";
import { RenderStarRatings } from "../CustomStarRating";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageDialog from "../ImageDialog";
import clsx from "clsx";

export default function CustomerPackageCard({
  item,
  isPlated,
}: PackageCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const platedInclusions = item.inclusions.filter((plated) =>
    isPlated
      ? plated.typeOfCustomer
      : plated.typeOfCustomer === "Both"
  );

  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader className="p-0 relative overflow-hidden rounded-t-lg z-0">
        <div
          className="relative h-52 w-full cursor-pointer"
          onClick={() => setIsImageDialogOpen((prev) => !prev)}
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
          <div className="absolute top-2 right-2 space-x-2">
            <Badge
              variant={item.available ? "default" : "destructive"}
              className={
                item.available
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-500"
              }
            >
              {item.available ? "Available" : "Unavailable"}
            </Badge>
            <Badge
              className={clsx(
                "bg-background text-foreground border-foreground",
                {
                  hidden: !isPlated,
                }
              )}
            >
              Plated
            </Badge>
          </div>

          {/* Star Ratings */}
          <div className="absolute bottom-3 left-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1.5">
                    {item.rating && RenderStarRatings(item.rating, "medium")}
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

          {item.serviceHours && (
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
            <div className="flex flex-wrap gap-4">
              {item.options.map((option, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs border-green-500 whitespace-nowrap"
                >
                  {option.count} {option.category}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Inclusions:</h4>
            <ul className="text-sm space-y-1 text-justify">
              {/* Show rice trays for buffet and plated packages */}
              {item.packageType !== "Event" && (
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                  {Math.ceil(item.minimumPax / 2)} trays of steamed rice (good
                  for {item.minimumPax * 2} pax)
                </li>
              )}
              {platedInclusions.slice(0, 4).map((inclusion, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                  {inclusion.includes}
                </li>
              ))}
              {platedInclusions.slice(4).length >= 1 && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => setDialogOpen(true)}
                >
                  +{platedInclusions.slice(4).length} more inclusions
                </Button>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={() => setDialogOpen(true)}>
          View Details
        </Button>
      </CardFooter>

      <PackageDetailsDialog
        pkg={item}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isPlated={isPlated}
        platedInclusions={platedInclusions}
      />

      <ImageDialog
        item={item}
        isImageDialogOpen={isImageDialogOpen}
        setIsImageDialogOpen={setIsImageDialogOpen}
      />
    </Card>
  );
}
