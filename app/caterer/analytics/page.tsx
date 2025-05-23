import {
  chartData,
  favoriteMenus,
  mostSellingMenus,
  trendingPackages,
} from "@/lib/caterer/analytics-metadata";
import ChartOrders from "@/components/shared/caterer/ChartOrders";
import TrendingPackages from "@/components/shared/caterer/TrendingPackages";
import MostFavoritesItems from "@/components/shared/caterer/MostFavoritesItems";
import MostSellingItems from "@/components/shared/caterer/MostSellingItems";
import { formatCurrency, formatNumber } from "@/utils/format-currency";

export default function AnalyticsDashboard() {
  return (
    <main className="space-y-8 px-2 sm:px-14 md:px-10 max-w-[1440px] w-full mx-auto">
      <div className="flex justify-between items-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Insights to Drive Sales Performance and Business Growth.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
        <ChartOrders chartData={chartData} />
        <TrendingPackages
          trendingPackages={trendingPackages}
          formatCurrency={formatCurrency}
        />
      </div>
      <MostFavoritesItems
        favoriteMenus={favoriteMenus}
        formatNumber={formatNumber}
      />
      <MostSellingItems
        mostSellingMenus={mostSellingMenus}
        formatCurrency={formatCurrency}
      />
    </main>
  );
}
