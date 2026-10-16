"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, ArrowRight } from "lucide-react";

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

const schema = z
  .object({
    company: z.string().trim().min(2, "Company name is required"),
    name: z.string().trim().min(2, "Contact name is required"),
    email: z.email("Enter a valid email"),
    phone: z.string().regex(/^\+9665\d{8}$/, {
      message: "Use format +9665XXXXXXXX",
    }),
    password: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(values: RegisterValues) {
    saveDemoUser({
      name: values.name,
      email: values.email,
      company: values.company,
    });

    router.replace("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/50 px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -left-28 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="w-full max-w-6xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          ProcureAI <span className="font-normal text-muted-foreground">/ Supplier portal</span>
        </Link>

        <Card className="overflow-hidden border-border/70 py-0 shadow-xl shadow-slate-900/5">
          <div className="grid md:grid-cols-[0.8fr_1.2fr]">
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-6 text-white md:flex lg:p-10">
              <div className="absolute -right-20 top-20 size-64 rounded-full border border-emerald-300/10" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Join the network</p>
                <h1 className="mt-5 max-w-sm text-3xl font-semibold leading-tight tracking-tight">
                  Make your business visible to the right buyers.
                </h1>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                  Create a supplier profile to explore opportunities and manage quotations in one place.
                </p>
              </div>
              <p className="relative text-xs text-slate-400">A clearer way to do business.</p>
            </aside>
            <div className="p-6 sm:p-10 md:p-8 lg:p-10">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-semibold tracking-tight">Create your supplier account</CardTitle>
                <CardDescription className="mt-1">
                  Register your company to explore procurement opportunities.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0 pb-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-5 sm:grid-cols-2"
              noValidate
            >
              {(
                [
                  ["company", "Company Name", "text"],
                  ["name", "Contact Person", "text"],
                  ["email", "Business Email", "email"],
                  ["phone", "Phone (+966)", "tel"],
                  ["password", "Password", "password"],
                  ["confirmPassword", "Confirm Password", "password"],
                ] as const
              ).map(([field, label, type]) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>{label}</Label>
                  <Input
                    id={field}
                    type={type}
                    aria-invalid={!!errors[field]}
                    {...register(field)}
                  />
                  {errors[field] && (
                    <p className="text-xs text-destructive">
                      {errors[field]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div className="sm:col-span-2">
                <p className="mb-4 text-xs text-muted-foreground">
                  This is a demo registration. No real account is created, and
                  passwords are not saved.
                </p>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Create Demo Account
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already registered?{" "}
              <Link href="/login" className="font-semibold text-primary">
                Sign In
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
