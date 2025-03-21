"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
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
import { Flame } from "lucide-react";
import type { MenuCardProps, ServingSize } from "@/types/customer/menu-types";
import { RenderStarRatings } from "../CustomStarRating";
import { useMenuCalculations } from "@/hooks/useMenuCalculations";
import { MenuDetailsDialog } from "./MenuDetailsDialog";
import { MenuImageDialog } from "./MenuImageDialog";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "./MenuCategoryBadge";

export function MenuCard({ item }: MenuCardProps) {
  const [selectedServing, setSelectedServing] = useState<ServingSize>(6);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [menuPricePax, setMenuPricePax] = useState(item.prices[0].price);

  const { calculateSavings, calculateSavingsPercentage, calculatePricePerPax } =
    useMenuCalculations();

  return (
    <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="custom"
                variant="ghost"
                className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => setShowImageDialog(true)}
              >
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  height={192}
                  width={375}
                  className="w-full object-cover overflow-hidden  transition-transform duration-500 hover:scale-105"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="absolute top-2 right-2 flex gap-2">
          <Badge
            variant={item.available ? "default" : "destructive"}
            className={
              item.available
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-red-500 text-white"
            }
          >
            {item.available ? "Available" : "Unavailable"}
          </Badge>

          <CategoryBadge category={item.category} />

          {item.spicy && (
            <Badge
              variant="outline"
              className="bg-red-500 text-white border-red-500 flex items-center gap-1 hover:bg-red-600"
            >
              <Flame className="h-3 w-3" /> Spicy
            </Badge>
          )}
        </div>

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
          <div className="bg-black/70 backdrop-blur-sm text-white rounded px-2.5 py-1.5 font-bold">
            &#8369;
            {menuPricePax.toFixed(2)}
          </div>
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start">
          <div className="flex-1 min-w-0 pr-2">
            <CardTitle className="text-xl font-serif break-words">
              {item.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {item.shortDescription}
            </CardDescription>
          </div>
          <Badge className="bg-emerald-600 text-white border-emerald-600 whitespace-nowrap text-base py-1.5 h-auto hover:bg-emerald-700">
            {calculateSavingsPercentage({
              regularPricePerPax: item.regularPricePerPax,
              price: menuPricePax,
              servingSize: selectedServing,
            }).toFixed(0)}
            % OFF
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-md border">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-foreground">
                Price per person:
              </p>
              <p className="font-bold">
                &#8369;
                {item.regularPricePerPax}
                /pax
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-foreground">You save:</p>
              <p className="font-bold text-emerald-600 dark:text-emerald-500">
                &#8369;
                {calculateSavings({
                  regularPricePerPax: item.regularPricePerPax,
                  price: menuPricePax,
                  servingSize: selectedServing,
                }).toFixed(2)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Regular price: &#8369;{item.regularPricePerPax.toFixed(2)}/person
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
              Allergens:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.allergens.length > 0 ? (
                item.allergens.map((allergen) => (
                  <Badge key={allergen} variant="outline" className="text-xs">
                    {allergen}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">None</span>
              )}
            </div>
          </div>

          <div className="pt-1">
            <p className="text-xs font-medium uppercase text-muted-foreground mb-1">
              Select serving size:
            </p>
            <div className="flex gap-2 flex-wrap">
              {item.prices.map(({ minimumPax, maximumPax, price }) => {
                return (
                  <Button
                    key={minimumPax}
                    variant={
                      selectedServing === maximumPax ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setSelectedServing(maximumPax as ServingSize);
                      setMenuPricePax(price);
                    }}
                    className="text-xs w-[90px] py-1 h-auto"
                  >
                    {minimumPax} - {maximumPax} pax
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 mt-auto">
        <MenuDetailsDialog item={item}>
          <Button className="w-full" variant="default">
            View Details
          </Button>
        </MenuDetailsDialog>
      </CardFooter>

      {/* Image Dialog */}
      <MenuImageDialog
        item={item}
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
      />
    </Card>
  );
}
