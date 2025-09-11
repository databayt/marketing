"use client";

import React, { useState } from 'react'
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
  
  const tabs = [
    { id: 'featured', label: projectsSection?.tabs?.featured || 'Featured' },
    { id: 'company', label: projectsSection?.tabs?.company || 'Company' },
    { id: 'education', label: projectsSection?.tabs?.education || 'Education' },
    { id: 'health', label: projectsSection?.tabs?.health || 'Health' },
    { id: 'ecommerce', label: projectsSection?.tabs?.ecommerce || 'E-commerce' },
    { id: 'states', label: projectsSection?.tabs?.states || 'States' },
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
      <div className="-mt-10">
        <HoverEffect items={filteredProjects} />
      </div>
    </div>
  )
}

export default FeaturedProjects