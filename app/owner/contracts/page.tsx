"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Api } from "@/javascript/api";
import { Contract } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import ContractItem from "@/components/contract-item";
import PageBase from "@/components/page-base";

export default function OwnerContracts() {
  const { data: session } = useSession();
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [refresh, setRefresh] = useState(false); // State to control refresh

  const contractCreateUrl = "/contract/create";

  useEffect(() => {
    const url = `owners/${session?.user.id}/contracts`;

    async function getContracts() {
      const contractsJson = await new Api().get({
        url,
        currentUser: session?.user,
      });
      setContracts(contractsJson);
      return contractsJson;
    }

    if (session?.user) {
      getContracts();
    }
  }, [session?.user]);

  async function claimContract(contractId: string) {
    const claimContractAcceptURL = `owners/${session?.user.id}/contracts/${contractId}/claim`;
    await new Api().post({
      url: claimContractAcceptURL,
      currentUser: session?.user,
    });
    setRefresh((prev) => !prev);
  }

  return (
    <PageBase>
      <ComponentWithSideBar>
        <Card className="w-full overflow-auto">
          <CardHeader className="pb-2">
            <div className="text-xl font-bold">Contratos Propietario</div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="w-full">
              <table className="w-full border-collapse text-left text-base">
                <thead>
                  <tr>
                    <th className="px-6 py-3 font-semibold">Titulo</th>
                    <th className="px-6 py-3 font-semibold">Propietario</th>
                    <th className="px-6 py-3 font-semibold">Inquilino</th>
                    <th className="px-6 py-3 font-semibold">Monto Asegurado</th>
                    <th className="px-6 py-3 font-semibold">Estado</th>
                    <th className="px-6 py-3 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.length === 0 && (
                    <tr className="bg-gray-100/40 dark:bg-gray-800/40">
                      <td
                        className="px-6 py-3 text-center text-gray-500 dark:text-gray-400"
                        colSpan={6}
                      >
                        No tenés ningún contrato como propietario.
                      </td>
                    </tr>
                  )}
                  {contracts.map((contract, index) => (
                    <ContractItem
                      key={contract.id}
                      contract={contract}
                      index={index}
                      claimContract={claimContract}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <Button
            className="absolute bottom-10 right-10 h-10 w-10 rounded-full bg-[color:rgb(3,7,18)] p-2 transition-all hover:scale-125 hover:bg-[color:rgb(3,7,18)] dark:bg-white"
            size="sm"
            variant="outline"
            onClick={() => router.push(contractCreateUrl)}
          >
            <PlusIcon className="h-full w-full text-white dark:text-[color:rgb(3,7,18)]" />
          </Button>
        </Card>
      </ComponentWithSideBar>
    </PageBase>
  );
}
