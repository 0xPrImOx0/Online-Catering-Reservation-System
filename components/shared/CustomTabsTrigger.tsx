import { TabsTrigger } from "../ui/tabs";

export default function TabsTriggerStyle({
  value,
  title,
}: {
  value: string;
  title: string;
}) {
  return (
    <TabsTrigger
      value={value}
      className="flex-1 hover:bg-muted-foreground/10 data-[state=active]:after:bg-foreground data-[state=active]:hover:bg-muted-foreground/10 relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
    >
      {title}
    </TabsTrigger>
  );
}
