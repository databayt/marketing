"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { useTranslations } from '@/lib/use-translations'

export interface VerticalImageCardProps {
  logo: string
  title: string
  description: string
  ctaText: string
  secondaryCtaText: string
  imageSrc: string
  imageAlt?: string
  className?: string
}

const VerticalImageCard = ({
  logo,
  title,
  description,
  ctaText,
  secondaryCtaText,
  imageSrc,
  imageAlt,
  className
}: VerticalImageCardProps) => {
  const { isRTL } = useTranslations()
  return (
    <div
      className={`overflow-hidden rounded-3xl bg-muted ${className || ''}`}
    >
      <div className="flex flex-col">
        {/* Image Section - Top */}
        <div className="w-full bg-gray-900 dark:bg-black overflow-hidden">
          <div className="relative h-40 lg:h-full min-h-[250px]">
            <OptimizedImage
              src={imageSrc}
              alt={imageAlt || title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
              priority={false}
            />
          </div>
        </div>

        {/* Text Content Section - Bottom */}
        <div className="w-full p-8">
          <div className="flex flex-col h-full justify-between">
            {/* Logo and Title */}
            <div className="space-y-6">
              <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                {logo.split(' ').length === 1 ? (
                  <div className="text-3xl lg:text-4xl font-bold uppercase tracking-wide">
                    {logo}
                  </div>
                ) : (
                  <>
                    <div className="text-3xl lg:text-4xl font-serif">
                      {logo.split(' ')[0]}
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold uppercase tracking-wide">
                      {logo.split(' ')[1]}
                    </div>
                  </>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-base lg:text-lg leading-relaxed">
                {description}
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className={`flex flex-col gap-3 pt-6 ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
              <Button 
                size="lg"
                className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg"
                onClick={() => {
                  if (ctaText.toLowerCase().includes('start writing')) {
                    window.location.href = '/service'
                  } else if (ctaText.toLowerCase().includes('databayt')) {
                    window.open('https://databayt.org', '_blank')
                  } else if (ctaText.toLowerCase().includes('codebase')) {
                    window.open('https://cb.databayt.org', '_blank')
                  } else if (ctaText.toLowerCase().includes('live preview')) {
                    window.open('https://co.databayt.org', '_blank')
                  } else if (ctaText.toLowerCase().includes('get app')) {
                    window.open('https://co.databayt.org', '_blank')
                  }
                }}
              >
                {ctaText}
              </Button>
              <Button 
                variant="ghost"
                size="lg"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium px-6 py-3"
                onClick={() => {
                  if (secondaryCtaText.toLowerCase().includes('start writing')) {
                    window.location.href = '/service'
                  } else if (secondaryCtaText.toLowerCase().includes('databayt')) {
                    window.open('https://databayt.org', '_blank')
                  } else if (secondaryCtaText.toLowerCase().includes('codebase')) {
                    window.open('https://cb.databayt.org', '_blank')
                  } else if (secondaryCtaText.toLowerCase().includes('live preview')) {
                    window.open('https://co.databayt.org', '_blank')
                  } else if (secondaryCtaText.toLowerCase().includes('get app')) {
                    window.open('https://co.databayt.org', '_blank')
                  }
                }}
              >
                {secondaryCtaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerticalImageCard
