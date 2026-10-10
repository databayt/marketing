import React from 'react'
// import { auth } from "@/auth"
import SiteHeaderClient from './client'

interface SiteHeaderProps {
  onChatClick?: () => void;
  hideUntilScroll?: boolean;
}

export default function SiteHeader({ onChatClick, hideUntilScroll }: SiteHeaderProps) {
  // const session = await auth();
  return <SiteHeaderClient isAuthenticated={false} onChatClick={onChatClick} hideUntilScroll={hideUntilScroll} />
}
  