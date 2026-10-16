"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Sparkles } from "lucide-react";

import { saveDemoUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const schema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Enter at least 6 characters"),
});

type LoginValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: LoginValues) {
    // Demo only: no credentials are verified or transmitted.
    saveDemoUser({
      name: "Demo Supplier",
      email: values.email,
      company: "Demo Supplier Company",
    });

    router.replace("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/50 px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -right-28 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="w-full max-w-5xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          ProcureAI <span className="font-normal text-muted-foreground">/ Supplier portal</span>
        </Link>

        <Card className="overflow-hidden border-border/70 py-0 shadow-xl shadow-slate-900/5">
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-6 text-white md:flex lg:p-10">
              <div className="absolute -right-20 top-20 size-64 rounded-full border border-emerald-300/10" />
              <div className="absolute -right-8 top-32 size-40 rounded-full border border-emerald-300/10" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Supplier workspace</p>
                <h1 className="mt-5 max-w-sm text-3xl font-semibold leading-tight tracking-tight">
                  Good business starts with a better connection.
                </h1>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                  Find relevant procurement opportunities, prepare quotations, and keep every submission in view.
                </p>
              </div>
              <p className="relative text-xs text-slate-400">ProcureAI · Supplier experience</p>
            </aside>
            <div className="p-6 sm:p-10 md:p-8 lg:p-12">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
                <CardDescription className="mt-1">
                  Sign in to continue to your supplier workspace.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0 pb-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="supplier@example.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter demo password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <p className="rounded-lg border border-border/70 bg-muted/70 p-3 text-xs leading-5 text-muted-foreground">
                Demo mode: use any valid email and a sample password of at least
                six characters. Do not enter a real password.
              </p>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Sign In
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New supplier?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
