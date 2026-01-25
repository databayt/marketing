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

  // Determine highlight color based on product - Apple Liquid Glass inspired style
  const isCodebase = logo.toLowerCase().includes('codebase') || logo.toLowerCase().includes('مكتبة')
  const highlightColor = isCodebase
    ? 'bg-amber-400/70 backdrop-blur-md shadow-sm'
    : 'bg-white/20 backdrop-blur-md shadow-sm'

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
      {/* Text content area with highlight */}
      <div className='absolute bottom-0 left-0 right-0 p-4'>
        <div className={`${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
          {logo.split(' ').length === 1 ? (
            <h2 className="text-2xl lg:text-3xl font-semibold capitalize tracking-wide leading-relaxed">
              <span className={`${highlightColor} ${isCodebase ? 'text-black/80' : 'text-white/90'} box-decoration-clone px-3 py-1 rounded-lg`}>{logo.toLowerCase()}</span>
            </h2>
          ) : (
            <div>
              <div className="text-2xl lg:text-3xl font-serif capitalize leading-relaxed">
                <span className={`${highlightColor} ${isCodebase ? 'text-black/80' : 'text-white/90'} box-decoration-clone px-3 py-1 rounded-lg`}>{logo.split(' ')[0].toLowerCase()}</span>
              </div>
              <h2 className="text-xl lg:text-2xl font-semibold capitalize tracking-wide leading-relaxed">
                <span className={`${highlightColor} ${isCodebase ? 'text-black/80' : 'text-white/90'} box-decoration-clone px-3 py-1 rounded-lg`}>{logo.split(' ')[1].toLowerCase()}</span>
              </h2>
            </div>
          )}
        </div>
        <p className="text-sm lg:text-base leading-relaxed font-normal">
          <span className={`${highlightColor} ${isCodebase ? 'text-black/80' : 'text-white/90'} box-decoration-clone px-3 py-1 rounded-lg`}>{description}</span>
        </p>
      </div>
    </div>
  )
}

export default Product