"use client";

import { useState, useEffect } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import ComponentWithSideBar from "@/components/component-with-side-bar";
import { Api } from "@/javascript/api";
import { ContractStatus } from '@/utils/contract';
import PageBase from '@/components/page-base';

export default function Home() {
  const { data: session } = useSession();
  const [ contracts, setContracts ] = useState();

  useEffect(() => {
    async function getContracts() {
      const contractsJson = await (new Api()).get( { 
        url: `contracts`, currentUser: session?.user
      } );
      setContracts(contractsJson);
      return contractsJson;
    };

    if ( session?.user ) {
      getContracts();
    }
  }, [ session?.user ] );

  const activeContracts = contracts?.filter(contract => contract.status === ContractStatus.ACTIVE);
  const ownerContractsCount = activeContracts?.filter(contract => contract.ownerId === session?.user.id).length || 0;
  const tenantContractsCount = activeContracts?.filter(contract => contract.tenantId === session?.user.id).length || 0;

  return (
    <PageBase>
      <ComponentWithSideBar>
        <div className="flex flex-col w-full">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle>Propietario</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto justify-content:flex-end">
                    {ownerContractsCount} contratos vigentes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle>Inquilino</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tenantContractsCount} contratos vigentes</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Tus inversiones</CardTitle>
                <CardDescription>Fondos</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Pool</TableHead>
                      <TableHead>Riesgo</TableHead>
                      <TableHead className="text-right">Tasa promedio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Pool 1</TableCell>
                      <TableCell>Bajo</TableCell>
                      <TableCell className="text-right">10%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pool 2</TableCell>
                      <TableCell>Medio</TableCell>
                      <TableCell className="text-right">12%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pool 3</TableCell>
                      <TableCell>Alto</TableCell>
                      <TableCell className="text-right">16%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pool 5</TableCell>
                      <TableCell>Medio</TableCell>
                      <TableCell className="text-right">12%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </ComponentWithSideBar>
    </PageBase>
  )
}


function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function LayoutGridIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}
