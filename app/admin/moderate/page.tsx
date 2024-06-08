"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Api } from "@/javascript/api";
import { useSession } from "next-auth/react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import ContractItem from "@/components/contract-item";
import PageBase from "@/components/page-base";

export default function OwnerContracts() {
  const { data: session } = useSession();
  const [contracts, setContracts] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to control refresh
  const claimContractsUrl = `admins/${session?.user.id}/claim_contracts`;

  useEffect(() => {
    async function getContracts() {
      const contractsJson = await new Api().get({
        url: claimContractsUrl,
        currentUser: session.user,
      });
      setContracts(contractsJson);
      return contractsJson;
    }

    if (session?.user) {
      getContracts();
    }
  }, [session?.user, refresh]);

  async function claimContractAccept(contractId) {
    const claimContractAcceptURL = `admins/${session?.user.id}/claim_contracts/${contractId}/accept`;
    await new Api().post({
      url: claimContractAcceptURL,
      currentUser: session.user,
    });
    setRefresh((prev) => !prev);
  }

  async function claimContractDecline(contractId) {
    const claimContractDeclineURL = `admins/${session?.user.id}/claim_contracts/${contractId}/decline`;
    await new Api().post({
      url: claimContractDeclineURL,
      currentUser: session.user,
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
              <table className="w-full text-left border-collapse text-base">
                <thead>
                  <tr>
                    <th className="font-semibold px-6 py-3">Descripción</th>
                    <th className="font-semibold px-6 py-3">Propietario</th>
                    <th className="font-semibold px-6 py-3">Inquilino</th>
                    <th className="font-semibold px-6 py-3">Monto Asegurado</th>
                    <th className="font-semibold px-6 py-3">Estado</th>
                    <th className="font-semibold px-6 py-3">Acciones</th>
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
                      claimContractAccept={claimContractAccept}
                      claimContractDecline={claimContractDecline}
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
