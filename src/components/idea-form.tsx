"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { IdeaFormValues } from "@/lib/schemas";
import { ideaSchema } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface IdeaFormProps {
  onSubmit: (data: IdeaFormValues) => void;
  isLoading: boolean;
}

export function IdeaForm({ onSubmit, isLoading }: IdeaFormProps) {
  const form = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      ideaDescription: "",
      problemStatement: "",
      targetAudience: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ideaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idea Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., A mobile app that connects local gardeners to share surplus produce."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe your business idea in detail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="problemStatement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem Statement</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Food waste from home gardens and lack of access to fresh, local produce."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                What problem is your idea trying to solve?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Audience</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Urban dwellers, health-conscious families, community gardeners." {...field} />
              </FormControl>
              <FormDescription>
                Who are you trying to reach?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Idea"
          )}
        </Button>
      </form>
    </Form>
  );
}
