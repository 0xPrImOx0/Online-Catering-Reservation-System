"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function SuccessDialog({
  open,
  onOpenChange,
  title = "Success!",
  description = "Your changes have been saved.",
  buttonText = "Close",
}: SuccessDialogProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number }>
  >([]);

  useEffect(() => {
    if (open) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 8,
        speed: 0.5 + Math.random() * 1.5,
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-green-300 dark:bg-green-500 opacity-30 animate-float"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDuration: `${particle.speed * 10}s`,
              }}
            />
          ))}
        </div>

        <DialogHeader className="gap-4 relative z-10">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-green-100 dark:bg-green-900/30 animate-ping-slow"></div>
              <div className="absolute inset-0 rounded-full bg-green-200 dark:bg-green-800/30 animate-ping-slow animation-delay-500"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-full p-4 shadow-md animate-bounce-in">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-500">
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm6.93,8.2-6.85,9.29a1,1,0,0,1-1.43.19l-4.38-3.63a1,1,0,1,1,1.27-1.54l3.5,2.9,6.12-8.29a1,1,0,1,1,1.61,1.19Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-green-800 dark:text-green-300 animate-slide-in-right">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-green-700 dark:text-green-400 animate-slide-in-right animation-delay-100">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center sm:justify-center mt-4 relative z-10">
          <Button
            onClick={() => onOpenChange(false)}
            autoFocus
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-right animation-delay-200"
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
