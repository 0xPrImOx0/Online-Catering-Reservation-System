"use client";
import { useState, useRef, useEffect } from "react";
import type { FilterSectionProps } from "@/types/component-types";
import type { AllergenProps, CategoryProps } from "@/types/menu-types";
import { categorySelect, selectorItems } from "@/lib/menu-select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getCategoryIcon } from "@/lib/menu-category-badges";
import { getColorClasses } from "../customer/MenuCategoryBadge";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FilterDialog } from "./FilterDialog";
import { FilterDrawer } from "./FilterDrawer";
import { cn } from "@/lib/utils";
import SearchInput from "../SearchInput";

export default function FilterSection({
  query = "",
  setQuery,
  filters,
  setFilters,
}: FilterSectionProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [excludedAllergens, setExcludedAllergens] = useState<AllergenProps[]>(
    []
  );
  const categoriesRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Add state to track scroll position
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [needsScrolling, setNeedsScrolling] = useState(false);

  // Function to check if scrolling is needed and update button visibility
  const checkScrollability = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;

      // Check if content is wider than container
      setNeedsScrolling(scrollWidth > clientWidth + 5); // Add small buffer for rounding errors

      // Check if we can scroll left
      setCanScrollLeft(scrollLeft > 10);

      // Check if we can scroll right
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // Add buffer for rounding errors
    }
  };

  // Check scrollability on mount and when window resizes
  useEffect(() => {
    checkScrollability();

    const handleResize = () => {
      checkScrollability();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Add scroll event listener to update button visibility
  useEffect(() => {
    const categoriesElement = categoriesRef.current;
    if (categoriesElement) {
      const handleScroll = () => {
        checkScrollability();
      };

      categoriesElement.addEventListener("scroll", handleScroll);
      return () => {
        categoriesElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Function to scroll the categories container
  const scrollCategories = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const scrollAmount = categoriesRef.current.clientWidth * 0.8; // Scroll 80% of visible width
      const currentScroll = categoriesRef.current.scrollLeft;

      categoriesRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Scroll to the selected category
  useEffect(() => {
    if (categoriesRef.current && filters.category) {
      const selectedCategory = document.getElementById(
        `category-${filters.category}`
      );
      if (selectedCategory) {
        const containerRect = categoriesRef.current.getBoundingClientRect();
        const selectedRect = selectedCategory.getBoundingClientRect();

        // Calculate the scroll position to center the selected category
        const scrollLeft =
          selectedRect.left -
          containerRect.left -
          containerRect.width / 2 +
          selectedRect.width / 2 +
          categoriesRef.current.scrollLeft;

        categoriesRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });

        // Update scroll buttons after scrolling
        setTimeout(checkScrollability, 300);
      }
    }
  }, [filters.category]);

  // Add wheel event listener for horizontal scrolling
  useEffect(() => {
    const categoriesElement = categoriesRef.current;
    if (categoriesElement) {
      const handleWheel = (e: WheelEvent) => {
        if (needsScrolling) {
          e.preventDefault();
          // Scroll horizontally based on vertical wheel movement
          // Adjust the scroll speed by multiplying deltaY
          categoriesElement.scrollLeft += e.deltaY * 0.5;
          checkScrollability();
        }
      };

      categoriesElement.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      return () => {
        categoriesElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, [needsScrolling]);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value === "default" ? "" : value,
    }));
  };

  const toggleAllergen = (allergen: AllergenProps) => {
    if (excludedAllergens.includes(allergen)) {
      setExcludedAllergens(
        excludedAllergens.filter((prev) => prev !== allergen)
      );
    } else {
      setExcludedAllergens([...excludedAllergens, allergen]);
    }
  };

  // Update filters when excluded allergens change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      excludedAllergens: excludedAllergens,
    }));
  }, [excludedAllergens, setFilters]);

  // Update filters when price range changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }));
  }, [priceRange, setFilters]);

  const handleClearFilters = () => {
    setFilters({
      category: "",
      allergens: "",
      sortBy: "",
      excludedAllergens: [],
      minPrice: 0,
      maxPrice: 500,
      available: false,
      spicy: false,
    });
    setPriceRange([0, 500]);
    setExcludedAllergens([]);
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.allergens) count++;
    if (filters.sortBy) count++;
    if (excludedAllergens.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 500) count++;
    if (filters.available) count++;
    if (filters.spicy) count++;
    return count;
  };

  // Get sort by label
  const getSortByLabel = () => {
    const sortItem = selectorItems.find(
      (item) => item.value === filters.sortBy
    );
    return sortItem ? sortItem.title : "";
  };

  const filterProps = {
    filters,
    updateFilter,
    priceRange,
    setPriceRange,
    excludedAllergens,
    toggleAllergen,
    handleClearFilters,
    setOpenFilter,
  };

  return (
    <section className="mb-8 relative w-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full md:w-[80%]">
          <SearchInput
            query={query}
            setQuery={setQuery}
            placeholderTitle="for dishes..."
            iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
            inputStyle="pl-10 pr-10 py-5 rounded-full border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            hasFilter={true}
            activeFilterCount={getActiveFilterCount()}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
        </div>

        {/* Horizontally scrollable category selector with navigation buttons */}
        <div className="mt-4 relative w-full">
          {/* Only show left button if we can scroll left */}
          {needsScrolling && canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-foreground/15 shadow-sm"
              onClick={() => scrollCategories("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Horizontally scrollable category selector */}
          <div
            ref={categoriesRef}
            className="mt-4 flex overflow-x-auto pb-2 gap-2 scrollbar-hide w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            onScroll={checkScrollability}
          >
            <div className="flex gap-2 px-2 w-full justify-between">
              {categorySelect.map((category) => {
                const Icon = getCategoryIcon(
                  (category.value.charAt(0).toUpperCase() +
                    category.value.slice(1).toLowerCase()) as CategoryProps
                );

                return (
                  <Button
                    id={`category-${category.value}`}
                    key={category.value}
                    variant={
                      filters.category ===
                      (category.value === "all" ? "" : category.value)
                        ? "default"
                        : "outline"
                    }
                    onClick={() => updateFilter("category", category.value)}
                    className={cn(
                      "flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-lg transition-colors",
                      "md:min-w-[150px] md:min-h-[100px]",
                      "min-w-[80px]"
                    )}
                  >
                    <div className="mb-2 items-center justify-center hidden md:flex">
                      <Icon
                        strokeWidth={1.5}
                        style={{
                          width: "35px",
                          height: "35px",
                          background: "transparent",
                        }}
                        className={`${getColorClasses(
                          (category.value.charAt(0).toUpperCase() +
                            category.value
                              .slice(1)
                              .toLowerCase()) as CategoryProps
                        )}`}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {category.title}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          {needsScrolling && canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-foreground/15 shadow-sm"
              onClick={() => scrollCategories("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Use Dialog for desktop and Drawer for mobile */}
        {isMobile ? (
          <FilterDrawer
            open={openFilter}
            onOpenChange={setOpenFilter}
            {...filterProps}
          />
        ) : (
          <FilterDialog
            open={openFilter}
            onOpenChange={setOpenFilter}
            {...filterProps}
          />
        )}

        {getActiveFilterCount() > 0 && !openFilter && (
          <div className="mt-2 flex flex-wrap gap-3">
            {filters.category && (
              <Badge variant="outline" className="bg-background">
                <p className="text-green-950 dark:text-green-500">
                  Category:&nbsp;&nbsp;
                </p>
                {filters.category.charAt(0).toUpperCase() +
                  filters.category.slice(1).toLowerCase()}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("category", "all")}
                />
              </Badge>
            )}
            {filters.sortBy && (
              <Badge variant="outline" className="bg-background">
                <p className="text-green-950 dark:text-green-500">
                  Sort:&nbsp;&nbsp;
                </p>
                {getSortByLabel()}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("sortBy", "default")}
                />
              </Badge>
            )}
            {filters.available && (
              <Badge variant="outline" className="bg-background">
                Currently Available
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("available", "")}
                />
              </Badge>
            )}
            {filters.spicy && (
              <Badge variant="outline" className="bg-background">
                Spicy
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("spicy", "")}
                />
              </Badge>
            )}
            {excludedAllergens.map((allergen) => (
              <Badge key={allergen} variant="outline" className="bg-background">
                No {allergen}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => toggleAllergen(allergen)}
                />
              </Badge>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 500) && (
              <Badge variant="outline" className="bg-background">
                <p className="text-green-950 dark:text-green-500">
                  Price:&nbsp;&nbsp;
                </p>
                ₱{priceRange[0]} - ₱{priceRange[1]}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => setPriceRange([0, 500])}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="custom"
              className="text-xs text-red-500 hover:text-red-700"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
      <Separator className="mt-6" />
    </section>
  );
}
