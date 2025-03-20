import { Button } from "@/components/ui/button";
import { Info, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-8 text-center">
        About our catering service
      </h2>
      <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit
        sed velit id feugiat. Nam hendrerit velit vitae ex feugiat, at elementum
        tellus ac. Donec ante ipsum, dictum at tempor eu, mollis commoda turpis.
        Aliquam posuere consequat libero consequat aliquam. Aliquam posuere,
        nulla eu mollis varius, ex orci feugiat ante eu, mollis commoda turpis.
        Aliquam posuere consequat libero consequat aliquam. Aliquam posuere,
        nulla eu mollis varius, ex orci feugiat ante eu, mollis commoda turpis.
        Aliquam posuere consequat libero consequat aliquam.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="outline" size={"landing"} asChild>
          <Link href={"/about-us"}>
            <Info /> Who are we
          </Link>
        </Button>
        <Button size={"landing"} asChild>
          <Link href={"/menus"}>
            <UtensilsCrossed /> Our Menus
          </Link>
        </Button>
      </div>
    </section>
  );
}
