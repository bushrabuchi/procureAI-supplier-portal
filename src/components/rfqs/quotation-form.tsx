"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { getDemoUser } from "@/lib/auth";
import { submitQuotation } from "@/lib/quotation-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  amount: z.coerce.number<number>().positive("Amount must be positive"),
  deliveryDays: z.coerce
    .number<number>()
    .int("Enter a whole number")
    .min(1, "Delivery must take at least one day"),
  notes: z.string().trim().min(10, "Enter at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function QuotationForm({ rfqId }: { rfqId: string }) {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(values: FormValues) {
    const user = getDemoUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const saved = submitQuotation({
      rfqId,
      supplierEmail: user.email,
      amount: values.amount,
      deliveryDays: values.deliveryDays,
      notes: values.notes,
    });

    if (!saved) {
      setError("You have already submitted a quotation for this RFQ.");
      return;
    }

    router.push("/quotations");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="amount">Quotation Amount (SAR)</Label>
        <Input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          {...register("amount")}
        />
        {errors.amount && (
          <p className="text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryDays">Delivery Time (Days)</Label>
        <Input
          id="deliveryDays"
          type="number"
          min="1"
          step="1"
          {...register("deliveryDays")}
        />
        {errors.deliveryDays && (
          <p className="text-sm text-destructive">
            {errors.deliveryDays.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Proposal Notes</Label>
        <Textarea
          id="notes"
          rows={4}
          placeholder="Describe your quotation and delivery terms..."
          {...register("notes")}
        />
        {errors.notes && (
          <p className="text-sm text-destructive">{errors.notes.message}</p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        Submit Quotation
      </Button>
    </form>
  );
}
