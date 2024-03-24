"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { BellIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from 'next/navigation';
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";

import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConnectWalletButton } from "./ConnectWalletButton";

export function SiteHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const onClickSignOut = () => signOut({ redirect: false }).then(() => {
    router.push("/");
  });

  const onClickSignIn = () => signIn('github', { callbackUrl: '/home' } );

  const host = typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Alquileres",
      url: host,
    },
  };

  const renderNotSignedInHeader = () => (
    <header className=" bg-background sticky top-0 z-40 w-full border-b">
      <div className="ml-5 mr-5 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4 float-end">
          <nav className="flex items-center space-x-1">
            <button className="mr-3 decoration-solid font-medium hover:opacity-75" onClick={onClickSignIn}>Sign in</button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );

  const renderSignedInHeader = () => (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="ml-5 mr-5 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4 ">
          <nav className="flex items-center space-x-3">
            <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
              <ConnectWalletButton />
            </MetaMaskProvider>
            <Button
              className="ml-auto h-10 w-10 rounded-full border-gray-200 dark:border-gray-800"
              size="icon"
              variant="outline"
            >
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                  size="icon"
                  variant="ghost"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src={session?.user?.image}
                    alt="/user.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi perfil</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuItem>Soporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onClickSignOut}>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );

  return status === "authenticated" ? renderSignedInHeader() : renderNotSignedInHeader();
}
