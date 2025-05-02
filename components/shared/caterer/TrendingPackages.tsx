import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { trendingPackagesType } from "../../../lib/caterer/analytics-metadata";

interface TrendingPackagesProps {
  trendingPackages: trendingPackagesType[];
  formatCurrency: (amount: number) => string;
}

export default function TrendingPackages({ trendingPackages, formatCurrency }: TrendingPackagesProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Trending Packages</h2>
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
      <div className="space-y-4">
        {trendingPackages.map((pkg, index) => (
          <div key={pkg.id} className="flex gap-4 items-center">
            <div className="w-8 font-bold text-muted-foreground">#{index + 1}</div>
            <div className="overflow-hidden w-14 h-14 rounded-md">
              <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} width={56} height={56} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{pkg.name}</div>
              <div className="flex gap-2 items-center">
                <div className="text-sm text-muted-foreground">{formatCurrency(pkg.price)}</div>
                <Badge variant="outline" className="text-xs">{pkg.eventType}</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">{pkg.sales}</div>
              <div className="flex items-center text-xs text-emerald-500">
                <ArrowUpRight className="mr-1 w-3 h-3" />
                <span>Sales ({pkg.percentChange}%)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
