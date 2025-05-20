"use client";

import { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { X } from "lucide-react";
import { ImageDialogProps } from "@/types/component-types";
import { usePathname } from "next/navigation";

export default function ImageDialog({
  item,
  isImageDialogOpen,
  setIsImageDialogOpen,
}: ImageDialogProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const pathname = usePathname();
  const isCaterer = pathname.includes("/caterer");

  return (
    <Dialog
      open={isImageDialogOpen}
      onOpenChange={(open) => {
        setIsImageDialogOpen(open);

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
      <DialogContent className="p-0 overflow-hidden bg-transparent border-0 shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{item.name}</DialogTitle>
          {"shortDescription" in item ? (
            <DialogDescription>{item.shortDescription}</DialogDescription>
          ) : (
            <DialogDescription>{item.description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="relative w-auto h-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <div className="relative z-10" ref={imageRef}>
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      width={1500}
                      height={725}
                      alt={item.name}
                    />
                    <DialogClose className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/70 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-black transition-colors">
                      <X className="h-5 w-5" />
                    </DialogClose>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-base">{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
