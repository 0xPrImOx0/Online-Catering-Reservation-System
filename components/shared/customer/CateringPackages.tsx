"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import CustomerPackageCard from "./CustomerPackageCard";
import CustomPackageForm from "./CustomPacakgeForm";
import SelectedEventContainer from "./EventPackageContainer";
import PlatedWarning from "../PlatedWarning";
import TabsTriggerStyle from "../CustomTabsTrigger";
import SearchInput from "../SearchInput";
import { CatererPackageCard } from "../caterer/CatererPackageCard";
import { CateringPackagesProps } from "@/types/package-types";
import axios from "axios";
import useSocketPackages from "@/hooks/use-socket-packages";
import api from "@/lib/api/axiosInstance";

export default function CateringPackages({
  isCaterer,
  open,
}: {
  isCaterer: boolean;
  open?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<string>("Buffet");
  const [isPlated, setIsPlated] = useState(false);
  const [query, setQuery] = useState("");

  const [cateringPackages, setCateringPackages] = useState<
    CateringPackagesProps[]
  >([]);

  // Callback to handle menu updates
  const handlePackageUpdated = (updatedPackage: CateringPackagesProps) => {
    console.log("🔄 Received updated package from socket:", updatedPackage);
    setCateringPackages((prevPackages) => {
      if (prevPackages === null) return [updatedPackage]; // If prevMenus is null, start a new array with the updated menu
      return prevPackages.map((cateringPackages) =>
        cateringPackages._id === updatedPackage._id
          ? updatedPackage
          : cateringPackages
      );
    });
  };

  const handlePackageCreated = (createdPackage: CateringPackagesProps) => {
    console.log("🆕 New package created from socket:", createdPackage);
    setCateringPackages((prevPackages) => {
      if (prevPackages === null) return [createdPackage];
      return [...prevPackages, createdPackage];
    });
  };

  const handlePackageDeleted = (deletedPackage: CateringPackagesProps) => {
    console.log("❌ Menu deleted from socket:", deletedPackage);
    setCateringPackages(
      (prevPackage) =>
        prevPackage?.filter((pkg) => pkg._id !== deletedPackage._id) || null
    );
  };

  // Use the socket hook to listen for updates
  useSocketPackages({
    onPackageUpdated: handlePackageUpdated,
    onPackageCreated: handlePackageCreated,
    onPackageDeleted: handlePackageDeleted,
  });

  useEffect(() => {
    const getPackages = async () => {
      try {
        const response = await api.get("/packages");
        setCateringPackages(response.data.data);
      } catch (err) {
        console.log("ERRRORRR", err);

        if (axios.isAxiosError<{ error: string }>(err)) {
          const message = err.response?.data.error || "Unexpected Error Occur";

          console.error("ERROR FETCHING PACKAGES", message);
        } else {
          console.error("Something went wrong. Please try again.");
        }
      }
    };
    getPackages();
  }, []);

  const buffetPlatedPackages =
    cateringPackages?.filter(
      (pkg) =>
        pkg.packageType === "BuffetPlated" &&
        pkg.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

  const eventPackages =
    cateringPackages?.filter(
      (pkg) =>
        pkg.packageType === "Event" &&
        pkg.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

  useEffect(() => {
    setIsPlated(activeTab === "Plated");
  }, [activeTab]);

  return (
    <div className="flex flex-col max-w-[1440px]">
      {!isCaterer && (
        <div className="">
          <h1 className="text-5xl font-bold mb-4 ">
            <span>{activeTab}</span> Packages
          </h1>

          <p className="text-muted-foreground mb-10">
            Authentic filipino {activeTab} cuisine for your special events and
            celebrations
          </p>
        </div>
      )}

      {activeTab !== "Custom" && (
        <div className="w-full md:w-[80%] flex self-center mb-6">
          <SearchInput
            query={query}
            setQuery={setQuery}
            placeholderTitle="for packages..."
            iconStyle="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
            inputStyle="pl-10 pr-10 py-5 rounded-full border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      )}

      <Tabs
        defaultValue="Buffet"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="text-foreground overflow-x-auto scrollbar-none w-full justify-between h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
          <TabsTriggerStyle value="Buffet" title="Buffet Packages" />
          <TabsTriggerStyle value="Plated" title="Plated Course" />
          <TabsTriggerStyle value="Event" title="Event Packages" />
          {!isCaterer && (
            <TabsTriggerStyle value="Custom" title="Create Your Own Package" />
          )}
        </TabsList>

        <TabsContent value="Buffet" className="mt-6 space-y-8">
          <div
            className={`grid grid-cols-1 ${
              open
                ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                : "md:grid-cols-2 lg:grid-cols-3"
            }  gap-6`}
          >
            {buffetPlatedPackages.length > 0 ? (
              buffetPlatedPackages.map((pkg, index) =>
                isCaterer ? (
                  <CatererPackageCard
                    key={index}
                    item={pkg}
                    isPlated={isPlated}
                  />
                ) : (
                  <CustomerPackageCard
                    key={index}
                    item={pkg}
                    isPlated={isPlated}
                  />
                )
              )
            ) : (
              <div className="col-span-3 min-h-[50vh] flex justify-center items-center">
                <span className="font-bold text-4xl">No Package Found</span>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="Plated" className="mt-6 space-y-8">
          <PlatedWarning />
          <div
            className={`grid grid-cols-1 ${
              open
                ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                : "md:grid-cols-2 lg:grid-cols-3"
            }  gap-6`}
          >
            {buffetPlatedPackages.length > 0 ? (
              buffetPlatedPackages.map((pkg, index) =>
                isCaterer ? (
                  <CatererPackageCard
                    key={index}
                    item={pkg}
                    isPlated={isPlated}
                  />
                ) : (
                  <CustomerPackageCard
                    key={index}
                    item={pkg}
                    isPlated={isPlated}
                  />
                )
              )
            ) : (
              <div className="col-span-3 min-h-[50vh] flex justify-center items-center">
                <span className="font-bold text-4xl">No Package Found</span>{" "}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="Event" className="mt-0">
          <SelectedEventContainer
            cateringPackages={eventPackages}
            isCaterer={isCaterer}
            open={open}
          />
        </TabsContent>
        <TabsContent value="Custom" className="mt-12 sm:mx-0 lg:mx-8 xl:mx-20">
          <CustomPackageForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
