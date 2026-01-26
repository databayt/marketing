"use client"

import React from 'react'
import { useTranslations } from '@/lib/use-translations'
import '@/styles/liquid-glass.css'

export interface ProductProps {
  logo: string
  title: string
  description: string
  ctaText: string
  secondaryCtaText: string
  imageSrc: string
  imageAlt?: string
  className?: string
  href?: string
}

const Product = ({
  logo,
  title,
  description,
  ctaText,
  secondaryCtaText,
  imageSrc,
  imageAlt,
  className,
  href
}: ProductProps) => {
  const { isRTL, locale } = useTranslations()

  // Build ImageKit URL for background image
  const imagekitEndpoint = 'https://ik.imagekit.io/databayt'
  const backgroundImageUrl = `${imagekitEndpoint}${imageSrc}?tr=orig-true`

  // Determine if this is the Codebase product
  const isCodebase = logo.toLowerCase().includes('codebase') || logo.toLowerCase().includes('مكتبة')

  // Determine URL based on the product
  const getProductUrl = () => {
    if (logo.toLowerCase().includes('codebase')) {
      return 'https://cb.databayt.org'
    }
    return 'https://ed.databayt.org'
  }

  const handleClick = () => {
    window.open(href || getProductUrl(), '_blank')
  }

  return (
    <div
      className={`relative min-h-[400px] rounded-lg overflow-hidden cursor-pointer ${className || ''}`}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={handleClick}
    >
      {/* Liquid Glass text overlay - reduced padding from edges */}
      <div className="absolute bottom-2 left-2 right-2">
        <div className="liquid-glass-wrapper">
          <div className={`liquid-glass-content ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
            <h2 className="liquid-glass-title">
              {logo.toLowerCase()}
            </h2>
            <p className="liquid-glass-description">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product