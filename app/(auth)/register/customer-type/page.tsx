import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";

const UserType = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10">
      <h2 className="font-bold text-3xl">What type of user are you?</h2>
      <div className="flex space-x-10 w-[50%]">
        <Link href="/dashboard/caterer" className="w-[50%]">
          <Card className="w-full cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-4">
              <CardTitle>Become a Caterer 🧑‍🍳</CardTitle>
              <CardDescription className="whitespace-normal break-words font-medium text-base">
                Showcase your culinary skills and grow your catering business
                with ease!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-square" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/customer" className="w-[50%]">
          <Card className="w-full cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-4">
              <CardTitle>Become a Customer 🍽️</CardTitle>
              <CardDescription className="whitespace-normal break-words font-medium text-base">
                Book top caterers and make every event a feast to remember!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-square" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default UserType;
