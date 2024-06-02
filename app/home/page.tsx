"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useReadContract, useAccount } from 'wagmi';
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import ComponentWithSideBar from "@/components/component-with-side-bar";
import { Api } from "@/javascript/api";
import { ContractState } from '@/utils/contract';
import PageBase from '@/components/page-base';
import { insurancePoolAbi } from '../../abis/InsurancePool';
import { render } from 'react-dom';

export default function Home() {
  const { data: session } = useSession();
  const [ contracts, setContracts ] = useState();
  const { isConnected } = useAccount();
  const lowRiskPoolResult = useReadContract({
    abi: insurancePoolAbi,
    address: process.env.NEXT_PUBLIC_LOW_RISK_ADDRESS,
    functionName: 'totalLocked',
  });
  const mediumRiskPoolResult = useReadContract({
    abi: insurancePoolAbi,
    address: process.env.NEXT_PUBLIC_MEDIUM_RISK_ADDRESS,
    functionName: 'totalLocked',
  });
  const highRiskPoolResult = useReadContract({
    abi: insurancePoolAbi,
    address: process.env.NEXT_PUBLIC_HIGH_RISK_ADDRESS,
    functionName: 'totalLocked',
  });

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

  const activeContracts = contracts?.filter(contract => contract.status === ContractState.ACTIVE);
  const ownerContractsCount = activeContracts?.filter(contract => contract.ownerId === session?.user.id).length || 0;
  const tenantContractsCount = activeContracts?.filter(contract => contract.tenantId === session?.user.id).length || 0;

  const renderInvestments = () => {
    if (!isConnected) {
      return (
        <CardContent className="p-4">
          Conecta tu wallet para ver tus inversiones
        </CardContent>
      );
    }

    if (!lowRiskPoolResult.status === 'Success' || !mediumRiskPoolResult.status === 'Success' || !highRiskPoolResult.status === 'Success') {
      return (
        <CardContent className="p-4">
          Cargando...
        </CardContent>
      );
    }

    const investmentToDisplay = ( invested ) => isNaN(Number(invested)) ? '-' : (Math.round(Number(invested) * 100) / 100).toFixed(2);

    return (
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pool</TableHead>
              <TableHead>Monto invertido</TableHead>
              <TableHead className="text-right">TNA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Low risk pool</TableCell>
              <TableCell>{`$ ${investmentToDisplay(lowRiskPoolResult.data)}`}</TableCell>
              <TableCell className="text-right">10%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Mid risk pool</TableCell>
              <TableCell>{`$ ${investmentToDisplay(mediumRiskPoolResult.data)}`}</TableCell>
              <TableCell className="text-right">13%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">High risk pool</TableCell>
              <TableCell>{`$ ${investmentToDisplay(highRiskPoolResult.data)}`}</TableCell>
              <TableCell className="text-right">15%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    );
  };

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
              { renderInvestments() }
            </Card>
          </main>
        </div>
      </ComponentWithSideBar>
    </PageBase>
  )
};
