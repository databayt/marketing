"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import SiteHeaderClient from './client'

interface SiteHeaderProps {
  onChatClick?: () => void
}

export default function SiteHeader({ onChatClick }: SiteHeaderProps) {
  const { status } = useSession()
  return (
    <SiteHeaderClient
      isAuthenticated={status === 'authenticated'}
      onChatClick={onChatClick}
    />
  )
}
