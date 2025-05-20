import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
// import { Google } from "../Google";
import { SignUpFormProps } from "@/types/auth-types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

export const SignUpForm = ({ form, onSubmit, error }: SignUpFormProps) => {
  return (
    <>
      <CardHeader className="flex flex-col items-center space-y-1 pb-1 text-center">
        <CardTitle className="text-2xl font-bold">
          Create a new account
        </CardTitle>
        <CardDescription className="text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="fullName">Full Name</FormLabel>
                  <FormControl>
                    <Input id="fullName" placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage className="-top-2" />
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      type="email"
                      className="mt-0 leading-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Create an Account
            </Button>
          </form>
        </Form>
        <p>{error}</p>
      </CardContent>
      <CardFooter className="text-sm flex justify-center space-x-2">
        <p>Already Have an Account?</p>
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign in
        </Link>
      </CardFooter>
    </>
  );
};
