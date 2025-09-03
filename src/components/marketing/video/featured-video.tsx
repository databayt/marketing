"use client";

import React from 'react'
import { featuredProjects } from './constant'
import HoverEffect from '@/components/marketing/video/card-video'
import { useTranslations } from '@/lib/use-translations'

const FeaturedProjects = () => {
  const { locale } = useTranslations()
  
  return (
    <div className='mt-6 md:mt-20'>
      <div className=" -mt-10">
        <HoverEffect items={featuredProjects(3, locale)} />
      </div>
    </div>
  )
}

export default FeaturedProjects