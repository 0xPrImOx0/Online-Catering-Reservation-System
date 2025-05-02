// Utility formatting functions for currency and numbers

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number) {
  return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num.toString();
}
