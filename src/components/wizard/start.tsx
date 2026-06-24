'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { createProjectRequest } from '@/components/wizard/actions';
import type { ProjectSummary } from '@/components/wizard/start-types';
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

export type { ProjectSummary };

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
  const [pending, setPending] = useState(false);

  const submit = async () => {
    const value = contact.trim();
    if (!value) {
      toast.error('Add your WhatsApp number or email so we can reach you.');
      return;
    }

    setPending(true);
    const res = await createProjectRequest({ contact: value, summary });
    setPending(false);

    if (res.ok) {
      onOpenChange(false);
      setContact('');
      toast.success('Request received — we’ll reach out shortly!');
      return;
    }

    toast.error(
      res.error === 'not-configured'
        ? 'Requests aren’t set up yet. Please contact us directly.'
        : 'Something went wrong. Please try again.'
    );
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
            void submit();
          }}
          className="space-y-4"
        >
          <Input
            aria-label="WhatsApp or email"
            placeholder="WhatsApp or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            disabled={pending}
            autoFocus
          />
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Sending…' : 'Start'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
