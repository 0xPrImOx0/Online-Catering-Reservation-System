import { ownerMetadata } from "@/lib/caterer/business-metadata";
import Image from "next/image";
import React from "react";
import Highlights from "./Highlights";

const FounderSection = () => {
  const { name, title, description, profilePic, email, phone } = ownerMetadata;
  return (
    <section className="py-24">
      <h2 className="mb-4 text-3xl font-bold text-center">
        Meet Our Caterer & Founder
      </h2>
      <p className="mx-auto mb-16 max-w-3xl text-center text-muted-foreground">
        Our catering service is led by world-renowned founder {name}, who brings
        his exceptional culinary expertise and passion to every event we cater.
      </p>

      {/* Chef Profile */}
      <div className="mb-16">
        <div className="mx-auto max-w-2xl text-center">
          <Image
            src={profilePic}
            width={300}
            height={300}
            alt="Gordon Ramsay Profile"
            className="object-cover mx-auto mb-6 w-64 h-64 rounded-full"
          />

          <h4 className="text-2xl font-semibold">{name}</h4>

          <p className="mb-4 text-lg text-muted-foreground">{title}</p>

          <p className="mb-6 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex max-nav-md:flex-col gap-8 mb-16 px-[5%]">
        <Highlights metric="5,000+" title="Events Successfully Catered" />
        <Highlights metric="&lt; 1 m" title="Instant Booking Confirmation" />
        <Highlights metric="95%" title="Customer Satisfaction Rate" />
      </div>
    </section>
  );
};

export default FounderSection;
