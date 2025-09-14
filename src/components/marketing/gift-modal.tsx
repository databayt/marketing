'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/lib/use-translations';
import { Gift, Copy, CheckCircle2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const giftSchema = z.object({
  email: z.string().email(),
});

type GiftFormData = z.infer<typeof giftSchema>;

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GiftModal({ isOpen, onClose }: GiftModalProps) {
  const { t, isRTL } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GiftFormData>({
    resolver: zodResolver(giftSchema),
  });

  const onSubmit = async (data: GiftFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/gift-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setCouponCode(result.couponCode || 'WELCOME2025');
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error claiming gift:', error);
      setCouponCode('WELCOME2025');
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false);
      setCouponCode('');
      setCopied(false);
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn("sm:max-w-[450px]", isRTL && "rtl")}>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-6">
            <div className="relative">
              <Gift className="w-20 h-20 text-primary animate-bounce" />
              <CheckCircle2 className="w-8 h-8 text-green-500 absolute -bottom-1 -right-1" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">{t.gift?.congratulations || 'Congratulations!'}</h3>
              <p className="text-muted-foreground">
                {t.gift?.giftReceived || 'Your exclusive discount code is:'}
              </p>
            </div>

            <div className="w-full space-y-3">
              <div className="relative group">
                <div className="bg-primary/10 border-2 border-dashed border-primary rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{t.gift?.discountCode || 'Discount Code'}</p>
                  <p className="text-2xl font-mono font-bold text-primary">{couponCode}</p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                <p className="text-sm font-medium">{t.gift?.offerDetails || 'Special Offer:'}</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t.gift?.discount || '20% off your first project'}</li>
                  <li>• {t.gift?.freeConsultation || 'Free consultation included'}</li>
                  <li>• {t.gift?.validFor || 'Valid for 30 days'}</li>
                </ul>
              </div>
            </div>

            <Button
              onClick={handleClose}
              className="w-full"
            >
              {t.gift?.awesome || 'Awesome, Thanks!'}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4">
                <Gift className="w-12 h-12 text-primary" />
              </div>
              <DialogTitle className="text-2xl">
                {t.gift?.title || 'Claim Your Gift!'}
              </DialogTitle>
              <DialogDescription className="text-center">
                {t.gift?.description || 'Get an exclusive discount on your first project with us'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 text-center">
                <p className="text-lg font-semibold mb-1">{t.gift?.limitedOffer || 'Limited Time Offer'}</p>
                <p className="text-3xl font-bold text-primary">{t.gift?.percentOff || '20% OFF'}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.gift?.firstProject || 'On Your First Project'}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t.gift?.emailLabel || 'Email Address'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder={t.gift?.emailPlaceholder || 'Enter your email'}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{t.gift?.emailError || 'Please enter a valid email'}</p>
                )}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                {t.gift?.privacy || 'We respect your privacy. No spam, ever.'}
              </p>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (t.gift?.claiming || 'Claiming...') : (t.gift?.claimGift || 'Claim My Gift')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  {t.gift?.maybeLater || 'Maybe Later'}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}