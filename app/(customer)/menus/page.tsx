import { ClipboardCheck } from "lucide-react";
import FooterCTA from "@/components/shared/customer/FooterCTA";
import PaginatedMenus from "@/components/shared/customer/PaginatedMenus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menus",
};

export default async function Page() {
  return (
    <main className="max-w-[1440px] mx-auto px-5 mt-5">
      <div>
        <div className="space-y-4 mb-10">
          <h1 className="text-5xl font-bold">Our Menus</h1>
          <p className="text-muted-foreground">
            Check out our dishes available for your needs!
          </p>
        </div>
        <PaginatedMenus />

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
