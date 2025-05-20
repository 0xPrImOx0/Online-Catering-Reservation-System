import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { SearchInputProps } from "@/types/component-types";

export default function SearchInput({
  query,
  setQuery,
  placeholderTitle,
  iconStyle = "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
  inputStyle,
  hasFilter = false,
  activeFilterCount = 0,
  openFilter,
  setOpenFilter,
}: SearchInputProps) {
  return (
    <div className="relative flex-1 w-full">
      <Search className={`${iconStyle}`} />
      <Input
        type="search"
        placeholder={`Search ${placeholderTitle}`}
        className={`pl-8 ${inputStyle}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {hasFilter && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="relative "
            onClick={() => setOpenFilter?.(!openFilter)}
          >
            <SlidersHorizontal
              className={cn(
                "h-5 w-5",
                openFilter ? "text-green-500" : "text-gray-500"
              )}
            />
            {activeFilterCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex items-center justify-center bg-green-500 text-foreground text-xs rounded-full w-4 h-4">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
