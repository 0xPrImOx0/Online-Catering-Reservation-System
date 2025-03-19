import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardCheck, Star } from "lucide-react";
import packages from "@/lib/packages";
import FooterCTA from "@/components/shared/customer/FooterCTA";
import PackageCards from "@/components/shared/customer/PackageCards";
import CustomSelect from "@/components/shared/CustomSelect";
import {
  dietaryOptions,
  menuItems,
  menuTypes,
  priceOptions,
} from "./menu-metadata";
import { MenuCard } from "@/components/shared/customer/MenuCard";

export default function Page() {
  return (
    <main className="flex-1">
      <div className=" py-12">
        <h1 className="text-5xl font-bold text-center mb-12">Our Menus</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <CustomSelect
            defaultValue=""
            placeholder="Menu Type"
            size="md"
            items={menuTypes}
          />

          <CustomSelect
            defaultValue=""
            placeholder="Dietary Options"
            size="md"
            items={dietaryOptions}
          />

          <CustomSelect
            defaultValue=""
            placeholder="Price Range"
            size="md"
            items={priceOptions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Package Showcase */}
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Testimonials */}
        <section className="my-16 py-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">
            What Clients Say About Our Food
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-muted p-6 rounded-lg">
              <div className="flex gap-1 mb-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <blockquote className="mb-4 italic">
                "The Executive Lunch menu was perfect for our corporate event.
                The presentation was beautiful, and everyone raved about the
                quality of the food. Highly recommend!"
              </blockquote>
              <p className="font-semibold">— Jennifer R., Marketing Director</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <div className="flex gap-1 mb-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <blockquote className="mb-4 italic">
                "We chose the Gourmet Dinner Service for our wedding, and it
                exceeded all expectations. The chef accommodated our dietary
                restrictions without compromising on flavor or presentation."
              </blockquote>
              <p className="font-semibold">
                — Michael & David, Wedding Clients
              </p>
            </div>
          </div>
        </section>

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
