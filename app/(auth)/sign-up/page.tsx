"use client";

import { SignUpForm } from "@/components/shared/auth/SignUpForm";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { SignUpFormValues } from "../../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/utils/form-validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import api from "@/lib/api/axiosInstance";

export default function RegisterPage() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const { customer } = useAuthContext();

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await api.post("/auth/sign-up", values);

      // ✅ Tell AuthProvider to re-fetch customer
      window.dispatchEvent(new Event("refresh-customer"));
      router.replace("/");

      toast.success("Signed up successfully!");
    } catch (err: unknown) {
      console.log("ERRRORRR SIGN UPP", err);

      if (axios.isAxiosError<{ error: string }>(err)) {
        const message = err.response?.data.error || "Unexpected Error Occur";
        if (err.response?.status === 400) form.setError("email", { message });
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
      <div className="relative hidden lg:block">
        <Image
          src="/auth/sign-up-img.png"
          fill
          alt="Sign In Image"
          className="object-cover object-left-bottom brightness-125 rounded-e-[50px] border-r-2 border-red-500 dark:border-white/60"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-sm p-2 space-y-3">
            <SignUpForm form={form} onSubmit={onSubmit} error={error} />
          </Card>
        </div>
      </div>
    </div>
  );
}
