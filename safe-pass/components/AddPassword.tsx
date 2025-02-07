"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { AddPasswordServer } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  website: z
    .string()
    .min(3, {
      message: "Website URL must be at least 3 characters.",
    })
    .max(50, {
      message: "Website URL cannot exceed 50 characters.",
    })
    .regex(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, {
      message: "Please enter a valid website URL.",
    }),
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 4 characters.",
    })
    .max(20, {
      message: "username cannot exceed 20 characters.",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(64, {
      message: "Password url cannot exceed 64 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
      message:
        "Password must include lowercase, uppercase, number, and special characters.",
    }),
});

export function AddPassword() {
  const user = useUser();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (user.user) {
      AddPasswordServer(
        values.website,
        values.username,
        values.password,
        user?.user?.id
      );
      toast.success("Password Added!");
      form.reset();
      router.refresh();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webite</FormLabel>
                  <FormControl>
                    <Input placeholder="Your website URL" {...field} />
                  </FormControl>
                  <FormDescription>This is your website url.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your username for website.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input placeholder="Your password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your website password.
                  </FormDescription>
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
