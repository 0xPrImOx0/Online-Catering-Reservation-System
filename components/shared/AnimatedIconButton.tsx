"use client";

import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

interface AnimatedIconButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: LucideIcon;
  title: string;
  className?: string;
}

export function AnimatedIconButton({
  icon: Icon,
  title,
  className,
  ...props
}: AnimatedIconButtonProps) {
  return (
    <Button
      variant={"none"}
      className={`
        group 
        h-9 
        flex items-center
        w-auto
        lg:w-9 
        lg:transition-all lg:duration-300 
        lg:hover:w-auto 
        border border-gray bg-transparent
        ${className || ""}
      `}
      {...props}
    >
      <div className="flex items-center">
        <Icon className="h-4 w-4 flex-shrink-0" />
        <span
          className="
          ml-2 whitespace-nowrap
          lg:ml-0 lg:w-0 lg:overflow-hidden lg:opacity-0 
          lg:transition-all lg:duration-300 
          lg:group-hover:w-auto lg:group-hover:opacity-100 lg:group-hover:ml-2"
        >
          {title}
        </span>
      </div>
      <span className="sr-only">{title}</span>
    </Button>
  );
}
