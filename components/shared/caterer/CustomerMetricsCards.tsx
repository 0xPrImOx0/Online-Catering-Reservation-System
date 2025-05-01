import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerMetricsProps {
  totalCustomers: number;
  newCustomers: number;
  retentionRate: number;
  openConcerns: number;
}

export function  CustomerMetricsCards({
  totalCustomers,
  newCustomers,
  retentionRate,
  openConcerns,
}: CustomerMetricsProps) {
  return (
    <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Registered Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCustomers}</div>
          <p className="text-xs text-muted-foreground">
            All registered users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            New Registered Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {newCustomers}
          </div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Customer Retention Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {retentionRate}%
          </div>
          <p className="text-xs text-muted-foreground">Last 90 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Open Customer Concerns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {openConcerns}
          </div>
          <p className="text-xs text-muted-foreground">Awaiting response</p>
        </CardContent>
      </Card>
    </div>
  );
}
