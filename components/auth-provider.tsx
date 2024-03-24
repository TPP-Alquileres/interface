"use client"

import { useEffect } from "react";
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export function AuthProvider({ children, ...props }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/") }
  }, [status] );

  return <div {...props}>{children}</div>;
}
