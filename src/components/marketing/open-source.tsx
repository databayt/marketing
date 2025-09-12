"use client";

import React from 'react'
import Contributors from './contributors'
import Link from 'next/link'
import { siteConfig } from '../template/site-header/constant'
import { useTranslations } from '@/lib/use-translations'

const OpenSource = () => {
  const { t } = useTranslations()
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            {t.marketing.openSource.title}
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {t.marketing.openSource.description} <br className="hidden md:block" />{" "}
            {t.marketing.openSource.descriptionLine2}{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              {t.marketing.openSource.github}
            </Link>
            .{" "}
          </p>
          <div className="flex flex-col items-center">
            <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
              {t.marketing.openSource.contributors}
            </div>
            <div className="h-4 w-4 border-x-8 border-t-8 border-b-0 border-solid border-muted border-x-transparent"></div>
          </div>
          <Contributors />
          {/* <Landing /> */}
        </div>
  )
}

export default OpenSource