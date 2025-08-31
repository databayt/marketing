import React from 'react'
import { cn } from '@/lib/utils'

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
  const features = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "& Research",
      borderColor: "border-blue-500",
      strokeColor: "#3b82f6"
    },
    {
      number: "02", 
      title: "Design",
      subtitle: "& Prototyping",
      borderColor: "border-cyan-500",
      strokeColor: "#06b6d4"
    },
    {
      number: "03",
      title: "Development",
      subtitle: "& Testing", 
      borderColor: "border-teal-500",
      strokeColor: "#14b8a6"
    },
    {
      number: "04",
      title: "Launch",
      subtitle: "& Support",
      borderColor: "border-emerald-500",
      strokeColor: "#10b981"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2 items-center mt-20 ">
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
