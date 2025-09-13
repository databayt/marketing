"use client";

import React, { useState, useEffect } from 'react';
import { getProjects, getProjectTabs } from './constant';
import { ProjectCard } from './card';
import { useTranslations } from '@/lib/use-translations';
import { cn } from '@/lib/utils';
import { ProjectSectionProps } from './type';

const FeaturedProjects = ({ projectsSection }: ProjectSectionProps) => {
  const { locale } = useTranslations();
  const [activeTab, setActiveTab] = useState('featured');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const tabs = getProjectTabs(isMobile, projectsSection);
  const allProjects = getProjects(locale);
  
  // Filter projects based on active tab
  const filteredProjects = activeTab === 'featured' 
    ? allProjects // Show all projects when Featured is selected
    : allProjects.filter(project => project.category === activeTab);
  
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
      
      {/* Projects Grid with Hover Effect */}
      <div className="-mt-10">
        <ProjectCard items={filteredProjects} />
      </div>
    </div>
  );
};

export default FeaturedProjects;