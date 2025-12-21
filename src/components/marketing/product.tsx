"use client"

import React from 'react'
import { useTranslations } from '@/lib/use-translations'

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
      {/* Light gradient overlay from bottom to top */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/100 via-black/50 to-transparent opacity-50' />

      {/* Text content area */}
      <div className='absolute bottom-0 left-0 right-0 p-6'>
        <div className={`${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
          {logo.split(' ').length === 1 ? (
            <h2 className="text-2xl lg:text-3xl font-extrabold capitalize tracking-wide mb-2 text-white">
              {logo.toLowerCase()}
            </h2>
          ) : (
            <div className='mb-2'>
              <div className="text-2xl lg:text-3xl font-serif text-white capitalize">
                {logo.split(' ')[0].toLowerCase()}
              </div>
              <h2 className="text-xl lg:text-2xl font-extrabold capitalize tracking-wide text-white">
                {logo.split(' ')[1].toLowerCase()}
              </h2>
            </div>
          )}
        </div>
        <p className="text-white/90 text-sm lg:text-base leading-relaxed font-semibold">
          {description}
        </p>
      </div>
    </div>
  )
}

export default Product