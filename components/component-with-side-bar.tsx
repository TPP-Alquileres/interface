"use client";

import { LayoutGridIcon, PackageIcon, ShoppingCartIcon } from "lucide-react"
import Link  from "next/link"

export default function ComponentWithSideBar({children}: any) {
    return (
        <div key="1" className="flex min-h-screen w-full">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full flex-col gap-2">
                <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                    <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="#"
                    >
                    <LayoutGridIcon className="h-4 w-4" />
                    Home
                    </Link>
                    <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="#"
                    >
                    <ShoppingCartIcon className="h-4 w-4" />
                    Propietario
                    </Link>
                    <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="#"
                    >
                    <ShoppingCartIcon className="h-4 w-4" />
                    Inquilino
                    </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                        <PackageIcon className="h-4 w-4" />
                        Inversiones
                        </Link>
                        </nav>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

