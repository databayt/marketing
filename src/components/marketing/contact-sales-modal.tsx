'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/lib/use-translations';
import { CheckCircle2, Building2, Users, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const salesSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  companySize: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  requirements: z.string().min(10),
});

type SalesFormData = z.infer<typeof salesSchema>;

interface ContactSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export function ContactSalesModal({ isOpen, onClose, defaultPlan = 'enterprise' }: ContactSalesModalProps) {
  const { t, isRTL } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SalesFormData>({
    resolver: zodResolver(salesSchema),
  });

  const onSubmit = async (data: SalesFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sales-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, plan: defaultPlan }),
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
      console.error('Error submitting sales inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false);
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn("sm:max-w-[550px]", isRTL && "rtl")}>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-semibold">{t.sales?.successTitle || 'Thank You!'}</h3>
            <p className="text-center text-muted-foreground">
              {t.sales?.successMessage || 'Our sales team will contact you within 24 hours.'}
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {t.sales?.title || 'Contact Sales Team'}
              </DialogTitle>
              <DialogDescription>
                {t.sales?.description || 'Tell us about your enterprise needs and we\'ll create a custom solution.'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.sales?.nameLabel || 'Full Name'}</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{t.sales?.nameError || 'Name is required'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.sales?.emailLabel || 'Work Email'}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{t.sales?.emailError || 'Valid email required'}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">{t.sales?.companyLabel || 'Company Name'}</Label>
                <Input
                  id="company"
                  {...register('company')}
                  className={errors.company ? 'border-red-500' : ''}
                />
                {errors.company && (
                  <p className="text-sm text-red-500">{t.sales?.companyError || 'Company name is required'}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t.sales?.companySizeLabel || 'Company Size'}
                  </Label>
                  <select
                    id="companySize"
                    {...register('companySize')}
                    className={cn(
                      "w-full rounded-md border border-input bg-background px-3 py-2",
                      errors.companySize && 'border-red-500'
                    )}
                  >
                    <option value="">{t.sales?.selectSize || 'Select size'}</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {t.sales?.budgetLabel || 'Budget Range'}
                  </Label>
                  <select
                    id="budget"
                    {...register('budget')}
                    className={cn(
                      "w-full rounded-md border border-input bg-background px-3 py-2",
                      errors.budget && 'border-red-500'
                    )}
                  >
                    <option value="">{t.sales?.selectBudget || 'Select budget'}</option>
                    <option value="5k-10k">$5k - $10k</option>
                    <option value="10k-25k">$10k - $25k</option>
                    <option value="25k-50k">$25k - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k+">$100k+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">{t.sales?.timelineLabel || 'Project Timeline'}</Label>
                <select
                  id="timeline"
                  {...register('timeline')}
                  className={cn(
                    "w-full rounded-md border border-input bg-background px-3 py-2",
                    errors.timeline && 'border-red-500'
                  )}
                >
                  <option value="">{t.sales?.selectTimeline || 'Select timeline'}</option>
                  <option value="immediate">{t.sales?.immediate || 'Immediate (< 1 month)'}</option>
                  <option value="1-3months">{t.sales?.oneToThree || '1-3 months'}</option>
                  <option value="3-6months">{t.sales?.threeToSix || '3-6 months'}</option>
                  <option value="6months+">{t.sales?.sixPlus || '6+ months'}</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">{t.sales?.requirementsLabel || 'Project Requirements'}</Label>
                <Textarea
                  id="requirements"
                  {...register('requirements')}
                  placeholder={t.sales?.requirementsPlaceholder || 'Tell us about your project needs...'}
                  rows={4}
                  className={errors.requirements ? 'border-red-500' : ''}
                />
                {errors.requirements && (
                  <p className="text-sm text-red-500">{t.sales?.requirementsError || 'Please describe your requirements'}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (t.sales?.submitting || 'Sending...') : (t.sales?.submit || 'Contact Sales')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  {t.common?.cancel || 'Cancel'}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}