"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { brandingSchema, type BrandingFormData } from "./validation";
import { updateBranding } from "./actions";
import { useTranslations } from "@/lib/use-translations";

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

  // Live values drive the preview card on the left.
  const { brandName, tagline, logoUrl, primaryColor, secondaryColor } =
    form.watch();
  const primary = primaryColor || "#000000";
  const secondary = secondaryColor || "#ffffff";

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
      } catch {
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex min-h-full items-center justify-center py-2">
        <div className="grid w-full max-w-4xl items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* ----- Live brand preview ----- */}
          <div className="flex flex-col items-center gap-5 rounded-2xl border bg-card p-8 text-center shadow-sm">
            <div
              className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border"
              style={{ borderColor: primary, backgroundColor: `${primary}14` }}
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Brand logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold" style={{ color: primary }}>
                  {(brandName?.trim()?.[0] || "B").toUpperCase()}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3
                className="text-2xl font-bold leading-tight"
                style={{ color: primary }}
              >
                {brandName?.trim() || "Your Brand"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tagline?.trim() || "Your tagline goes here"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[primary, secondary].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full border px-3 py-1"
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border"
                    style={{ backgroundColor: c }}
                  />
                  <span className="font-mono text-xs text-muted-foreground">
                    {c}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="w-full rounded-lg py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: primary }}
            >
              {t.wizard.buttons?.startProject || "Get Started"}
            </button>
          </div>

          {/* ----- Inputs ----- */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">
                      {t.wizard.branding.brandName}
                    </FormLabel>
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
                    <FormLabel className="text-xs text-muted-foreground">
                      {t.wizard.branding.tagline}
                    </FormLabel>
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
                    <FormLabel className="text-xs text-muted-foreground">
                      {t.wizard.branding.logoUrl}
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          {...field}
                          placeholder={t.wizard.branding.logoUrlPlaceholder}
                          disabled={isPending}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          disabled={isPending}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {(["primaryColor", "secondaryColor"] as const).map((name) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">
                          {name === "primaryColor"
                            ? t.wizard.branding.primaryColor
                            : t.wizard.branding.secondaryColor}
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              {...field}
                              type="color"
                              className="h-10 w-12 cursor-pointer rounded border p-1"
                              disabled={isPending}
                            />
                            <Input
                              {...field}
                              placeholder={
                                name === "primaryColor" ? "#000000" : "#ffffff"
                              }
                              disabled={isPending}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending
                  ? t.wizard.branding.updating
                  : t.wizard.branding.updateBranding}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
