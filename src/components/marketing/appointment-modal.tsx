'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from '@/lib/use-translations';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const appointmentSchema = z.object({
  contact: z.string().min(5, 'Please enter your email or phone'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const { t, isRTL } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
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
        }, 2500);
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        reset();
      }, 2500);
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
            "fixed left-[50%] top-[50%] w-[calc(100%-2rem)] max-w-[480px] translate-x-[-50%] translate-y-[-50%] border bg-background p-4 sm:p-6 shadow-lg rounded-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            isRTL && "rtl"
          )}
          style={{ zIndex: 151 }}
        >
          {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
            <p className="text-center text-base font-medium">
              {t.appointment?.successMessage || 'We will contact you shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-6 sm:pt-10">
            <Input
              {...register('contact')}
              placeholder={t.appointment?.contactPlaceholder || 'Email or Phone'}
              className={cn(
                "text-base h-12",
                errors.contact && 'border-red-500'
              )}
              style={{ fontSize: '16px' }}
            />
            {errors.contact && (
              <p className="text-xs text-red-500 -mt-3">{errors.contact.message}</p>
            )}

            <Textarea
              {...register('message')}
              placeholder={t.appointment?.messagePlaceholder || 'Your message...'}
              className={cn(
                "text-base resize-none h-32",
                errors.message && 'border-red-500'
              )}
              style={{ fontSize: '16px' }}
            />
            {errors.message && (
              <p className="text-xs text-red-500 -mt-3">{errors.message.message}</p>
            )}

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                className="w-24 h-9"
              >
                <span className="text-sm">
                  {isSubmitting ? '...' : (t.appointment?.send || 'Send')}
                </span>
              </Button>
            </div>
          </form>
        )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}