import { CheckCircle, ClipboardCheck } from "lucide-react";
import Logo from "@/components/icons/logo";
import { principles } from "../../../lib/customer/metadata";
import Image from "next/image";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import { Metadata } from "next";
import FooterCTA from "@/components/shared/customer/FooterCTA";
import OwnerSection from "@/components/shared/customer/OwnerSection";

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
          <h1 className="mb-4 text-4xl font-bold text-white">Food Sentinel</h1>
          <p className="mx-auto mb-8 max-w-2xl text-white/80">
            Crafting extraordinary culinary experiences with passion, precision,
            and the finest ingredients since 2002.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 mt-10">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-center">
            The Principles We Stand By
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-center text-muted-foreground">
            Our commitment to excellence goes beyond just great food. We believe
            in creating memorable experiences through exceptional service,
            attention to detail, and unwavering dedication to our craft.
          </p>

          <div className="grid gap-12 items-center md:grid-cols-2">
            <div>
              <Image
                src={"/images/chefs.png"}
                width={1000}
                height={800}
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

        {/* Team Section */}
        <OwnerSection />

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
