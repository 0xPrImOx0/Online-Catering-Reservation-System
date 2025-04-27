"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { RenderStarRatings } from "../CustomStarRating";
import type { PackageCardProps } from "@/types/package-types";
import DeletePackageDialog from "./DeletePackageDialog";
import PackageDetailsDialog from "../customer/PackageDetailsDialog";
import { AnimatedIconButton } from "../AnimatedIconButton";
import ImageDialog from "../ImageDialog";
import EditPackageForm from "./EditPackageForm";

export function CatererPackageCard({ item, isPlated }: PackageCardProps) {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [isEditPackageOpen, setIsEditPackageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showPackageDetails, setShowPackageDetails] = useState(false);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full">
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.name}
            width={500}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute inset-0 w-full h-full p-0 cursor-pointer bg-transparent hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => setShowImageDialog(true)}
                >
                  <span className="sr-only">View {item.name} image</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="absolute bottom-3 left-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-black/70 backdrop-blur-sm rounded-md px-2.5 py-1.5">
                  {RenderStarRatings(item.rating || 0, "medium")}
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
          <div className="bg-black/70 backdrop-blur-sm text-foreground rounded-md px-2.5 py-1.5 font-bold">
            &#8369;{" "}
            {isPlated
              ? item.pricePerPaxWithServiceCharge.toFixed(2)
              : item.pricePerPax.toFixed(2)}{" "}
            / pax
          </div>
        </div>
      </div>

      <CardHeader className="p-5 pb-5">
        <CardTitle className="text-xl font-bold tracking-tight text-primary">
          {item.name}
        </CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-0 flex-grow" />

      <CardFooter className="flex justify-between border-t p-4">
        <Button
          variant="ghost"
          className="flex items-center gap-1 px-2 text-primary"
          onClick={() => setShowPackageDetails(true)}
        >
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </Button>

        <div className="flex gap-2">
          <AnimatedIconButton
            icon={Pencil}
            title="Edit"
            className="group transition-all duration-300 hover:w-auto text-amber-500"
            onClick={() => setIsEditPackageOpen(true)}
          />

          <AnimatedIconButton
            icon={Trash2}
            title="Delete"
            className="text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          />
        </div>
      </CardFooter>

      {/* Preserve all dialog components */}
      <EditPackageForm
        isEditPackageOpen={isEditPackageOpen}
        setIsEditPackageOpen={setIsEditPackageOpen}
        item={item}
      />
      <DeletePackageDialog
        item={item}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      <PackageDetailsDialog
        pkg={item}
        open={showPackageDetails}
        isPlated={isPlated}
        onOpenChange={setShowPackageDetails}
        platedInclusions={[]}
      />
      <ImageDialog
        item={item}
        isImageDialogOpen={showImageDialog}
        setIsImageDialogOpen={setShowImageDialog}
      />
    </Card>
  );
}
