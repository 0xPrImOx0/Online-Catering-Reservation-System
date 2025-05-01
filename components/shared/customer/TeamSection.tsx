import { teams } from "@/lib/customer/metadata";
import Image from "next/image";
import React from "react";

const TeamSection = () => {
  const { leadership, culinary, event, service } = teams;
  return (
    <section className="py-24">
      <div>
        <h2 className="text-3xl font-bold text-center mb-4">
          The People Who Make Up Our Team
        </h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          Our success is built on the talent, passion, and dedication of our
          diverse team. From executive chefs to service staff, each member
          brings their unique expertise to create extraordinary experiences.
        </p>

        {/* Leadership Team */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Leadership Team
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map(({ name, title, description, image }) => (
              <div className="text-center" key={name}>
                <Image
                  src={image}
                  width={192}
                  height={192}
                  alt={`${name} Profile`}
                  className="w-48 h-48 object-cover rounded-full mb-4 mx-auto"
                />
                {/* <Skeleton className="w-48 h-48 rounded-full mx-auto mb-4" /> */}
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{title}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Culinary Team */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Culinary Team</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {culinary.map(({ name, title, image }) => (
              <div key={name} className="text-center">
                <Image
                  src={image}
                  width={128}
                  height={128}
                  alt={`${name} Profile`}
                  className="w-32 h-32 object-cover rounded-full object-top mb-4 mx-auto"
                />
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm text-muted-foreground">{title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Team */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Event Coordination Team
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {event.map(({ name, title, image }) => (
              <div key={name} className="text-center">
                <Image
                  src={image}
                  width={128}
                  height={128}
                  alt={`${name} Profile`}
                  className="w-32 h-32 object-cover rounded-full object-top mb-4 mx-auto"
                />
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm text-muted-foreground">{title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Team */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Service Team</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {service.map(({ name, title, image }) => (
              <div key={name} className="text-center">
                <Image
                  src={image}
                  width={96}
                  height={96}
                  alt={`${name} Profile`}
                  className="w-24 h-24 object-cover rounded-full object-top mb-4 mx-auto"
                />{" "}
                <h4 className="font-semibold text-sm">{name}</h4>
                <p className="text-xs text-muted-foreground">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
