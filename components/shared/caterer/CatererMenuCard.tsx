"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import { Eye, Flame, Pencil, Trash2 } from "lucide-react";
import type { MenuCardProps } from "@/types/menu-types";
import { RenderStarRatings } from "../CustomStarRating";
import { MenuDetailsDialog } from "../customer/MenuDetailsDialog";
import { CategoryBadge } from "../customer/MenuCategoryBadge";
import DeleteMenuDialog from "./DeleteMenuDialog";
import ImageDialog from "../ImageDialog";
import { AnimatedIconButton } from "../AnimatedIconButton";
import EditMenuForm from "./EditMenuForm";
import { useSearchParams } from "next/navigation";
import { getQueryParams } from "@/utils/search-params";

export default function CatererMenuCard({ menu }: MenuCardProps) {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMenuDetailsDialogOpen, setIsMenuDetailsDialogOpen] =
    useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const { view, id } = getQueryParams(searchParams, ["view", "id"]);

    if (view === "image" && id === menu._id) {
      setIsImageDialogOpen(true);
      return;
    }

    if (view === "details" && id === menu._id) {
      setIsMenuDetailsDialogOpen(true);
      return;
    }

    setIsImageDialogOpen(false);
    setIsMenuDetailsDialogOpen(false);
  }, [searchParams, menu._id]);

  return (
    <Card className="min-w-[325px] flex-1 overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={menu.imageUrl || "/placeholder.svg"}
            alt={menu.name}
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
                  onClick={() => {
                    window.history.pushState(
                      {},
                      "",
                      `/caterer/menus?view=image&id=${menu._id}`
                    );
                    setIsImageDialogOpen(true);
                  }}
                >
                  <span className="sr-only">View {menu.name} image</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{menu.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="absolute top-2 right-2 flex gap-2 flex-wrap justify-end">
          <Badge
            variant={menu.available ? "default" : "destructive"}
            className={
              menu.available
                ? "bg-emerald-600 hover:bg-emerald-700 text-background"
                : "bg-red-500 text-background"
            }
          >
            {menu.available ? "Available" : "Unavailable"}
          </Badge>

          <CategoryBadge category={menu.category} />

          {menu.spicy && (
            <Badge
              variant="outline"
              className="bg-red-500 text-background border-red-500 flex items-center gap-1 hover:bg-red-600"
            >
              <Flame className="h-3 w-3" /> Spicy
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-black/70 backdrop-blur-sm rounded-md px-2.5 py-1.5">
                  {RenderStarRatings(menu.rating || 0, "medium")}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {menu.rating} out of 5 ({menu.ratingCount} reviews)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="absolute bottom-3 right-3">
          <div className="bg-black/70 backdrop-blur-sm text-white rounded-md px-2.5 py-1.5 font-bold">
            &#8369;{menu.prices[0].price.toFixed(2)}
          </div>
        </div>
      </div>

      <CardHeader className="p-5 pb-5">
        <CardTitle className="text-xl font-bold tracking-tight text-primary">
          {menu.name}
        </CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">
          {menu.shortDescription}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between border-t p-4 mt-auto">
        <Button
          variant="ghost"
          className="flex items-center gap-1 px-2 text-primary"
          onClick={() => {
            window.history.pushState(
              {},
              "",
              `/caterer/menus?view=details&id=${menu._id}`
            );
            setIsMenuDetailsDialogOpen(true);
          }}
        >
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </Button>

        <div className="flex gap-2">
          <AnimatedIconButton
            icon={Pencil}
            title="Edit"
            className="group transition-all duration-300 hover:w-auto text-amber-500"
            onClick={() => setIsEditMenuOpen(true)}
          />

          <AnimatedIconButton
            icon={Trash2}
            title="Delete"
            className="text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          />
        </div>
      </CardFooter>

      {/* Dialogs */}
      <EditMenuForm
        isEditMenuOpen={isEditMenuOpen}
        setIsEditMenuOpen={setIsEditMenuOpen}
        menu={menu}
      />

      <DeleteMenuDialog
        menu={menu}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />

      <ImageDialog
        item={menu}
        isImageDialogOpen={isImageDialogOpen}
        setIsImageDialogOpen={setIsImageDialogOpen}
      />

      <MenuDetailsDialog
        menu={menu}
        isMenuDetailsDialogOpen={isMenuDetailsDialogOpen}
        setIsMenuDetailsDialogOpen={setIsMenuDetailsDialogOpen}
      />
    </Card>
  );
}
