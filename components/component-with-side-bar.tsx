"use client";

import * as React from "react"
import Link  from "next/link";
import { usePathname } from 'next/navigation';
import { LayoutGridIcon, PackageIcon, ShoppingCartIcon, Home, Tent, Coins } from "lucide-react";

export default function ComponentWithSideBar( { children } : any ) {
  const pathName = usePathname();

  const items = [ 
    { path: "/home", label: "Home", iconComponent: LayoutGridIcon }, 
    { path: "/owner/contracts", label: "Propietario", iconComponent: Home }, 
    { path: "/tenant/contracts", label: "Inquilino", iconComponent: Tent }, 
    { path: "/investor/investments", label: "Inversiones", iconComponent: Coins } 
  ];

  const sidebarItem = ( { item } ) => (
    <div key={item.path} className={`px-4 ${ pathName === item.path && "bg-[color:rgb(225,231,239)] dark:bg-[color:rgb(3,7,18)]" }`}>
      <Link href={ item.path } className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
        { React.createElement( item.iconComponent, { className: "h-4 w-4" } ) }
        { item.label }
      </Link>
    </div>
  )

  return (
    <div key="1" className="flex h-full w-full">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full flex-col gap-2">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start text-sm font-medium">
              { items.map( ( item ) => sidebarItem( { item } ) ) }
            </nav>
          </div>
        </div>
      </div>
      { children }
    </div>
  )
};
