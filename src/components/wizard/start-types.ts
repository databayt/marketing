// Shared between the Start dialog (client) and the create-request server action.
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

export type CreateRequestResult =
  | { ok: true; issueNumber: number; url: string }
  | { ok: false; error: 'not-configured' | 'invalid' | 'github' };
