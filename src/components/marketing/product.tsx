"use client"

import React from 'react'

export interface ProductProps {
  logo: string
  category: string
  title: string
  description: string
  ctaText: string
  secondaryCtaText: string
  logoSrc: string
  imageAlt?: string
  className?: string
  href?: string
}

const Product = ({
  logo,
  category,
  description,
  logoSrc,
  imageAlt,
  className,
  href
}: ProductProps) => {
  const isCodebase = logo.toLowerCase().includes('codebase') || logo.includes('مكتبة')
  const isHogwarts = logo.toLowerCase().includes('hogwarts') || logo.includes('هوجوارتس')
  const isSijillee = logo.toLowerCase().includes('sijillee') || logo.includes('سجلي')

  const iconSize = isHogwarts ? 'h-32' : isSijillee ? 'h-48' : 'h-40'

  // Determine URL based on the product
  const getProductUrl = () => {
    if (isCodebase) {
      return 'https://cb.databayt.org'
    }
    return 'https://ed.databayt.org'
  }

  const handleClick = () => {
    window.open(href || getProductUrl(), '_blank')
  }

  return (
    <div
      className={`group relative flex min-h-[460px] cursor-pointer flex-col overflow-hidden rounded-3xl bg-card p-8 text-start text-card-foreground md:p-10 ${className || ''}`}
      onClick={handleClick}
    >
      <div>
        <p className="mb-1 text-sm font-medium tracking-tight text-foreground/80">
          {category}
        </p>
        <h2 className="font-heading text-2xl font-semibold lowercase leading-[1.1] tracking-tight md:text-3xl">
          {logo.toLowerCase()}
        </h2>
        <p className="mt-3 line-clamp-3 min-h-[4.125rem] max-w-sm leading-snug text-foreground/70">
          {description}
        </p>
      </div>

      <div className="pointer-events-none flex flex-1 items-center justify-center py-6">
        <img
          src={logoSrc}
          alt={imageAlt || `${logo} logo`}
          className={`${iconSize} w-auto object-contain ${isHogwarts ? 'dark:invert' : ''}`}
        />
      </div>
    </div>
  )
}

export default Product
