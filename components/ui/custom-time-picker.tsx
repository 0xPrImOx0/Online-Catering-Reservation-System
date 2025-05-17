"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import { parse, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}

export function TimePicker({
  value,
  onChange,
  disabled = false,
}: TimePickerProps) {
  // State for the displayed time string
  const [displayValue, setDisplayValue] = useState(value);

  // Parse the current value
  const timeDate = displayValue
    ? parse(displayValue, "hh:mm a", new Date())
    : new Date();

  // Extract hours, minutes, and period from the current value
  const [selectedHour, setSelectedHour] = useState(format(timeDate, "h"));
  const [selectedMinute, setSelectedMinute] = useState(format(timeDate, "mm"));
  const [selectedPeriod, setSelectedPeriod] = useState(format(timeDate, "a"));

  // Update the time string when any component changes
  const updateTimeString = (hour: string, minute: string, period: string) => {
    const formattedHour = hour.padStart(2, "0");
    const formattedMinute = minute.padStart(2, "0");
    const timeString = `${formattedHour}:${formattedMinute} ${period}`;
    setDisplayValue(timeString);
    onChange(timeString);
  };

  // Handle hour change
  const handleHourChange = (value: string) => {
    setSelectedHour(value);
    updateTimeString(value, selectedMinute, selectedPeriod);
  };

  // Handle minute change
  const handleMinuteChange = (value: string) => {
    setSelectedMinute(value);
    updateTimeString(selectedHour, value, selectedPeriod);
  };

  // Handle period change (AM/PM)
  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    updateTimeString(selectedHour, selectedMinute, value);
  };

  useEffect(() => {
    const now = new Date();
    const todayStr = format(now, "hh:mm a");
    const initHour = format(now, "h");
    const initMinute = format(now, "mm");
    const initPeriod = format(now, "a");

    if (value) {
      try {
        const timeDate = parse(value, "hh:mm a", now);
        setSelectedHour(format(timeDate, "h"));
        setSelectedMinute(format(timeDate, "mm"));
        setSelectedPeriod(format(timeDate, "a"));
        setDisplayValue(value);
      } catch {
        // initializeWithCurrentTime body inlined:
        setSelectedHour(initHour);
        setSelectedMinute(initMinute);
        setSelectedPeriod(initPeriod);
        setDisplayValue(todayStr);
        if (!value) onChange(todayStr);
      }
    } else {
      // same initializer for “no value”
      setSelectedHour(initHour);
      setSelectedMinute(initMinute);
      setSelectedPeriod(initPeriod);
      setDisplayValue(todayStr);
      onChange(todayStr);
    }
  }, [value, onChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !displayValue && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />

          <div className="flex items-center justify-between w-full">
            {displayValue || "Select time"}
            {!disabled && <ChevronDown />}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex gap-2">
          <div className="flex flex-col">
            <div className="text-xs text-muted-foreground mb-2">Hour</div>
            <Select value={selectedHour} onValueChange={handleHourChange}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-muted-foreground mb-2">Minute</div>
            <Select value={selectedMinute} onValueChange={handleMinuteChange}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <SelectItem
                    key={minute}
                    value={minute.toString().padStart(2, "0")}
                  >
                    {minute.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-muted-foreground mb-2">Period</div>
            <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="AM/PM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
