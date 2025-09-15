"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { brandingSchema, type BrandingFormData } from "./validation";
import { updateBranding } from "./actions";
import { useTranslations } from '@/lib/use-translations';

interface BrandingFormProps {
  initialData?: Partial<BrandingFormData>;
  onSuccess?: () => void;
}

export function BrandingForm({ initialData, onSuccess }: BrandingFormProps) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");

  const form = useForm<BrandingFormData>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      logoUrl: initialData?.logoUrl || "",
      primaryColor: initialData?.primaryColor || "#000000",
      secondaryColor: initialData?.secondaryColor || "#ffffff",
      brandName: initialData?.brandName || "",
      tagline: initialData?.tagline || "",
    },
  });

  const handleSubmit = (data: BrandingFormData) => {
    startTransition(async () => {
      try {
        setError("");
        const result = await updateBranding(data);

        if (result.success) {
          onSuccess?.();
        } else {
          setError(result.error || "Failed to update branding");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        <FormField
          control={form.control}
          name="brandName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.wizard.branding.brandName}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t.wizard.branding.brandNamePlaceholder}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.wizard.branding.tagline}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t.wizard.branding.taglinePlaceholder}
                  disabled={isPending}
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.wizard.branding.logoUrl}</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    {...field}
                    placeholder={t.wizard.branding.logoUrlPlaceholder}
                    disabled={isPending}
                  />
                  <Button type="button" variant="outline" size="icon" disabled={isPending}>
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.wizard.branding.primaryColor}</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      type="color"
                      className="w-12 h-10 p-1 border rounded cursor-pointer"
                      disabled={isPending}
                    />
                    <Input
                      {...field}
                      placeholder="#000000"
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.wizard.branding.secondaryColor}</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      type="color"
                      className="w-12 h-10 p-1 border rounded cursor-pointer"
                      disabled={isPending}
                    />
                    <Input
                      {...field}
                      placeholder="#ffffff"
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? t.wizard.branding.updating : t.wizard.branding.updateBranding}
        </Button>
      </form>
    </Form>
  );
}