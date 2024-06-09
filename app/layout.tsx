"use client";

import "@/styles/globals.css";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, fallback, http, unstable_connector } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";

interface RootLayoutProps {
  children: React.ReactNode;
  session: SessionProviderProps & {
    expires: string;
    user: { id: string; isAdmin: boolean };
  };
}

const config = getDefaultConfig({
  appName: "Alquileres",
  projectId: "e5e67a4d0dd7a2df9793a84b1acc6b28",
  chains: [sepolia],
  ssr: true,
  transports: {
    [sepolia.id]: fallback([
      http(process.env.NEXT_PUBLIC_SEPOLIA_RPC, { batch: true }),
      unstable_connector(injected),
      http(),
    ]),
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
                    <RainbowKitProvider showRecentTransactions={true}>
                      <div className="relative flex min-h-screen flex-col">
                        <SiteHeader />
                        <div className="flex-1">{children}</div>
                        <Toaster />
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
  );
}
