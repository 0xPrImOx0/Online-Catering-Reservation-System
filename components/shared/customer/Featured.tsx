"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import CustomerPackageCard from "./CustomerPackageCard";
import { CateringPackagesProps } from "@/types/package-types";
import api from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
// use this if you want to render the packages offline
// import { cateringPackages } from "@/lib/customer/packages-metadata";

export default function Featured() {
  const [cateringPackages, setCateringPackages] = useState<
    Array<CateringPackagesProps>
  >([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get("/packages/featured");
        setCateringPackages(response.data.data);
      } catch (err: unknown) {
        if (axios.isAxiosError<{ message: string }>(err))
          toast.error(err.message);
      }
    };

    fetchFeatured();
  }, []);
  return (
    <section className="mt-24 flex flex-col items-center gap-14">
      <div>
        <h2 className="text-4xl font-bold mb-2 text-center">
          Featured Packages
        </h2>
        <p className="text-muted-foreground text-center mb-12 text-lg">
          Select from our most popular catering packages for weddings, corporate
          events, and private parties.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Package Showcase */}
          {cateringPackages.length > 0 ? (
            cateringPackages
              .slice(0, 6)
              .map((pkg: CateringPackagesProps, index: number) => (
                <CustomerPackageCard item={pkg} key={index} />
              ))
          ) : (
            <div className="col-span-3 min-h-[50vh] flex justify-center items-center text-center">
              <span className="font-bold text-3xl">
                No Featured Packages Found
              </span>{" "}
            </div>
          )}
        </div>
      </div>
      <Button size={"landing"} variant={"outline"} asChild>
        <Link href={"/packages"}>
          View More Packages <ChevronRight />
        </Link>
      </Button>
    </section>
  );
}
