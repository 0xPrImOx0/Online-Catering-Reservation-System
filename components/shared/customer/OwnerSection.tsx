import { ownerMetadata } from "@/lib/caterer/business-metadata";
import Image from "next/image";
import React from "react";
import Highlights from "./Highlights";

const OwnerSection = () => {
  const { name, role, description, profilePic } = ownerMetadata;
  return (
    <section className="py-24">
      <h2 className="font-bold text-4xl text-center mb-8">
        Meet Our Caterer & Founder
      </h2>
      <p className="text-center text-muted-foreground mb-16 max-w-5xl mx-auto">
        {ownerMetadata.renderIntroduction()}
      </p>

      {/* Chef Profile */}
      <div className="mb-16">
        <div className="text-center max-w-5xl mx-auto">
          <Image
            src={profilePic}
            width={300}
            height={300}
            alt="Gordon Ramsay Profile"
            className="object-cover object-[center_25%] mx-auto mb-6 size-80 rounded-full"
          />

          <h4 className="text-2xl font-semibold">{name}</h4>

          <p className="mb-4 text-lg text-muted-foreground">{role}</p>

          <p className="mb-6 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex max-nav-md:flex-col gap-8 mb-16">
        <Highlights metric="5,000+" title="Events Successfully Catered" />
        <Highlights metric="&lt; 1 m" title="Instant Booking Confirmation" />
        <Highlights metric="95%" title="Customer Satisfaction Rate" />
      </div>
    </section>
  );
};

export default OwnerSection;
