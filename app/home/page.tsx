"use client";

import { useEffect, useState } from "react";
import { Api } from "@/javascript/api";
import { ContractStatus } from "@/utils/contract";
import { Contract } from "@prisma/client";
import { useSession } from "next-auth/react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import { usePoolsBalances } from "@/hooks/usePools";
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
import PageBase from "@/components/page-base";

export default function Home() {
  const { data: session } = useSession();
  const [contracts, setContracts] = useState<Contract[]>();
  const { isConnected } = useAccount();

  const { lowRiskAssets, mediumRiskAssets, highRiskAssets } =
    usePoolsBalances();

  useEffect(() => {
    async function getContracts() {
      const contractsJson = await new Api().get({
        url: `contracts`,
        currentUser: session?.user,
      });
      setContracts(contractsJson);
      return contractsJson;
    }

    if (session?.user) {
      getContracts();
    }
  }, [session?.user]);

  const activeContracts = contracts?.filter(
    (contract) => contract.status === ContractStatus.ACTIVE
  );
  const ownerContractsCount =
    activeContracts?.filter((contract) => contract.ownerId === session?.user.id)
      .length || 0;
  const tenantContractsCount =
    activeContracts?.filter(
      (contract) => contract.tenantId === session?.user.id
    ).length || 0;

  const renderInvestments = () => {
    if (!isConnected) {
      return (
        <CardContent className="p-4">
          Conecta tu wallet para ver tus inversiones
        </CardContent>
      );
    }

    return (
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fondo</TableHead>
              <TableHead>Monto invertido</TableHead>
              <TableHead className="text-right">TNA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-gray-100/40 dark:bg-gray-800/40">
              <TableCell className="font-medium">
                Fondo de riesgo bajo
              </TableCell>
              <TableCell>{`$ ${formatEther(lowRiskAssets)}`}</TableCell>
              <TableCell className="text-right">10%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Fondo de riesgo medio
              </TableCell>
              <TableCell>{`$ ${formatEther(mediumRiskAssets)}`}</TableCell>
              <TableCell className="text-right">13%</TableCell>
            </TableRow>
            <TableRow className="bg-gray-100/40 dark:bg-gray-800/40">
              <TableCell className="font-medium">
                Fondo de riesgo alto
              </TableCell>
              <TableCell>{`$ ${formatEther(highRiskAssets)}`}</TableCell>
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
        <div className="flex w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Propietario</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="justify-content:flex-end mt-auto text-xs text-gray-500 dark:text-gray-400">
                    {ownerContractsCount} contratos vigentes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Inquilino</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {tenantContractsCount} contratos vigentes
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Tus inversiones</CardTitle>
                <CardDescription>Fondos</CardDescription>
              </CardHeader>
              {renderInvestments()}
            </Card>
          </main>
        </div>
      </ComponentWithSideBar>
    </PageBase>
  );
}
