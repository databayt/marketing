'use server';

/**
 * Create a GitHub issue for a wizard "Start" submission — the same mechanism as
 * the databayt report-an-issue feature (server-side, token-authored, so the
 * visitor never has to log in), but with a clean `request` label instead of
 * `report`. Configure GITHUB_PERSONAL_ACCESS_TOKEN (and optionally GITHUB_REPO,
 * defaulting to databayt/marketing) in the environment.
 */

import type { CreateRequestResult, ProjectSummary } from './start-types';

const API = 'https://api.github.com';
const REPO = (process.env.GITHUB_REPO || 'databayt/marketing').trim();
const LABEL = 'request';

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

function buildBody(summary: ProjectSummary, contact: string): string {
  return [
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
    `- **WhatsApp / email:** ${contact}`,
  ].join('\n');
}

export async function createProjectRequest(input: {
  contact: string;
  summary: ProjectSummary;
}): Promise<CreateRequestResult> {
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN?.trim();
  if (!token) {
    console.error('[wizard] GITHUB_PERSONAL_ACCESS_TOKEN not configured');
    return { ok: false, error: 'not-configured' };
  }

  const contact = input.contact.trim();
  if (!contact) return { ok: false, error: 'invalid' };

  const headers = authHeaders(token);
  const payload = {
    title: `Project request: ${input.summary.business || 'Website'}`.slice(0, 256),
    body: buildBody(input.summary, contact),
    labels: [LABEL],
  };

  const post = () =>
    fetch(`${API}/repos/${REPO}/issues`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

  let res = await post();

  // 422 usually means the label doesn't exist yet — create it, then retry once.
  if (res.status === 422) {
    await fetch(`${API}/repos/${REPO}/labels`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: LABEL,
        color: '1d76db',
        description: 'New project request from the wizard',
      }),
    }).catch(() => {});
    res = await post();
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error(`[wizard] createIssue ${res.status}: ${text}`);
    return { ok: false, error: 'github' };
  }

  const data = (await res.json()) as { number: number; html_url: string };
  return { ok: true, issueNumber: data.number, url: data.html_url };
}
