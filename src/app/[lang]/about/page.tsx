import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { pageMetadata } from "@/lib/seo";
import About from '@/components/marketing/about/about'
import React from 'react'


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = (await getDictionary(lang)).metadata.pages.about;
  return pageMetadata({ lang, path: "/about", title, description });
}

export default function AboutPage() {
  return <About />
}