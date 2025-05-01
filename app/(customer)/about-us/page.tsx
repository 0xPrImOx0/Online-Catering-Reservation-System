import { CheckCircle } from "lucide-react";
import Logo from "@/components/icons/logo";
import FAQ from "@/components/shared/customer/FAQ";
import { principles, teams } from "../../../lib/customer/metadata";
import Image from "next/image";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import Highlights from "@/components/shared/customer/Highlights";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="flex text-center justify-center items-center  h-[93.5dvh] bg-[url('/images/about.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <Logo imageSize={300} withTitle={false} />
          <h1 className="mb-4 text-4xl font-bold text-background">
            Food Sentinel
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted">
            Crafting extraordinary culinary experiences with passion, precision,
            and the finest ingredients since 2002.
          </p>
          {/* <div className="flex gap-4 justify-center">
            <Button size={"landing"}>Our Services</Button>
            <Button variant="outline" size={"landing"} asChild>
              <Link href={"/contact-us"}>Contact Us</Link>
            </Button>
          </div> */}
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-24 max-w-[1200px] mx-auto px-[5%]">
        <div className="">
          <h2 className="mb-4 text-3xl font-bold text-center">
            The Principles We Stand By
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-center text-muted-foreground">
            Our commitment to excellence goes beyond just great food. We believe
            in creating memorable experiences through exceptional service,
            attention to detail, and unwavering dedication to our craft.
          </p>

          <div className="grid gap-12 items-center md:grid-cols-2">
            <div className="">
              <Image
                src={"/images/chefs.png"}
                width={2560}
                height={1707}
                alt="Chefs"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="space-y-8">
              {principles.map(({ title, content }) => (
                <div className="flex gap-4" key={title}>
                  <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="mb-2 font-semibold">{title}</h3>
                    <p className="text-muted-foreground">{content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-[5%]">
        <div className="">
          <h2 className="mb-4 text-3xl font-bold text-center">
            Meet Our Head Chef
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-center text-muted-foreground">
            Our catering service is led by world-renowned chef Gordon Ramsay,
            who brings his exceptional culinary expertise and passion to every
            event we cater.
          </p>

          {/* Chef Profile */}
          <div className="mb-16">
            <div className="mx-auto max-w-2xl text-center">
              <Image
                src="/images/chef-gordon.png"
                width={300}
                height={300}
                alt="Gordon Ramsay Profile"
                className="object-cover mx-auto mb-6 w-64 h-64 rounded-full"
              />
              <h4 className="text-2xl font-semibold">Gordon Ramsay</h4>
              <p className="mb-4 text-lg text-muted-foreground">
                Head Chef & Owner
              </p>
              <p className="mb-6 text-muted-foreground">
                With multiple Michelin stars and decades of culinary excellence,
                Gordon Ramsay brings his unparalleled expertise and passion to
                Food Sentinel. His commitment to using only the finest
                ingredients and innovative cooking techniques ensures that every
                dish we serve exceeds expectations.
              </p>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="flex max-nav-md:flex-col gap-8 mb-16 px-[5%]">
          <Highlights metric="5,000+" title="Events Successfully Catered" />
          <Highlights metric="&lt; 1 m" title="Instant Booking Confirmation" />
          <Highlights metric="95%" title="Customer Satisfaction Rate" />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </main>
  );
}
