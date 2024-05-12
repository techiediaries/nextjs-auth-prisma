"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import Link from "next/link";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");


  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    
    startTransition(async ()=>{
      const data = await login(values);
      if(data && data.error) setError(data!.error!);
    });

  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Auth.js</CardTitle>
        <CardDescription>Welcome!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-4">
              <FormField control={form.control} name="email" render = { ({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render = { ({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            {error && (
              <div className="bg-red-500  text-white px-4 py-2 rounded-md">
                {error}
              </div>
            )}
            <Button disabled = {isPending} type="submit" size="lg" className="w-full">Sign in</Button>

          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between flex-col">
        <Link className="text-xs" href="/auth/register">
          Don't have an account
        </Link>
      </CardFooter>
    </Card>
  );
};
