import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mostSellingMenusType } from "@/lib/caterer/analytics-metadata";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MostSellingItemsProps {
  mostSellingMenus: mostSellingMenusType[];
  formatCurrency: (amount: number) => string;
}

export default function MostSellingItems({
  mostSellingMenus,
  formatCurrency,
}: MostSellingItemsProps) {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Most Selling Items</h2>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {mostSellingMenus.map((menu) => (
          <div
            key={menu.id}
            className="flex gap-4 items-center p-4 rounded-lg border transition-shadow hover:shadow-md"
          >
            <div className="overflow-hidden w-20 h-20 rounded-md">
              <Image
                src={menu.image || "/placeholder.svg"}
                alt={menu.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-base font-medium">{menu.name}</h3>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2 items-center mb-1">
                <span className="font-bold text-indigo-700">
                  {formatCurrency(menu.price)}
                </span>
                <Badge
                  variant="outline"
                  className="text-xs text-indigo-600 bg-indigo-50 border-indigo-200"
                >
                  {menu.category}
                </Badge>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-muted-foreground">
                  Serves for {menu.servesFor}
                </div>
                <div className="flex items-center text-sm font-medium text-emerald-600">
                  <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                  <span>Sold {menu.ratingCount} times</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
