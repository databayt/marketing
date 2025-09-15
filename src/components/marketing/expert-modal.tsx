'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/lib/use-translations';
import { CheckCircle2, Users, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const expertSchema = z.object({
  contact: z.string().min(5, 'Please enter your email or phone'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select your budget range'),
  timeline: z.string().min(1, 'Please select your timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ExpertFormData = z.infer<typeof expertSchema>;

interface ExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExpertModal({ isOpen, onClose }: ExpertModalProps) {
  const { t, isRTL } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ExpertFormData>({
    resolver: zodResolver(expertSchema),
  });

  const onSubmit = async (data: ExpertFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/expert-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          reset();
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting expert consultation:', error);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        reset();
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !isSuccess) {
      reset();
      onClose();
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ zIndex: 150 }}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[151] translate-x-[-50%] translate-y-[-50%]",
            "w-[calc(100vw-2rem)] max-w-[520px]",
            "max-h-[calc(100vh-2rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto",
            "border bg-background p-4 sm:p-6 shadow-lg rounded-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            isRTL && "rtl"
          )}
        >
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>
              {t.expert?.title || 'Get Expert Consultation'}
            </DialogPrimitive.Title>
          </VisuallyHidden.Root>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <h3 className="text-xl font-semibold text-center">
                {t.expert?.successTitle || 'Expert Consultation Requested!'}
              </h3>
              <p className="text-center text-muted-foreground">
                {t.expert?.successMessage || 'Our expert team will contact you within 24 hours.'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {t.expert?.title || 'Get Expert Consultation'}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {t.expert?.subtitle || 'Tell us about your project and get personalized guidance'}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4">
                  <Input
                    {...register('contact')}
                    placeholder={t.expert?.contactPlaceholder || 'Email or WhatsApp'}
                    className={cn(
                      "text-base h-11",
                      errors.contact && 'border-red-500'
                    )}
                    style={{ fontSize: '16px' }}
                  />
                  {errors.contact && (
                    <p className="text-xs text-red-500 -mt-3">{errors.contact.message}</p>
                  )}

                  <Select onValueChange={(value) => setValue('projectType', value)}>
                    <SelectTrigger className={cn(
                      "h-11",
                      errors.projectType && 'border-red-500'
                    )}>
                      <SelectValue placeholder={t.expert?.projectTypePlaceholder || 'Select project type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website Development</SelectItem>
                      <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                      <SelectItem value="mobile">Mobile Application</SelectItem>
                      <SelectItem value="custom">Custom Software</SelectItem>
                      <SelectItem value="consulting">Technical Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.projectType && (
                    <p className="text-xs text-red-500 -mt-3">{errors.projectType.message}</p>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <Select onValueChange={(value) => setValue('budget', value)}>
                      <SelectTrigger className={cn(
                        "h-11",
                        errors.budget && 'border-red-500'
                      )}>
                        <SelectValue placeholder={t.expert?.budgetPlaceholder || 'Budget'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<1000">Less than $1,000</SelectItem>
                        <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10000+">$10,000+</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => setValue('timeline', value)}>
                      <SelectTrigger className={cn(
                        "h-11",
                        errors.timeline && 'border-red-500'
                      )}>
                        <SelectValue placeholder={t.expert?.timelinePlaceholder || 'Timeline'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1month">Within 1 month</SelectItem>
                        <SelectItem value="3months">1-3 months</SelectItem>
                        <SelectItem value="6months">3-6 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(errors.budget || errors.timeline) && (
                    <p className="text-xs text-red-500 -mt-3">
                      {errors.budget?.message || errors.timeline?.message}
                    </p>
                  )}

                  <Textarea
                    {...register('message')}
                    placeholder={t.expert?.messagePlaceholder || 'Tell us about your project goals and requirements...'}
                    className={cn(
                      "text-base resize-none h-28",
                      errors.message && 'border-red-500'
                    )}
                    style={{ fontSize: '16px' }}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 -mt-3">{errors.message.message}</p>
                  )}
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>{t.expert?.benefit1 || 'Get expert recommendations within 24 hours'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span>{t.expert?.benefit2 || 'Personalized project roadmap and timeline'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{t.expert?.benefit3 || 'Direct access to our senior consultants'}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {t.common?.cancel || 'Cancel'}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? '...' : (t.expert?.submit || 'Get Expert Help')}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}