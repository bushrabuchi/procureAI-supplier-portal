import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "RFQ Management",
    description:
      "Discover procurement opportunities and respond with competitive quotations.",
  },
  {
    icon: Users,
    title: "Supplier Collaboration",
    description:
      "Manage supplier information and communicate through one workspace.",
  },
  {
    icon: TrendingUp,
    title: "Procurement Insights",
    description:
      "Track quotations, purchasing activity, and supplier performance.",
  },
  {
    icon: ShieldCheck,
    title: "Approval Workflows",
    description: "Bring structure and visibility to purchasing decisions.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-primary p-2 text-primary-foreground">
              <Sparkles className="size-5" />
            </div>
            <span className="text-xl font-bold">ProcureAI</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-foreground">
              How It Works
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Sign In
            </Button>
            <Button nativeButton={false} render={<Link href="/register" />}>
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 py-24 md:py-32">
          <div className="pointer-events-none absolute -top-40 right-0 size-150 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 size-100 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-xs font-medium text-primary shadow-sm">
              <Sparkles className="size-4" />
              Modern Procurement Platform
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Smarter Procurement.
              <span className="block bg-gradient-to-r from-primary to-emerald-700 bg-clip-text text-transparent">
                Stronger Partnerships.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Simplify supplier collaboration, manage RFQs, submit quotations,
              and track opportunities through one intelligent procurement
              workspace.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="gap-2"
                nativeButton={false}
                render={<Link href="/register" />}
              >
                Create Supplier Account
                <ArrowRight className="size-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/login" />}
              >
                Explore Supplier Portal
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {[
                "Simple supplier onboarding",
                "RFQ tracking",
                "Quotation management",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="border-t bg-muted/30 px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary">PLATFORM FEATURES</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Everything suppliers need
              </h2>
              <p className="mt-4 text-muted-foreground">
                A connected workspace for modern procurement.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card
                    key={feature.title}
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <CardContent className="space-y-4">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-5 py-24">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold">Get started in three steps</h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                ["01", "Register", "Create your supplier profile."],
                ["02", "Explore RFQs", "Find relevant opportunities."],
                ["03", "Submit Quotes", "Send and track your proposals."],
              ].map(([number, title, description]) => (
                <div key={number} className="space-y-3">
                  <div className="text-4xl font-semibold text-primary">
                    {number}
                  </div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 text-sm text-muted-foreground">
          <span>© ProcureAI</span>
          <span>Supplier Portal · Frontend Demonstration</span>
        </div>
      </footer>
    </div>
  );
}
