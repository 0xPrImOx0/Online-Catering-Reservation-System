import React from "react";
import { Card } from "../ui/card";
import { useMenuForm } from "@/hooks/use-menu-form";

export default function TrayPriceCard({
  data,
  regularPrice,
}: {
  data: {
    minimumPax: number;
    maximumPax: number;
    price: number;
    discount: number;
  };
  regularPrice: number;
}) {
  // ₱ = &#8369;

  const { minimumPax, maximumPax, price } = data;
  const { calculatePricePerPax, calculateSavings } = useMenuForm();

  return (
    <Card
      key={maximumPax}
      className="flex justify-between items-center p-2 rounded-md"
    >
      <div>
        <p className="font-medium">{`${minimumPax} - ${maximumPax}`} pax</p>
        <p className="text-sm text-muted-foreground">
          &#8369; {calculatePricePerPax(price, maximumPax).toFixed(2)} per
          person
        </p>
      </div>
      <div className="text-right">
        <p className="font-bold">&#8369; {price.toFixed(2)}</p>
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Saved &#8369;
          {calculateSavings({
            regularPricePerPax: regularPrice,
            price,
            servingSize: maximumPax,
          })}
        </p>
      </div>
    </Card>
  );
}
