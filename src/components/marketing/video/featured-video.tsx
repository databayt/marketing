"use client";

import React, { useState, useEffect } from 'react'
import { getProjects } from './constant'
import HoverEffect from '@/components/marketing/video/card-video'
import { useTranslations } from '@/lib/use-translations'
import { cn } from '@/lib/utils'

interface FeaturedProjectsProps {
  dictionary?: any;
  projectsSection?: any;
  params?: { lang: string };
}

const FeaturedProjects = ({ projectsSection }: FeaturedProjectsProps) => {
  const { locale } = useTranslations()
  const [activeTab, setActiveTab] = useState('featured')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const tabs = [
    { 
      id: 'featured', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.featured || 'Featured'
        : projectsSection?.tabs?.featured || 'Featured' 
    },
    { 
      id: 'company', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.company || 'Co'
        : projectsSection?.tabs?.company || 'Company' 
    },
    { 
      id: 'education', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.education || 'Edu'
        : projectsSection?.tabs?.education || 'Education' 
    },
    { 
      id: 'health', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.health || 'Health'
        : projectsSection?.tabs?.health || 'Health' 
    },
    { 
      id: 'ecommerce', 
      label: isMobile 
        ? projectsSection?.tabsMobile?.ecommerce || 'E-comm'
        : projectsSection?.tabs?.ecommerce || 'E-commerce' 
    },
  ]
  
  const allProjects = getProjects(locale)
  
  // Filter projects based on active tab
  const filteredProjects = activeTab === 'featured' 
    ? allProjects // Show all 6 projects when Featured is selected
    : allProjects.filter(project => project.category === activeTab)
  
  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex flex-wrap gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "text-sm font-medium transition-colors duration-200 pb-2 border-b-2",
                activeTab === tab.id 
                  ? "text-foreground border-foreground" 
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="-mt-10 overflow-visible">
        <HoverEffect items={filteredProjects} />
      </div>
    </div>
  )
}

export default FeaturedProjects