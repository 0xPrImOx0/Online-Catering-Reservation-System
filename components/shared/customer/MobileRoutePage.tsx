import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";
import { links } from "@/lib/customer/customer-nav-links";
import { usePathname } from "next/navigation";

const MobileRoutePage = () => {
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const pathname = usePathname();

  //This is to prevent Hydration Error
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const fillColor = isMediumScreen ? "#fff" : isDarkMode ? "#fff" : "#000";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="custom"
          className="p-1 bg-[rgb(39,39,42)] hover:bg-sidebar-accent-foreground dark:hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent-foreground dark:data-[state=open]:bg-sidebar-accent max-md:rounded-full max-md:size-10 max-xl:rounded-lg lg:hidden px-4"
        >
          {mounted && (
            <svg
              viewBox="0 0 24 24"
              width={100}
              height={100}
              fill={fillColor}
              aria-hidden="true"
              className="xfx01vb x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
            >
              <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z" />
            </svg>
          )}
          <p className="max-md:hidden max-lg:text-white">Quick Links</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg flex flex-col"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap">Quick Links</p>
              <Separator className="flex-1" />
            </div>
          </DropdownMenuLabel>

          <div className="space-y-2">
            {links.map(({ title, href, Icon }) => {
              const isActive = pathname === href;
              return (
                <DropdownMenuItem
                  className={`text-base cursor-pointer ${
                    isActive
                      ? "bg-sidebar-accent-foreground dark:bg-sidebar-accent text-white"
                      : "hover:bg-sidebar-accent-foreground/30 dark:hover:bg-sidebar-accent/30"
                  }`}
                  asChild
                  key={title}
                >
                  <Link href={href}>
                    <Icon />
                    {title}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileRoutePage;
