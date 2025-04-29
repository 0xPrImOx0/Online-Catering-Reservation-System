import { ClipboardCheck } from "lucide-react";
import FooterCTA from "@/components/shared/customer/FooterCTA";
import CateringPackages from "@/components/shared/customer/CateringPackages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages",
};

export default function Page() {
  return (
    <main className="max-w-[1400px] mx-auto px-5 mt-10">
      <div>
        {/* Package Showcase */}
        <CateringPackages isCaterer={false} />

        {/* Reserve CTA */}
        <FooterCTA
          title="Ready to Book Your Catering?"
          description="Secure your date and menu selection now to ensure availability for your upcoming event."
          buttonLabel="Book Now"
          href="/book-now"
          Icon={ClipboardCheck}
        />
      </div>
    </main>
  );
}
