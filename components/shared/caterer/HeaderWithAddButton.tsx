import { HeaderWithAddButtonProps } from "@/types/menu-types";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function HeaderWithAddButton({
  title,
  setIsAddInstanceOpen,
}: HeaderWithAddButtonProps) {
  return (
    <div className="flex justify-between items-start">
      <h1 className="text-5xl font-bold tracking-tight">{title}</h1>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className=""
          onClick={() => setIsAddInstanceOpen((prev) => !prev)}
        >
          <PlusIcon strokeWidth={2.5} className="min-w-5 min-h-5" />
          Create <span className="lowercase">{title}</span>
        </Button>
      </div>
    </div>
  );
}
