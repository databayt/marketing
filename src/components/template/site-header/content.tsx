import React from 'react'
// import { auth } from "@/auth"
import SiteHeaderClient from './client'

interface SiteHeaderProps {
  onChatClick?: () => void;
}

export default function SiteHeader({ onChatClick }: SiteHeaderProps) {
  // const session = await auth();
  return <SiteHeaderClient isAuthenticated={false} onChatClick={onChatClick} />
}
  