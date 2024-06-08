"use client";

import { useEffect, useState } from "react";
import { Api } from "@/javascript/api";
import { Contract } from "@prisma/client";
import { useSession } from "next-auth/react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import ContractItem from "@/components/contract-item";
import PageBase from "@/components/page-base";

export default function TenantContracts() {
  const { data: session } = useSession();
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const url = `tenants/${session?.user.id}/contracts`;

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

  return (
    <PageBase>
      <ComponentWithSideBar>
        <Card className="w-full overflow-auto">
          <CardHeader className="pb-2">
            <div className="text-xl font-bold">Contratos Inquilino</div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="max-h-[500px] w-full overflow-auto">
              <table className="w-full border-collapse text-left text-base">
                <thead>
                  <tr>
                    <th className="px-6 py-3 font-semibold">Descripción</th>
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
                        No tenés ningún contrato como inquilino.
                      </td>
                    </tr>
                  )}
                  {contracts.map((contract, index) => (
                    <ContractItem
                      key={contract.id}
                      contract={contract}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </ComponentWithSideBar>
    </PageBase>
  );
}
