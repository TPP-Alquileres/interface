"use client";

import { useReadContract } from 'wagmi';
import { CardHeader, CardContent, Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import PageBase from "@/components/page-base";
import { insurancePoolAbi } from '../../../abis/InsurancePool';
import { moneyToDisplay } from '@/utils/money';

export default function InvestorInvestments() {
  const totalSupplyLowRiskPoolResult = useReadContract({
    abi: insurancePoolAbi,
    address: process.env.NEXT_PUBLIC_LOW_RISK_ADDRESS,
    functionName: 'totalSupply'
  });
  const totalLockedLowRiskPoolResult = useReadContract({
    abi: insurancePoolAbi,
    address: process.env.NEXT_PUBLIC_LOW_RISK_ADDRESS,
    functionName: 'totalLocked'
  });

  const totalSupplyMediumRiskPoolResult = useReadContract({
    abi: insurancePoolAbi,
    address: process.env.NEXT_PUBLIC_MEDIUM_RISK_ADDRESS,
    functionName: 'totalSupply'
  });
  const totalLockedMediumRiskPoolResult = useReadContract({
    abi: insurancePoolAbi,
    address: process.env.NEXT_PUBLIC_MEDIUM_RISK_ADDRESS,
    functionName: 'totalLocked'
  });

  const totalSupplyHighRiskPoolResult = useReadContract({
    abi: insurancePoolAbi,
    address: process.env.NEXT_PUBLIC_HIGH_RISK_ADDRESS,
    functionName: 'totalSupply'
  });
  const totalLockedHighRiskPoolResult = useReadContract({
    abi: insurancePoolAbi,
    address: process.env.NEXT_PUBLIC_HIGH_RISK_ADDRESS,
    functionName: 'totalLocked'
  });

  return (
    <PageBase>
      <ComponentWithSideBar>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Inversiones</CardTitle>
              <CardDescription>Fondos</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pool</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Total Supply</TableHead>
                    <TableHead>Total Locked</TableHead>
                    <TableHead className="text-right">TNA</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-gray-100/40 dark:bg-gray-800/40">
                    <TableCell className="font-medium">Low risk pool</TableCell>
                    <TableCell className="font-medium">Este pool tiene como objetivo encapsular a los inquilinos más confiables</TableCell>
                    <TableCell>{`$ ${moneyToDisplay(totalSupplyLowRiskPoolResult.data)}`}</TableCell>
                    <TableCell>{`$ ${moneyToDisplay(totalLockedLowRiskPoolResult.data)}`}</TableCell>
                    <TableCell className="text-right">10%</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">Invertir</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mid risk pool</TableCell>
                    <TableCell className="font-medium">Este pool tiene como objetivo encapsular a los inquilinos confiables y nuevos</TableCell>
                    <TableCell>{`$ ${moneyToDisplay(totalSupplyMediumRiskPoolResult.data)}`}</TableCell>
                    <TableCell>{`$ ${moneyToDisplay(totalLockedMediumRiskPoolResult.data)}`}</TableCell>
                    <TableCell className="text-right">13%</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">Invertir</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100/40 dark:bg-gray-800/40">
                    <TableCell className="font-medium">High risk pool</TableCell>
                    <TableCell className="font-medium">Este pool tiene como objetivo encapsular a los inquilinos con menos información, hay más incertidumbre</TableCell>
                    <TableCell>{`$ ${moneyToDisplay(totalSupplyHighRiskPoolResult.data)}`}</TableCell>
                    <TableCell>{`$ ${moneyToDisplay(totalLockedHighRiskPoolResult.data)}`}</TableCell>
                    <TableCell className="text-right">15%</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">Invertir</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </ComponentWithSideBar>
    </PageBase>
  )
}