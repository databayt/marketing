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

type StartDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary: ProjectSummary;
};

export const StartDialog = ({
  open,
  onOpenChange,
  summary,
}: StartDialogProps) => {
  const [contact, setContact] = useState('');

  const submit = () => {
    if (!contact.trim()) {
      toast.error('Add your WhatsApp number or email so we can reach you.');
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
      `- **WhatsApp / email:** ${contact.trim()}`,
    ].join('\n');

    const url = `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
    setContact('');
    toast.success('Opening your project request…');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start your project</DialogTitle>
          <DialogDescription>
            Leave your WhatsApp number or email and we’ll reach out with your
            plan.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-4"
        >
          <Input
            aria-label="WhatsApp or email"
            placeholder="WhatsApp or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            autoFocus
          />
          <DialogFooter>
            <Button type="submit" className="w-full">
              Start
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
