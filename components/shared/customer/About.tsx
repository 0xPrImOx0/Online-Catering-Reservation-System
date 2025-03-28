import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRightIcon, Info, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const AboutCards = ({
  title,
  link,
  image,
  footer,
}: {
  title: string;
  link: string;
  image: string;
  footer: string;
}) => {
  return (
    <Link
      href={link}
      className="flex flex-1 overflow-hidden min-h-[400px] rounded-lg border"
    >
      <div className="flex-1 ">
        <Image
          src={image}
          width={1200}
          height={800}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <h3 className="text-3xl font-semibold">{title}</h3>
        <div>
          <Separator decorative className="h-1 bg-foreground" />
          <div className="flex pt-4 items-center gap-4">
            {link === "/menus" ? <UtensilsCrossed /> : <Info />}
            <span className="text-lg font-medium flex-1">{footer}</span>
            <div className="p-2 border border-foreground rounded-full">
              <ArrowUpRightIcon className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function About() {
  return (
    <section className="min-h-[70vh] mt-24 gap-16 flex flex-col justify-center px-[5%]">
      <div className="flex">
        <div>
          <span className="text-muted-foreground text-sm">Food Sentinel</span>
          <h2 className="text-5xl font-semibold mb-8 text-center">
            Get to know us
          </h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          At Food Sentinel, we make catering reservations simple, fast, and
          hassle-free. Whether you're planning an intimate gathering or a grand
          celebration, our platform connects you with expertly crafted menus and
          seamless booking options. With a commitment to quality, convenience,
          and customer satisfaction, we ensure every event is a memorable dining
          experience.
        </p>
      </div>

      <div className="flex flex-wrap gap-20">
        <AboutCards
          title="Amazing Chefs behind Every Dishes!"
          link="/about-us"
          image="/images/chef.png"
          footer="About Us"
        />

        <AboutCards
          title="With a wide range Of menus available!"
          link="/menus"
          image="/images/tray.png"
          footer="Our Menus"
        />
      </div>
    </section>
  );
}
