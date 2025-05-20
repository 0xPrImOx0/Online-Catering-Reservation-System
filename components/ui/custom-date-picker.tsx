"use client";

import * as React from "react";
import {
  addDays,
  format,
  getMonth,
  getYear,
  setMonth,
  setYear,
} from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  date: Date;
  setDate: (date: Date) => void;
  editable?: boolean;
  customDateFormat?: string;
  isPreviousMonthsUnselectable?: boolean;
  isFutureDatesUnselectable?: boolean;
  numberOfFutureDaysDisable?: number;
  showCalendar?: boolean;
}

export default function CustomDatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  date,
  setDate,
  editable = true,
  customDateFormat = "MMMM, yyyy",
  isPreviousMonthsUnselectable = false,
  isFutureDatesUnselectable = false,
  numberOfFutureDaysDisable = 0,
  showCalendar = true,
}: DatePickerProps) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  // Get current date information
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonth = getMonth(today);
  const currentYear = getYear(today);
  const isSameMonth =
    getMonth(date) === currentMonth && getYear(date) === currentYear;
  const minDate = addDays(today, numberOfFutureDaysDisable);

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const newYear = Number.parseInt(year);
    let newDate = setYear(date, newYear);

    // If enabling restriction and changing to current year with a month before current,
    // adjust the month accordingly
    if (
      isPreviousMonthsUnselectable &&
      newYear === currentYear &&
      getMonth(newDate) < currentMonth
    ) {
      newDate = setMonth(newDate, currentMonth);
    }

    setDate(newDate);
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Check if the date should be disabled based on the restrictions
      if (
        isPreviousMonthsUnselectable &&
        ((getYear(selectedDate) === currentYear &&
          getMonth(selectedDate) < currentMonth) ||
          getYear(selectedDate) < currentYear)
      ) {
        return; // Do not update if the date is in a previous month of the current year or a previous year
      }

      // Check if the date is in the future and should be disabled
      if (isFutureDatesUnselectable) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate > today) {
          return; // Do not update if the date is in the future
        }
      }

      if (numberOfFutureDaysDisable !== 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const minDate = addDays(today, numberOfFutureDaysDisable);
        if (selectedDate > today && selectedDate < minDate) {
          return;
        }
      }

      setDate(selectedDate);
    }
  };

  // Custom function to disable dates
  const disableDate = (date: Date) => {
    if (isPreviousMonthsUnselectable) {
      // Disable dates before today in the same month and year
      if (isSameMonth && date < today) {
        return true;
      }

      // Disable months before the current month in the same year
      if (getYear(date) === currentYear && getMonth(date) < currentMonth) {
        return true;
      }

      // Disable dates from previous years
      if (getYear(date) < currentYear) {
        return true;
      }
    }

    // Disable future dates
    if (isFutureDatesUnselectable) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date > today;
    }

    if (numberOfFutureDaysDisable !== 0) {
      return date > today && date < minDate;
    }

    return false;
  };

  // Ensure date is valid based on restrictions
  React.useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = addDays(today, numberOfFutureDaysDisable);

    let newDate = new Date(date);
    let shouldUpdateDate = false;

    // If numberOfFutureDaysDisable is set, check if date is valid
    if (numberOfFutureDaysDisable !== 0 && date > today && date < minDate) {
      newDate = minDate;
      shouldUpdateDate = true;
    }

    // Only apply previous months restrictions if the flag is true
    if (
      isPreviousMonthsUnselectable &&
      ((getYear(newDate) === currentYear && getMonth(newDate) < currentMonth) ||
        getYear(newDate) < currentYear)
    ) {
      newDate = new Date(currentYear, currentMonth, 1);
      shouldUpdateDate = true;
    }

    if (isFutureDatesUnselectable && newDate > today) {
      newDate = today;
      shouldUpdateDate = true;
    }

    if (shouldUpdateDate) {
      setDate(newDate);
    }
  }, [
    date,
    numberOfFutureDaysDisable,
    isPreviousMonthsUnselectable,
    isFutureDatesUnselectable,
    setDate,
    currentMonth,
    currentYear,
  ]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            !editable && "pointer-events-none"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <div className="flex items-center justify-between w-full">
            {date ? format(date, customDateFormat) : <span>Pick a date</span>}
            {editable && <ChevronDown />}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2 gap-x-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(date)]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {isPreviousMonthsUnselectable && getYear(date) === currentYear
                ? months.map((month, index) => (
                    <SelectItem
                      key={month}
                      value={month}
                      disabled={index < currentMonth}
                    >
                      {month}
                    </SelectItem>
                  ))
                : months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={getYear(date).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showCalendar && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            month={date}
            onMonthChange={(newMonth) => {
              const maxMonth = new Date(endYear, 11); // December of endYear
              const targetMonth = new Date(newMonth); // first day of selected month
              const currentDay = date.getDate();
              const targetYear = targetMonth.getFullYear();
              const targetMonthIndex = targetMonth.getMonth();
              const daysInTargetMonth = new Date(
                targetYear,
                targetMonthIndex + 1,
                0
              ).getDate();

              const desiredDay = Math.min(currentDay, daysInTargetMonth);

              let newDate = new Date(targetYear, targetMonthIndex, desiredDay);

              if (newMonth > maxMonth) return;

              // Handle restriction: Prevent setting to a disabled date (before the minDate or today + numberOfFutureDaysDisable)
              if (
                isPreviousMonthsUnselectable &&
                newDate < new Date(currentYear, currentMonth, minDate.getDate())
              ) {
                newDate = new Date(
                  currentYear,
                  currentMonth,
                  minDate.getDate()
                );
              }

              setDate(newDate);
            }}
            disabled={disableDate}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
