"use client";

import { HoverEffect } from '@/components/atom/card-hover-effect';
import { Project } from './type';

interface ProjectCardProps {
  items: Project[];
  className?: string;
}

export function ProjectCard({ items, className }: ProjectCardProps) {
  // Transform projects to match HoverEffect interface
  const transformedItems = items.map(project => ({
    title: project.title,
    description: project.description,
    link: project.link,
    image: project.image
  }));

  return <HoverEffect items={transformedItems} className={className} />;
}