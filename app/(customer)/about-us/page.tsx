import { CheckCircle, ClipboardCheck } from "lucide-react";
import Logo from "@/components/icons/logo";
import { principles } from "../../../lib/customer/metadata";
import Image from "next/image";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import { Metadata } from "next";
import TeamSection from "@/components/shared/customer/TeamSection";
import FooterCTA from "@/components/shared/customer/FooterCTA";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <main className="flex-1 ">
      {/* Hero Section */}
      <section className="flex text-center justify-center items-center h-[93.5dvh] bg-[url('/images/about.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <Logo imageSize={300} withTitle={false} />
          <h1 className="text-4xl font-bold mb-4 text-white">Food Sentinel</h1>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Crafting extraordinary culinary experiences with passion, precision,
            and the finest ingredients since 2002.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 mb-24">
        {/* Principles Section */}
        <section className="py-24">
          <div className="">
            <h2 className="text-3xl font-bold text-center mb-4">
              The Principles We Stand By
            </h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              Our commitment to excellence goes beyond just great food. We
              believe in creating memorable experiences through exceptional
              service, attention to detail, and unwavering dedication to our
              craft.
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
        <TeamSection />

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
