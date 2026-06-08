"use server"

import { auth } from "@/auth"

interface ReportIssueInput {
  description: string
  pageUrl: string
  meta?: {
    viewport?: string
    direction?: string
    browser?: string
  }
}

interface ReportIssueResult {
  error?: string
  success?: string
}

export async function reportIssue(
  data: ReportIssueInput
): Promise<ReportIssueResult> {
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  const repo = process.env.GITHUB_REPO || "databayt/marketing"

  if (!token) {
    return { error: "GITHUB_PERSONAL_ACCESS_TOKEN not configured" }
  }

  const desc = data.description.trim()
  if (!desc) return { error: "Description is required" }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  }

  const title = desc.length > 80 ? desc.slice(0, 77) + "..." : desc

  const session = await auth().catch(() => null)
  const reporter = session?.user
    ? `${session.user.name} (${session.user.email})`
    : "Anonymous"

  const body = [
    data.description,
    "",
    "---",
    "",
    `**Page**: ${data.pageUrl}`,
    `**Time**: ${new Date().toISOString()}`,
    `**Reporter**: ${reporter}`,
    data.meta?.browser && `**Browser**: ${data.meta.browser}`,
    data.meta?.viewport && `**Viewport**: ${data.meta.viewport}`,
    data.meta?.direction && `**Direction**: ${data.meta.direction}`,
  ]
    .filter(Boolean)
    .join("\n")

  const payload = { title, body, labels: ["report"] }

  let response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  })

  if (response.status === 422) {
    await fetch(`https://api.github.com/repos/${repo}/labels`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: "report",
        color: "d93f0b",
        description: "User-reported issues",
      }),
    }).catch(() => {})

    response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    console.error(`[report-issue] GitHub API ${response.status}: ${text}`)
    return { error: `GitHub API error: ${response.status}` }
  }

  const issueData = await response.json().catch(() => null)
  if (issueData?.comments_url) {
    await fetch(issueData.comments_url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        body: "Received. This report is queued for automated review and fix. You'll be notified here when resolved.",
      }),
    }).catch(() => {})
  }

  return { success: "Issue created" }
}
