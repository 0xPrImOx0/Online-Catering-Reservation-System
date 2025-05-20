import ContactForm from "@/components/shared/customer/ContactForm";
import ContactInfo from "@/components/shared/customer/ContactInfo";
import FooterCTA from "@/components/shared/customer/FooterCTA";
import { ClipboardCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <main className="max-w-[1440px] mx-auto px-5 mt-10">
      <div>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
          <p className="text-muted-foreground w-full md:max-w-2xl mx-auto">
            Have questions about our catering services? Reach out to us through
            any of the methods below, and our team will get back to you as soon
            as possible.
          </p>
        </div>

        <ContactForm />

        <ContactInfo />

        <FooterCTA
          title="Ready to Book Your Catering?"
          description="Secure your date and menu selection now to ensure availability for your upcoming event."
          buttonLabel="Book Now"
          href="/book-now"
          px
          Icon={ClipboardCheck}
        />
      </div>
    </main>
  );
}
