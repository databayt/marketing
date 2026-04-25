import React from 'react'
// import { auth } from "@/auth"
import SiteHeaderClient from './client'

export default function SiteHeader() {
  // const session = await auth();
  return <SiteHeaderClient isAuthenticated={false} />
}
