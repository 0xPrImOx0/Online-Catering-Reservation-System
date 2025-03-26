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
import EditPackageDialog from "./EditPackageDialog";
import DeletePackageDialog from "./DeletePackageDialog";
import PackageDetailsDialog from "../customer/PackageDetailsDialog";
import { MenuImageDialog } from "../customer/MenuImageDialog";

export function CatererPackageCard({ item }: PackageCardProps) {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [isEditPackageOpen, setIsEditPackageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showPackageDetails, setShowPackageDetails] = useState(false);

  return (
    <Card className="overflow-hidden max-w-md transition-all duration-300 hover:shadow-md flex flex-col h-full">
      <div className="relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="custom"
                variant="ghost"
                className="absolute inset-0 w-full h-full p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.name}
            width={500}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="absolute bottom-3 left-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1.5">
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
      </div>

      <CardHeader className="p-5 pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight text-primary">
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
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 text-amber-500"
            onClick={() => setIsEditPackageOpen(true)}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>

      {/* Preserve all dialog components */}
      <EditPackageDialog
        isEditPackageOpen={isEditPackageOpen}
        setIsEditPackageOpen={setIsEditPackageOpen}
      />
      <DeletePackageDialog
        item={item}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      <PackageDetailsDialog
        pkg={item}
        open={showPackageDetails}
        onOpenChange={setShowPackageDetails}
      />
      <MenuImageDialog
        item={item}
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
      />
    </Card>
  );
}
