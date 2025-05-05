"use client";

import { SignInForm } from "@/components/shared/auth/SignInForm";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { SignInFormValues } from "../../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/form-validation";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import api from "@/lib/api/axiosInstance";

export default function LoginPage() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const { customer } = useAuthContext();

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await api.post("/auth/sign-in", values);

      // ✅ Tell AuthProvider to re-fetch customer
      window.dispatchEvent(new Event("refresh-customer"));
      router.replace("/");
      toast.success("Signed in successfully!");
    } catch (err: unknown) {
      console.log("ERRRORRR", err);

      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected Error Occur";
        if (err.response?.status === 404) {
          form.setError("email", { message });
        } else if (err.response?.status === 401) {
          form.setError("password", { message });
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (customer) {
      router.replace("/");
      setTimeout(() => {
        toast.success(`Currently signed in as ${customer.fullName}`);
      }, 500);
    }
  }, [customer, router]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-sm p-2 space-y-3">
            <SignInForm form={form} onSubmit={onSubmit} error={error} />
          </Card>
        </div>
      </div>
      <div className="relative hidden lg:block">
        {/* Gradient overlay on the left side */}
        <div className="absolute left-1 top-0 h-full w-[10%] z-10 rounded-l-[50px] bg-gradient-to-r from-black/30 to-transparent" />

        <Image
          src="/auth/sign-in-img.jpg"
          fill
          alt="Sign In Image"
          className="object-cover object-left-bottom brightness-[90%] rounded-l-[50px] border-l-2 border-red-500 dark:border-white"
        />
      </div>
    </div>
  );
}
