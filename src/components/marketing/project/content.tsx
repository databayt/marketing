"use client";

import FeaturedProjects from './featured';
import { ProjectSectionProps } from './type';

export default function ProjectContent({ dictionary, params }: ProjectSectionProps) {
  const projectsSection = dictionary?.marketing?.projects;

  return (
    <section className="container mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          {projectsSection?.title || 'Our Projects'}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {projectsSection?.subtitle || 'Explore our portfolio of successful projects across various industries'}
        </p>
      </div>
      
      <FeaturedProjects 
        projectsSection={projectsSection} 
        dictionary={dictionary}
        params={params}
      />
    </section>
  );
}