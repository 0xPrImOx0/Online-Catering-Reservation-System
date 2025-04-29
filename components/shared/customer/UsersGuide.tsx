"use client";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Image from "next/image";

const TabsTriggerStyle = ({
  value,
  title,
}: {
  value: string;
  title: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex-1 hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
    >
      {title}
    </TabsTrigger>
  );
};

const HowItWorksContent = ({
  title,
  description,
  step,
  image,
}: {
  title: string;
  description: string;
  step: number;
  image: string;
}) => {
  return (
    <div className="flex flex-wrap mt-8 sm:items-center justify-center min-h-[500px] sm:gap-12 sm:mt-20">
      <div className="flex-1 basis-[200px] flex">
        <div className="mx-auto mb-4">
          <span className="text-muted-foreground">Step 0{step}</span>
          <h3 className="text-3xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground min-w-[32ch] max-w-[48ch]">
            {description}
          </p>
        </div>
      </div>
      <div className="flex-1 basis-[200px] max-w-[450px] min-h-[300px] max-h-[450px]">
        <Image
          src={image}
          width={1600}
          height={1600}
          alt={title}
          className="w-full h-full mx-auto rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export const UsersGuide = () => {
  return (
    <section className="my-16 md:my-24 lg:my-32 mx-[5%] ">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            Booking your catering service with us is simple and straightforward.
          </p>
        </div>

        <Tabs className="w-full" defaultValue="one">
          <TabsList className="text-foreground overflow-y-auto flex overflow-x-auto scrollbar-thin w-full justify-between h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
            <TabsTriggerStyle value="one" title="Step 01" />
            <TabsTriggerStyle value="two" title="Step 02" />
            <TabsTriggerStyle value="three" title="Step 03" />
          </TabsList>
          <TabsContent value="one">
            <HowItWorksContent
              step={1}
              title="Choose Your Date"
              description="Select your event date and check our availability through our
                online booking system."
              image="/images/calendar.png"
            />
          </TabsContent>
          <TabsContent value="two">
            <HowItWorksContent
              step={2}
              title="Customize Your Menu"
              description="Work with our chefs to create a personalized menu that suits
                your taste and budget."
              image="/images/tray-2.png"
            />
          </TabsContent>
          <TabsContent value="three">
            <HowItWorksContent
              step={3}
              title="Enjoy Your Event"
              description=" Relax and enjoy your event while our professional team takes
                care of everything."
              image="/images/enjoy.png"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
