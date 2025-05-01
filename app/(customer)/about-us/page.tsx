import { CheckCircle, ClipboardCheck } from "lucide-react";
import Logo from "@/components/icons/logo";
import { principles } from "../../../lib/customer/metadata";
import Image from "next/image";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="flex text-center justify-center items-center h-[93.5dvh] bg-[url('/images/about.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <Logo imageSize={300} withTitle={false} />
          <h1 className="text-4xl font-bold mb-4 text-background">
            Food Sentinel
          </h1>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Crafting extraordinary culinary experiences with passion, precision,
            and the finest ingredients since 2002.
          </p>
          {/* <div className="flex justify-center gap-4">
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
          <h2 className="text-3xl font-bold text-center mb-4">
            The Principles We Stand By
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Our commitment to excellence goes beyond just great food. We believe
            in creating memorable experiences through exceptional service,
            attention to detail, and unwavering dedication to our craft.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="">
              <Image
                src={"/images/chefs.png"}
                width={2560}
                height={1707}
                alt="Chefs"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="space-y-8">
              {principles.map(({ title, content }) => (
                <div className="flex gap-4" key={title}>
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">{title}</h3>
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
          <h2 className="text-3xl font-bold text-center mb-4">
            The People Who Make Up Our Team
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16">
            Our success is built on the talent, passion, and dedication of our
            diverse team. From executive chefs to service staff, each member
            brings their unique expertise to create extraordinary experiences.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-16">
            <Highlights metric="5,000+" title="Events Successfully Catered" />
            <Highlights
              metric="&lt; 1 m"
              title="Instant Booking Confirmation"
            />
            <Highlights metric="95%" title="Customer Satisfaction Rate" />
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Leadership Team
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {leadership.map(({ name, title, description, image }) => (
                <div className="text-center" key={name}>
                  <Image
                    src={image}
                    width={192}
                    height={192}
                    alt={`${name} Profile`}
                    className="w-48 h-48 object-cover rounded-full mb-4 mx-auto"
                  />
                  {/* <Skeleton className="w-48 h-48 rounded-full mx-auto mb-4" /> */}
                  <h4 className="font-semibold">{name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{title}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Culinary Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Culinary Team
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {culinary.map(({ name, title, image }) => (
                <div key={name} className="text-center">
                  <Image
                    src={image}
                    width={128}
                    height={128}
                    alt={`${name} Profile`}
                    className="w-32 h-32 object-cover rounded-full object-top mb-4 mx-auto"
                  />
                  <h4 className="font-semibold">{name}</h4>
                  <p className="text-sm text-muted-foreground">{title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Event Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Event Coordination Team
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {event.map(({ name, title, image }) => (
                <div key={name} className="text-center">
                  <Image
                    src={image}
                    width={128}
                    height={128}
                    alt={`${name} Profile`}
                    className="w-32 h-32 object-cover rounded-full object-top mb-4 mx-auto"
                  />
                  <h4 className="font-semibold">{name}</h4>
                  <p className="text-sm text-muted-foreground">{title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Service Team */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">
              Service Team
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              {service.map(({ name, title, image }) => (
                <div key={name} className="text-center">
                  <Image
                    src={image}
                    width={96}
                    height={96}
                    alt={`${name} Profile`}
                    className="w-24 h-24 object-cover rounded-full object-top mb-4 mx-auto"
                  />{" "}
                  <h4 className="font-semibold text-sm">{name}</h4>
                  <p className="text-xs text-muted-foreground">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Reserve CTA */}
        <FooterCTA
          title="Ready to Book Your Catering?"
          description="Secure your date and menu selection now to ensure availability for your upcoming event."
          buttonLabel="Book Now"
          href="/book-now"
          Icon={ClipboardCheck}
        />
      </section>
    </main>
  );
}
