"use client";

import React, { useState, useEffect, memo, useMemo } from 'react'
import { getProjects } from './constant'
import HoverEffect from '@/components/marketing/video/card-video'
import { useTranslations } from '@/lib/use-translations'
import { cn } from '@/lib/utils'
import { ProjectGallerySkeleton } from '@/components/ui/loading-skeleton'

interface FeaturedProjectsProps {
  dictionary?: any;
  projectsSection?: any;
  params?: { lang: string };
}

const FeaturedProjects = memo(({ projectsSection }: FeaturedProjectsProps) => {
  const { locale } = useTranslations()
  const [activeTab, setActiveTab] = useState('featured')
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Simulate loading time for projects
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [locale])
  
  // Memoize tabs to prevent recreation on every render
  const tabs = useMemo(() => [
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
  ], [isMobile, projectsSection])
  
  // Memoize projects to prevent recreation on every render
  const allProjects = useMemo(() => getProjects(locale), [locale])
  
  // Memoize filtered projects
  const filteredProjects = useMemo(() => {
    return activeTab === 'featured'
      ? allProjects.filter(project => project.featured !== false)
      : allProjects.filter(project => project.category === activeTab)
  }, [activeTab, allProjects])

  // Displayed projects: show all when showAll is true, otherwise filtered
  const displayedProjects = showAll ? allProjects : filteredProjects

  // Handle tab click: reset showAll and switch tab
  const handleTabClick = (tabId: string) => {
    setShowAll(false)
    setActiveTab(tabId)
  }
  
  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex flex-wrap gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "text-sm font-medium transition-colors duration-200 pb-2 border-b-2",
                activeTab === tab.id && !showAll
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
        {isLoading ? (
          <ProjectGallerySkeleton />
        ) : (
          <HoverEffect
            items={displayedProjects}
            websiteLabel={projectsSection?.websiteButton}
            mobileLabel={projectsSection?.mobileButton}
          />
        )}
      </div>

      {/* More Button */}
      {!isLoading && !showAll && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className={cn(
              "text-sm font-medium transition-colors duration-200 pb-2 border-b-2",
              "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground"
            )}
          >
            {projectsSection?.more || 'More'}
          </button>
        </div>
      )}
    </div>
  )
})

FeaturedProjects.displayName = 'FeaturedProjects';

export default FeaturedProjects