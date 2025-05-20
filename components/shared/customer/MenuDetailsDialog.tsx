"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Flame, X } from "lucide-react";
import type { MenuDetailsDialogProps } from "@/types/menu-types";
import { RenderStarRatings } from "../CustomStarRating";
import { CategoryBadge } from "./MenuCategoryBadge";
import { Card } from "@/components/ui/card";
import TrayPriceCard from "../TrayPriceCard";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function MenuDetailsDialog({
  menu,
  isMenuDetailsDialogOpen,
  setIsMenuDetailsDialogOpen,
}: MenuDetailsDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isCaterer = pathname.includes("/caterer");

  return (
    <Dialog
      open={isMenuDetailsDialogOpen}
      onOpenChange={(open) => {
        setIsMenuDetailsDialogOpen(open);

        if (!open) {
          // If the route is for caterer it goes back to /caterer/menus
          if (isCaterer) {
            window.history.pushState({}, "", `/caterer/menus`);
            return;
          }

          // If the route is not for caterer it goes back to /menus
          window.history.pushState({}, "", `/menus`);
        }
      }}
    >
      <DialogContent className="max-w-md md:max-w-xl w-full p-0 gap-0 max-h-[85vh] flex flex-col overflow-hidden rounded-md">
        <div className="">
          <div className="relative w-full">
            <Image
              src={menu.imageUrl || "/placeholder.svg"}
              alt={menu.name}
              width={600}
              height={100}
              className="object-cover max-h-[240px] overflow-hidden"
            />

            <div className="absolute top-2 right-2 flex gap-2">
              <Badge
                variant={menu.available ? "default" : "destructive"}
                className={cn({
                  "bg-emerald-600 dark:bg-emerald-500": menu.available,
                })}
              >
                {menu.available ? "Available" : "Unavailable"}
              </Badge>
              <CategoryBadge category={menu.category} />

              {menu.spicy && (
                <Badge
                  variant="outline"
                  className="bg-red-500 dark:bg-red-600 text-foreground border-red-500 dark:border-red-600 flex items-center gap-1"
                >
                  <Flame className="h-3 w-3" /> Spicy
                </Badge>
              )}
              <Button asChild variant={"secondary"}>
                <DialogClose className="h-8 w-8 z-10 rounded-full bg-background backdrop-blur-sm flex items-center justify-center transition-colors">
                  <X className="h-4 w-4" />
                </DialogClose>
              </Button>
            </div>
          </div>

          <div className="p-6 pb-2 border-b border-border">
            <div className="flex items-center justify-between -mt-2">
              <DialogTitle className="text-2xl text-foreground font-serif">
                {menu.name}
              </DialogTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>{RenderStarRatings(menu.rating || 0, "large")}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {menu.rating} out of 5 ({menu.ratingCount} reviews)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <DialogDescription className="text-muted-foreground mb-2">
              {menu.shortDescription}
            </DialogDescription>
            {!isCaterer && (
              <div className="flex justify-between items-center mb-2 bg-foreground text-background px-3 py-2 rounded-md">
                <span className="text-lg font-bold">
                  &#8369; {menu.regularPricePerPax.toFixed(2)} per pax
                </span>
                <Button
                  variant={"secondary"}
                  onClick={() => router.push(`/book-now/${menu._id}`)}
                >
                  Book Now
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-y-auto p-6 pt-4 space-y-4">
          <div className="space-y-2 mb-3">
            <h4 className="font-medium text-lg text-foreground">Description</h4>
            <p className="text-muted-foreground text-justify">
              {menu.fullDescription}
            </p>
          </div>

          {/* If no ingredients dont render it */}
          {menu.ingredients.length > 0 && (
            <div className="space-y-2 mb-3">
              <h4 className="font-medium text-lg text-foreground">
                Ingredients
              </h4>
              <div className="flex gap-2 flex-wrap">
                {menu.ingredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="outline"
                    className="font-medium"
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 mb-3">
            <h4 className="font-medium text-lg text-foreground">Allergens</h4>
            <div className="flex flex-wrap gap-1.5">
              {menu.allergens.length > 0 ? (
                menu.allergens.map((allergen) => (
                  <Badge key={allergen} variant="outline">
                    {allergen}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">None</span>
              )}
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <h4 className="font-medium text-lg text-foreground">
              Nutritional Information
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(menu.nutritionInfo).map(
                ([key, value]) =>
                  key !== "_id" && (
                    <Card
                      key={key}
                      className="flex justify-between p-2 rounded-md"
                    >
                      <span className="capitalize">{key}</span>
                      <span className="font-bold">{value}</span>
                    </Card>
                  )
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * Values are per serving
            </p>
          </div>

          <div className="space-y-2 mb-3">
            <h4 className="font-medium text-lg text-foreground">
              Preparation Method
            </h4>
            <p className="text-muted-foreground text-justify">
              {menu.preparationMethod}
            </p>
          </div>

          <div className="space-y-2 mb-3">
            <h4 className="font-medium text-lg text-foreground">Pricing</h4>
            <div className="space-y-2">
              <Card className="flex justify-between items-center p-2 rounded py-3">
                <div>
                  <p className="font-medium">Regular price per pax</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    &#8369;{menu.regularPricePerPax.toFixed(2)}
                  </p>
                </div>
              </Card>

              {menu.prices.map((price) => (
                <TrayPriceCard
                  key={price.minimumPax}
                  data={price}
                  regularPrice={menu.regularPricePerPax}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
