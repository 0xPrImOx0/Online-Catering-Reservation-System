import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type FooterCTAProps = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  px?: boolean;
  Icon: LucideIcon;
};

export default function FooterCTA({
  title,
  description,
  buttonLabel,
  href,
  px = false,
  Icon,
}: FooterCTAProps) {
  return (
    <section className={clsx("my-24", px && "px-[5%]")}>
      <div className="bg-foreground rounded-lg px-6 md:px-[2%] py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl text-background font-extrabold mb-3">
            {title}
          </h2>
          <p className="text-background">{description}</p>
        </div>
        <Button variant={"outline"} size={"landing"} className="max-md:mt-6">
          <Link href={href}>
            <Icon /> {buttonLabel}
          </Link>
        </Button>
      </div>
    </section>
  );
}
