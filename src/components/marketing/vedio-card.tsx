"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { OptimizedVideo } from '@/components/ui/optimized-video'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { useTranslations } from '@/lib/use-translations'

export interface VideoCardProps {
  logo: string
  title: string
  description: string
  ctaText: string
  secondaryCtaText: string
  videoSrc?: string
  imageSrc?: string
  videoPoster?: string
  className?: string
}

const VideoCard = ({
  logo,
  title,
  description,
  ctaText,
  secondaryCtaText,
  videoSrc = "/marketing/site/dream.mp4",
  imageSrc,
  videoPoster,
  className
}: VideoCardProps) => {
  const { isRTL, locale } = useTranslations()
  const isVertical = className?.includes('flex-col')
  
  return (
    <div
      className="overflow-hidden rounded-3xl bg-muted"
    >
      <div className={`flex ${isVertical ? 'flex-col' : 'flex-col lg:flex-row'}`}>
        {/* Text Content Section - Left for horizontal, bottom for vertical */}
        {!isVertical && (
          <div className="lg:w-[40%] p-8">
            <div className="flex flex-col h-full justify-between">
              {/* Logo and Title */}
              <div className="space-y-6">
                <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
{locale === 'ar' && logo === 'آلة الأحلام' ? (
                    <div className="text-3xl lg:text-4xl font-medium" style={{ fontFamily: 'Rubik, sans-serif' }}>
                      {logo}
                    </div>
                  ) : logo.split(' ').length === 1 ? (
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
              <div className={`flex flex-col gap-3 pt-6 ${isRTL ? 'sm:flex-row-reverse items-start' : 'sm:flex-row items-start'}`}>
                {locale === 'ar' ? (
                  <>
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
                        }
                      }}
                    >
                      {secondaryCtaText}
                    </Button>
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
                        }
                      }}
                    >
                      {ctaText}
                    </Button>
                  </>
                ) : (
                  <>
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
                        }
                      }}
                    >
                      {secondaryCtaText}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video/Image Section - Right for horizontal, top for vertical */}
        <div className={`${isVertical ? 'w-full' : 'lg:w-[60%]'} bg-gray-900 dark:bg-black overflow-hidden`}>
          <div className="relative h-40 lg:h-full min-h-[250px]">
            {imageSrc ? (
              <OptimizedImage
                src={imageSrc}
                alt={title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <OptimizedVideo
                src={videoSrc}
                className="w-full h-full object-cover pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                width={800}
                height={400}
              />
            )}
          </div>
        </div>

        {/* Text Content Section - Only for vertical layout (bottom) */}
        {isVertical && (
          <div className="w-full p-8">
            <div className="flex flex-col h-full justify-between">
              {/* Logo and Title */}
              <div className="space-y-6">
                <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
{locale === 'ar' && logo === 'آلة الأحلام' ? (
                    <div className="text-3xl lg:text-4xl font-medium" style={{ fontFamily: 'Rubik, sans-serif' }}>
                      {logo}
                    </div>
                  ) : logo.split(' ').length === 1 ? (
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
              <div className={`flex flex-col gap-3 pt-6 ${isRTL ? 'sm:flex-row-reverse items-start' : 'sm:flex-row items-start'}`}>
                {locale === 'ar' ? (
                  <>
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
                        }
                      }}
                    >
                      {secondaryCtaText}
                    </Button>
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
                        }
                      }}
                    >
                      {ctaText}
                    </Button>
                  </>
                ) : (
                  <>
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
                        }
                      }}
                    >
                      {secondaryCtaText}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoCard
