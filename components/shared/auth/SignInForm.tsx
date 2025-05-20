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
import { SignInFormProps } from "@/types/auth-types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

export const SignInForm = ({ form, onSubmit, error }: SignInFormProps) => {
  return (
    <>
      <CardHeader className="flex flex-col items-center space-y-1 pb-1 text-center">
        <CardTitle className="text-2xl font-bold">
          Sign in to your account
        </CardTitle>
        <CardDescription className="text-balance text-sm text-muted-foreground">
          Enter your email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center py-2">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Sign in
            </Button>
          </form>
        </Form>
        <p>{error}</p>
      </CardContent>
      <CardFooter className="text-sm flex justify-center space-x-2">
        <p>Don&apos;t have an account?</p>
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </CardFooter>
    </>
  );
};
