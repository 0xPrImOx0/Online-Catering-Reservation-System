"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chartDataType } from "../../../lib/caterer/analytics-metadata";
import { useState } from "react";
import { formatCurrency, formatNumber } from "@/utils/format-currency";

interface ChartOrdersProps {
  chartData: {
    monthly: {
      data: chartDataType[];
      totalSales: number;
      avgSales: number;
    };
    weekly: {
      data: chartDataType[];
      totalSales: number;
      avgSales: number;
    };
    daily: {
      data: chartDataType[];
      totalSales: number;
      avgSales: number;
    };
  };
}

export default function ChartOrders({ chartData }: ChartOrdersProps) {
  const [period, setPeriod] = useState<"monthly" | "weekly" | "daily">(
    "monthly"
  );

  const currentData = chartData[period].data;
  const totalSales = chartData[period].totalSales;
  const avgSales = chartData[period].avgSales;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chart Orders</h2>
        <Select
          defaultValue={period}
          onValueChange={(value) =>
            setPeriod(value as "monthly" | "weekly" | "daily")
          }
        >
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
      <div className="flex gap-12 items-start mb-4">
        <div>
          <div className="flex gap-2 items-center">
            <span className="text-xl font-bold">
              {formatCurrency(totalSales)}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">Total Sales</div>
        </div>
        <div>
          <div className="text-xl font-bold">{formatNumber(avgSales)}</div>
          <div className="text-sm text-muted-foreground">
            Avg. Sales per{" "}
            {period === "daily"
              ? "day"
              : period === "weekly"
              ? "week"
              : "month"}
          </div>
        </div>
      </div>
      <div className="h-[240px] relative">
        <div className="absolute top-0 left-0 text-xs text-muted-foreground">
          120
        </div>
        <div className="absolute left-0 top-1/4 text-xs text-muted-foreground">
          100
        </div>
        <div className="absolute left-0 top-1/2 text-xs text-muted-foreground">
          80
        </div>
        <div className="absolute left-0 top-3/4 text-xs text-muted-foreground">
          60
        </div>
        <svg className="w-full h-full" viewBox="0 0 400 240">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="60"
            x2="400"
            y2="60"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="120"
            x2="400"
            y2="120"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="180"
            x2="400"
            y2="180"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <path
            d={`M 0 ${240 - (currentData[0].value / 1000) * 2} ${currentData
              .map(
                (point, i) =>
                  `L ${i * (400 / (currentData.length - 1))} ${
                    240 - (point.value / 1000) * 2
                  }`
              )
              .join(" ")}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
          <path
            d={`M 0 ${240 - (currentData[0].value / 1000) * 2} ${currentData
              .map(
                (point, i) =>
                  `L ${i * (400 / (currentData.length - 1))} ${
                    240 - (point.value / 1000) * 2
                  }`
              )
              .join(" ")} L ${400} 240 L 0 240 Z`}
            fill="url(#gradient)"
          />
          {currentData.map((point, i) => (
            <circle
              key={i}
              cx={i * (400 / (currentData.length - 1))}
              cy={240 - (point.value / 1000) * 2}
              r="4"
              fill="#10b981"
            />
          ))}
        </svg>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {currentData.map((point, i) => (
            <div key={i}>{point.label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
