"use client";

import { formatEther } from "viem";

import { pools, usePoolsBalances, usePoolsTotals } from "@/hooks/usePools";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import { InvestDialog } from "@/components/invest-dialog";
import PageBase from "@/components/page-base";
import { WithdrawDialog } from "@/components/withdraw-dialog";

export default function InvestorInvestments() {
  const {
    lowRiskTotalSupply,
    lowRiskTotalLocked,
    mediumRiskTotalSupply,
    mediumRiskTotalLocked,
    highRiskTotalSupply,
    highRiskTotalLocked,
  } = usePoolsTotals();

  const { lowRiskAssets, mediumRiskAssets, highRiskAssets } =
    usePoolsBalances();

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
                    <TableHead>TNA</TableHead>
                    <TableHead className="text-center">
                      Monto invertido
                    </TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-gray-100/40 dark:bg-gray-800/40">
                    <TableCell className="font-medium">Low risk pool</TableCell>
                    <TableCell className="font-medium">
                      Este pool tiene como objetivo encapsular a los inquilinos
                      más confiables
                    </TableCell>
                    <TableCell>{`$ ${formatEther(
                      lowRiskTotalSupply
                    )}`}</TableCell>
                    <TableCell>{`$ ${formatEther(
                      lowRiskTotalLocked
                    )}`}</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell className="text-center">{`$ ${formatEther(
                      lowRiskAssets
                    )}`}</TableCell>
                    <TableCell>
                      <InvestDialog pool={pools[0]} />
                    </TableCell>
                    <TableCell>
                      <WithdrawDialog pool={pools[0]} balance={lowRiskAssets} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mid risk pool</TableCell>
                    <TableCell className="font-medium">
                      Este pool tiene como objetivo encapsular a los inquilinos
                      confiables y nuevos
                    </TableCell>
                    <TableCell>{`$ ${formatEther(
                      mediumRiskTotalSupply
                    )}`}</TableCell>
                    <TableCell>{`$ ${formatEther(
                      mediumRiskTotalLocked
                    )}`}</TableCell>
                    <TableCell>13%</TableCell>
                    <TableCell className="text-center">
                      {`$ ${formatEther(mediumRiskAssets)}`}
                    </TableCell>
                    <TableCell>
                      <InvestDialog pool={pools[1]} />
                    </TableCell>
                    <TableCell>
                      <WithdrawDialog
                        pool={pools[1]}
                        balance={mediumRiskAssets}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-gray-100/40 dark:bg-gray-800/40">
                    <TableCell className="font-medium">
                      High risk pool
                    </TableCell>
                    <TableCell className="font-medium">
                      Este pool tiene como objetivo encapsular a los inquilinos
                      con menos información, hay más incertidumbre
                    </TableCell>
                    <TableCell>{`$ ${formatEther(
                      highRiskTotalSupply
                    )}`}</TableCell>
                    <TableCell>{`$ ${formatEther(
                      highRiskTotalLocked
                    )}`}</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell className="text-center">{`$ ${formatEther(
                      highRiskAssets
                    )}`}</TableCell>
                    <TableCell>
                      <InvestDialog pool={pools[2]} />
                    </TableCell>
                    <TableCell>
                      <WithdrawDialog
                        pool={pools[2]}
                        balance={highRiskAssets}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </ComponentWithSideBar>
    </PageBase>
  );
}
