"use client";

//import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddCardServer } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, {
      message: "Card Number must be at least 16 digits.",
    })
    .max(19, {
      message: "Card number cannot exceed 19 digits.",
    })
    .regex(/^\d+$/, {
      message: "Card number must contain only digits.",
    }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in MM/YY format.",
  }),
  cvv: z.coerce
    .number()
    .min(100, {
      message: "CVV must be at least 3 digits.",
    })
    .max(9999, {
      message: "CVV cannot exceed 4 digits.",
    }),
});

export function AddCard() {
  const user = useUser();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (user.user) {
      AddCardServer(
        values.cardNumber,
        values.expiryDate,
        values.cvv,
        user?.user?.id
      );
      toast.success("Card Added!");
      form.reset();
      router.refresh();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="card number" {...field} />
                  </FormControl>
                  <FormDescription>This is your card number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your card expiry date.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="CVV" {...field} />
                  </FormControl>
                  <FormDescription>This is your card CVV.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
