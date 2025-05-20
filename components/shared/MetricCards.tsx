import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type MetricCardProps = {
  metric: {
    title: string;
    value: string;
    description: string;
    Icon: LucideIcon;
  };
};

export default function MetricCards({ metric }: MetricCardProps) {
  const { title, value, description, Icon } = metric;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
          <Icon className="mr-1 w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">&#8369; {value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
