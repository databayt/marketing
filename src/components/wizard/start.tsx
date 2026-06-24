'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type ProjectSummary = {
  business: string;
  features: string[];
  template: string;
  theme: string;
  typography: string;
  iconStyle: string;
  price: number;
  time: number;
};

// Where the prefilled project request opens.
const REPO = 'databayt/marketing';

type StartProjectProps = {
  summary: ProjectSummary;
  startLabel: string;
};

export const StartProject = ({ summary, startLabel }: StartProjectProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const submit = () => {
    if (!email.trim() && !phone.trim()) {
      toast.error('Add a phone number or email so we can reach you.');
      return;
    }

    const title = `New project request: ${summary.business || 'Website'}`;
    const body = [
      '## Project request',
      '',
      `- **Business:** ${summary.business || '—'}`,
      `- **Features:** ${summary.features.length ? summary.features.join(', ') : '—'}`,
      `- **Template:** ${summary.template || '—'}`,
      `- **Theme:** ${summary.theme || '—'}`,
      `- **Typography:** ${summary.typography || '—'}`,
      `- **Icon style:** ${summary.iconStyle || '—'}`,
      `- **Estimate:** $${summary.price} • ${summary.time} days`,
      '',
      '## Contact',
      `- **Email:** ${email.trim() || '—'}`,
      `- **Phone:** ${phone.trim() || '—'}`,
    ].join('\n');

    const url = `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
    toast.success('Opening your project request…');
  };

  return (
    <>
      <Button
        size="lg"
        className="rounded-full px-12"
        onClick={() => setOpen(true)}
      >
        {startLabel}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{startLabel}</DialogTitle>
            <DialogDescription>
              Leave a phone number or email and we’ll reach out with your plan.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="start-email">Email</Label>
              <Input
                id="start-email"
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-phone">Phone</Label>
              <Input
                id="start-phone"
                type="tel"
                inputMode="tel"
                placeholder="+1 555 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full">
                {startLabel}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
