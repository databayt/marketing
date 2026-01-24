"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { siteConfig } from "../template/site-header/constant"
import { useTranslations } from "@/lib/use-translations"

interface Contributor {
  id: number
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/databayt/hogwarts/contributors?per_page=12",
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default function OpenSource() {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const { t, locale } = useTranslations()
  const isRTL = locale === "ar"

  useEffect(() => {
    getContributors().then(setContributors)
  }, [])

  return (
    <section className="py-16 md:py-24" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading mb-4 text-3xl font-extrabold sm:text-3xl md:text-6xl">
          {t.marketing.openSource.title}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-[85%] mx-auto leading-normal sm:text-lg sm:leading-7">
          {t.marketing.openSource.description}{" "}
          <br className="hidden md:block" />
          {t.marketing.openSource.descriptionLine2}{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-foreground/80 underline underline-offset-4 transition-colors"
          >
            {t.marketing.openSource.github}
          </Link>
          .
        </p>

        {/* Contributors label */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
            {t.marketing.openSource.contributors}
          </div>
          <div className="h-4 w-4 border-x-8 border-t-8 border-b-0 border-solid border-muted border-x-transparent"></div>
        </div>

        {/* GitHub contributors avatars */}
        <Link
          href={`${siteConfig.links.github}/graphs/contributors`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex justify-center -space-x-2 transition-opacity hover:opacity-90"
        >
          {contributors.length > 0
            ? contributors.map((contributor) => (
                <Image
                  key={contributor.id}
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  width={40}
                  height={40}
                  className="border-background rounded-full border-2"
                />
              ))
            : // Fallback placeholders while loading or if fetch fails
              [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-muted border-background h-10 w-10 rounded-full border-2 animate-pulse"
                />
              ))}
        </Link>
      </div>
    </section>
  )
}
