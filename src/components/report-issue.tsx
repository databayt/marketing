"use client"

import { useState, useTransition } from "react"
import { Bug } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { reportIssue } from "@/lib/actions/report-issue"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "@/lib/use-translations"

const ReportIssueSchema = z.object({
  description: z.string().trim().min(1).max(5000),
})

type ReportIssueValues = z.infer<typeof ReportIssueSchema>

interface ReportIssueProps {
  variant?: "text" | "icon"
  className?: string
}

function parseBrowser(ua: string): string {
  const os = ua.includes("Mac OS")
    ? "macOS"
    : ua.includes("Windows")
    ? "Windows"
    : ua.includes("Android")
    ? "Android"
    : ua.includes("iPhone") || ua.includes("iPad")
    ? "iOS"
    : ua.includes("Linux")
    ? "Linux"
    : "Unknown"
  if (ua.includes("Firefox/")) return `Firefox / ${os}`
  if (ua.includes("Edg/")) return `Edge / ${os}`
  if (ua.includes("Chrome/")) return `Chrome / ${os}`
  if (ua.includes("Safari/")) return `Safari / ${os}`
  return ua.slice(0, 50)
}

export function ReportIssue({ variant = "text", className }: ReportIssueProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { t } = useTranslations()
  const dict = t.common.reportIssue

  const form = useForm<ReportIssueValues>({
    resolver: zodResolver(ReportIssueSchema),
    defaultValues: { description: "" },
  })

  const onSubmit = (values: ReportIssueValues) => {
    startTransition(async () => {
      const result = await reportIssue({
        description: values.description,
        pageUrl: window.location.href,
        meta: {
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          direction: document.documentElement.dir || "ltr",
          browser: parseBrowser(navigator.userAgent),
        },
      })

      if (result?.error) {
        toast.error(dict.error)
        return
      }

      toast.success(dict.success)
      form.reset()
      setOpen(false)
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) form.reset()
      }}
    >
      <DialogTrigger asChild>
        {variant === "icon" ? (
          <button
            type="button"
            className="cursor-pointer"
            aria-label={dict.link}
          >
            <Bug className="h-6 w-6" strokeWidth={1} />
          </button>
        ) : (
          <button
            type="button"
            className={
              className ??
              "cursor-pointer font-medium underline underline-offset-4"
            }
          >
            {dict.link}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dict.title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={dict.placeholder}
                      className="min-h-[120px]"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? dict.submitting : dict.submit}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
