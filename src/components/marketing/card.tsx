"use client";

import React from 'react'
import { cn } from '@/lib/utils'
import { useTranslations } from '@/lib/use-translations'

interface FeatureCardProps {
  number: string
  title: string
  subtitle: string
  className?: string
  borderColor?: string
  strokeColor?: string
}

const FeatureCard = ({ 
  number, 
  title, 
  subtitle, 
  className,
  borderColor = "border-purple-500",
  strokeColor = "#a855f7"
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "rounded-2xl border-1 py-6 aspect-auto flex flex-col justify-center px-6",
      borderColor,
      "bg-transparent",
      className
    )}>
      <div className="flex flex-col space-y-3">
        <div 
          className="text-5xl font-bold"
          style={{
            WebkitTextStroke: `2px ${strokeColor}`,
            color: 'transparent'
          }}>
          {number}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>
          <p className="text-base text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

const FeatureCards = () => {
  const { t } = useTranslations()
  
  const features = [
    {
      number: "01",
      title: t.marketing.featureCards.discovery.title,
      subtitle: t.marketing.featureCards.discovery.subtitle,
      borderColor: "border-blue-500",
      strokeColor: "#3b82f6"
    },
    {
      number: "02", 
      title: t.marketing.featureCards.design.title,
      subtitle: t.marketing.featureCards.design.subtitle,
      borderColor: "border-cyan-500",
      strokeColor: "#06b6d4"
    },
    {
      number: "03",
      title: t.marketing.featureCards.development.title,
      subtitle: t.marketing.featureCards.development.subtitle, 
      borderColor: "border-teal-500",
      strokeColor: "#14b8a6"
    },
    {
      number: "04",
      title: t.marketing.featureCards.launch.title,
      subtitle: t.marketing.featureCards.launch.subtitle,
      borderColor: "border-emerald-500",
      strokeColor: "#10b981"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          number={feature.number}
          title={feature.title}
          subtitle={feature.subtitle}
          borderColor={feature.borderColor}
          strokeColor={feature.strokeColor}
        />
      ))}
    </div>
  )
}

export { FeatureCard, FeatureCards }
export default FeatureCards
