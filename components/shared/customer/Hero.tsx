import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Highlights = ({ metric, title }: { metric: string; title: string }) => {
  return (
    <Card className="flex-1 p-4 rounded-sm sm:text-center">
      <span className="text-4xl font-medium">{metric} </span>{" "}
      <p className="text-muted-foreground text-sm min-w-max">{title}</p>
    </Card>
  );
};

export default function Hero() {
  return (
    <section className="flex flex-col gap-10 min-h-[750px] max-lg:my-10">
      <div className="flex flex-1 gap-8 flex-wrap justify-center items-center lg:gap-16">
        <div className="max-w-[500px] flex flex-col max-lg:items-center max-lg:text-center">
          <h1 className="font-semibold mb-4 text-5xl max-md:text-4xl">
            Seamless Catering, Unforgettable Events
          </h1>
          <p className="text-muted-foreground mb-6">
            Effortless bookings, delicious menus, and stress-free planning—all
            in one platform. Reserve your perfect event catering in just a few
            clicks!
          </p>
          <div>
            <Button className="mt-4 max-w-fit" size={"landing"} asChild>
              <Link href={"/book-now"}>
                <Calendar /> Book Now
              </Link>
            </Button>
            <Button
              className="mt-4 max-w-fit"
              size={"landing"}
              variant={"link"}
              asChild
            >
              <Link href={"/contact-us"}>
                <Phone /> Contact Us
              </Link>
            </Button>
          </div>
        </div>
        <div className="min-w-[355px] flex-1 max-w-[700px]">
          <Image
            src={"/images/hero.jpg"}
            width={150}
            height={150}
            alt="Hero Image"
            className="w-full h-full object-cover rounded-lg transform scale-x-[-1]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Highlights metric="5,000+" title="Events Successfully Catered" />
        <Highlights metric="&lt; 1 m" title="Instant Booking Confirmation" />
        <Highlights metric="95%" title="Customer Satisfaction Rate" />
      </div>
    </section>
  );
}
