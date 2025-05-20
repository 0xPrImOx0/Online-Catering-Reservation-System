import clsx from "clsx";
import { Badge } from "../ui/badge";

export default function StatusBadge({ status, onClick }: { status: string, onClick?: () => void }) {
  return (
    <Badge
      className={clsx("capitalize cursor-default", {
        "bg-green-100 text-green-800 hover:border-green-800":
          status === "confirmed" || "paid",
        "bg-yellow-100 text-yellow-800 hover:border-yellow-800":
          status === "pending",
        "bg-gray-100 text-gray-800 hover:border-gray-800":
          status === "completed",
        "bg-red-100 text-red-800 hover:border-red-800": status === "cancelled",
      })}
      onClick={onClick}
    >
      {status}
    </Badge>
  );
}
