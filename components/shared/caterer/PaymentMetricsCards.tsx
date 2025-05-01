import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface PaymentMetricsCardsProps {
  totalPaid: number;
  totalPending: number;
  totalPayments: number;
  pendingPayments: number;
}

export function PaymentMetricsCards({
  totalPaid,
  totalPending,
  totalPayments,
  pendingPayments,
}: PaymentMetricsCardsProps) {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
            <DollarSign className="mr-1 h-4 w-4 text-green-500" />
            Total Paid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            ${totalPaid.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            From all confirmed payments
          </p>
        </CardContent>
      </Card>

      <Card className="bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
            <DollarSign className="mr-1 h-4 w-4 text-red-500" />
            Pending Amount
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            ${totalPending.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Outstanding payments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPayments}</div>
          <p className="text-xs text-muted-foreground">
            All payment records
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pending Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            {pendingPayments}
          </div>
          <p className="text-xs text-muted-foreground">Awaiting payment</p>
        </CardContent>
      </Card>
    </div>
  );
}
