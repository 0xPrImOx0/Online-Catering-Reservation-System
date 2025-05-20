import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { LucideIcon } from "lucide-react";

type MetricCardProps = {
  metric: {
    title: string;
    firstContent: string;
    secondContent: string;
    Icon: LucideIcon;
  };
};

export default function MetricCards({ metric }: MetricCardProps) {
  const { title, firstContent, secondContent, Icon } = metric;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
          <Icon className="mr-1 w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {title !== "Upcoming Reservations" && title !== "New Customers"
            ? formatCurrency(Number(firstContent))
            : firstContent}
        </div>
        <p className="text-xs text-muted-foreground">{secondContent}</p>
      </CardContent>
    </Card>
  );
}
