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

  // Determine highlight color based on product
  const isCodebase = logo.toLowerCase().includes('codebase') || logo.toLowerCase().includes('مكتبة')
  const highlightColor = isCodebase ? 'bg-yellow-400/80' : 'bg-black/60'

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
            <h2 className="text-2xl lg:text-3xl font-extrabold capitalize tracking-wide leading-none">
              <span className={`${highlightColor} ${isCodebase ? 'text-black' : 'text-white'} box-decoration-clone px-1`}>{logo.toLowerCase()}</span>
            </h2>
          ) : (
            <div>
              <div className="text-2xl lg:text-3xl font-serif capitalize leading-none">
                <span className={`${highlightColor} ${isCodebase ? 'text-black' : 'text-white'} box-decoration-clone px-1`}>{logo.split(' ')[0].toLowerCase()}</span>
              </div>
              <h2 className="text-xl lg:text-2xl font-extrabold capitalize tracking-wide leading-none">
                <span className={`${highlightColor} ${isCodebase ? 'text-black' : 'text-white'} box-decoration-clone px-1`}>{logo.split(' ')[1].toLowerCase()}</span>
              </h2>
            </div>
          )}
        </div>
        <p className="text-sm lg:text-base leading-none font-semibold">
          <span className={`${highlightColor} ${isCodebase ? 'text-black' : 'text-white'} box-decoration-clone px-1`}>{description}</span>
        </p>
      </div>
    </div>
  )
}

export default Product