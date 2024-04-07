"use client"

import "@/styles/globals.css"
import { SessionProvider } from "next-auth/react"
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"

interface RootLayoutProps {
  children: React.ReactNode,
  session: SessionProviderProps
}

const config = getDefaultConfig({
  appName: 'Alquileres',
  projectId: 'e5e67a4d0dd7a2df9793a84b1acc6b28',
  chains: [polygon, polygonMumbai],
  ssr: true,
  transports: {
    [polygonMumbai.id]: http(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.POLYGON_MUMBAI_API_KEY}`),
    [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.POLYGON_MAINNET_API_KEY}`),
  },
});

const queryClient = new QueryClient();

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider session={session}>
              <AuthProvider>
                <WagmiProvider config={config}>
                  <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                      <div className="relative flex min-h-screen flex-col">
                        <SiteHeader />
                        <div className="flex-1">{children}</div>
                      </div>
                    </RainbowKitProvider>
                  </QueryClientProvider>
                </WagmiProvider>
                <TailwindIndicator />
              </AuthProvider>
            </SessionProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
