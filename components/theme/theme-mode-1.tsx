"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeSwitchToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Only show the UI once mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = resolvedTheme === "dark";

  return (
    <Button
      className={`flex items-center justify-between -mx-1.5 ${className}`}
      variant={"ghost"}
      asChild
    >
      <div className="cursor-pointer">
        <p className="flex items-center space-x-2 cursor-pointer">
          {isDarkMode ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <Label htmlFor="theme-mode" className="cursor-pointer">
            Dark Mode
          </Label>
        </p>
        <Switch
          id="theme-mode"
          checked={isDarkMode}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          defaultChecked={false}
        />
      </div>
    </Button>
  );
}
