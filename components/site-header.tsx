"use client";

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { BellIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

export function SiteHeader() {

  const currentUser = getUser();
  
  if (currentUser == null) {
    return (
      <header className="bg-background sticky top-0 z-40 w-full border-b">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={siteConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
  
  
              <Link key="signin" href="signin">
                <div className="mr-3 decoration-solid font-medium hover:opacity-75">Sign In</div>
              </Link>
              <Link key="signup" href="signup">
                <div className="rounded border border-current px-2 py-1 decoration-solid font-medium hover:opacity-75">Sign Up</div>
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
    )  
  } else {
    return (
      <header className="bg-background sticky top-0 z-40 w-full border-b">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={siteConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4 ">
            <nav className="flex items-center space-x-1">
              <Button
                className="ml-auto h-8 w-8 rounded-full border-gray-200 dark:border-gray-800"
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
                  src="/placeholder.svg"
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
              <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

            </nav>
          </div>
        </div>
    </header>
    )
  }
  

  
}

function getUser() {
  let currentUser = null;
  return currentUser;
}
