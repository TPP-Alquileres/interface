"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { BellIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from "next-themes";

import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const { data: session, status } = useSession();
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const modeText = theme === "light" ? "Dark Mode" : "Light Mode";

  const onClickToggleMode = () => {
    setTheme(theme === "light" ? "dark" : "light")
  };

  const onClickSignOut = () => signOut({ redirect: false }).then(() => {
    router.push("/");
  });

  const onClickSignIn = () => signIn('github|google', { callbackUrl: '/home' } );

  const renderNotSignedInHeader = () => (
    <header className=" bg-background sticky top-0 z-40 w-full border-b">
      <div className="ml-5 mr-5 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
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
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4 ">
          <nav className="flex items-center space-x-3">
            <ConnectButton />

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

              <div className="bg-background">
                <DropdownMenuContent align="end" className="bg-gray-100/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 cursor-pointer p-2">
                  <DropdownMenuItem className="p-2 hover:text-gray-900 dark:hover:text-gray-50" onClick={onClickToggleMode}>{modeText}</DropdownMenuItem>
                  <DropdownMenuItem className="p-2 hover:text-gray-900 dark:hover:text-gray-50" onClick={onClickSignOut}>Cerrar sesión</DropdownMenuItem>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );

  return status === "authenticated" ? renderSignedInHeader() : renderNotSignedInHeader();
}
