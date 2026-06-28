"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginForm } from "@/features/auth/schema";
import { Icon } from "@/shared/components/icon";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "", remember: false },
    mode: "onTouched",
  });

  const onSubmit = () => {
    // Role auto-detection happens server-side; route to the dashboard for the MVP.
    router.push("/");
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-container-low px-4 py-10">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-[600px] leading-none text-primary opacity-[0.03]">
          <Icon name="school" />
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary-container p-3 shadow-sm">
            <span className="text-on-primary-container">
              <Icon name="school" filled size={32} />
            </span>
          </div>
          <h1 className="font-display text-headline-md tracking-tight text-primary">ScholarSync</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">Academic Administration Portal</p>
        </div>

        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest/80 p-6 shadow-lg backdrop-blur-md md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-label-md text-on-surface-variant">
                      Email or Mobile Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                          <Icon name="alternate_email" size={20} />
                        </span>
                        <Input
                          className="h-12 rounded-xl border-outline bg-surface-container-lowest pl-12"
                          placeholder="name@school.edu"
                          {...field}
                        />
                      </div>
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-label-md text-on-surface-variant">Password</FormLabel>
                      <Link href="#" className="text-label-md text-primary hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                          <Icon name="lock" size={20} />
                        </span>
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="h-12 rounded-xl border-outline bg-surface-container-lowest pl-12 pr-12"
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                        >
                          <Icon name={showPassword ? "visibility_off" : "visibility"} size={20} />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-label-md text-on-surface-variant">
                      Remember this device
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button type="submit" className="h-12 w-full rounded-xl text-title-md hover:bg-surface-tint">
                Sign In
                <Icon name="arrow_forward" size={20} />
              </Button>
            </form>
          </Form>

          <div className="mt-6 border-t border-outline-variant pt-4">
            <div className="flex gap-3 rounded-lg bg-surface-container p-3">
              <span className="text-primary">
                <Icon name="info" size={20} />
              </span>
              <p className="text-label-md leading-tight text-on-surface-variant">
                Smart detection enabled. Your administrative role will be determined automatically
                based on your credentials.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-center">
          <p className="text-body-md text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link href="#" className="font-bold text-primary hover:underline">
              Contact Administrator
            </Link>
          </p>
          <div className="flex justify-center gap-4 text-outline">
            <Link href="#" className="text-label-md hover:text-on-surface">
              Privacy Policy
            </Link>
            <Link href="#" className="text-label-md hover:text-on-surface">
              Terms of Service
            </Link>
            <Link href="#" className="text-label-md hover:text-on-surface">
              Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
