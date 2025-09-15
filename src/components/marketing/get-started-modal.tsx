'use client';

import React, { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useTranslations } from '@/lib/use-translations';
import { Palette, Smartphone, Zap, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  {
    id: 'design',
    icon: Palette,
    label: 'Design',
    labelAr: 'تصميم',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    hoverBg: 'hover:bg-purple-500/20',
  },
  {
    id: 'app',
    icon: Smartphone,
    label: 'App',
    labelAr: 'تطبيق',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    hoverBg: 'hover:bg-blue-500/20',
  },
  {
    id: 'automation',
    icon: Zap,
    label: 'Automation',
    labelAr: 'أتمتة',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    hoverBg: 'hover:bg-orange-500/20',
  },
  {
    id: 'consultation',
    icon: MessageCircle,
    label: 'Consultation',
    labelAr: 'استشارة',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    hoverBg: 'hover:bg-green-500/20',
  },
];

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const { locale, isRTL } = useTranslations();
  const router = useRouter();

  const handleServiceSelect = (serviceId: string) => {
    router.push(`/${locale}/service#${serviceId}`);
    onClose();
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ zIndex: 150 }}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[151] translate-x-[-50%] translate-y-[-50%]",
            "w-[calc(100vw-2rem)] max-w-[400px]",
            "max-h-[calc(100vh-2rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto",
            "border bg-background p-6 shadow-lg rounded-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            isRTL && "rtl"
          )}
        >
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>
              Choose a Service
            </DialogPrimitive.Title>
          </VisuallyHidden.Root>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={cn(
                    "group flex flex-col items-center justify-center p-6 rounded-lg border transition-all duration-200",
                    "hover:border-primary hover:shadow-md hover:-translate-y-0.5",
                    service.bgColor,
                    service.hoverBg
                  )}
                >
                  <Icon className={cn("w-8 h-8 mb-2", service.color)} />
                  <span className="text-sm font-medium">
                    {isRTL ? service.labelAr : service.label}
                  </span>
                </button>
              );
            })}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}