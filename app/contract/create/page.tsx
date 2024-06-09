"use client";

import { useAccount } from "wagmi";

import { useCreateContract } from "@/hooks/useCreateContract";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import { ContractCreate } from "@/components/contract-create";
import PageBase from "@/components/page-base";
import TenantLink from "@/components/tenant-link";

export default function CreateContractPage() {
  const { isConnected } = useAccount();

  const { create, contract, isLoading, isConfirming } = useCreateContract();

  const showHeader = !isLoading && !isConfirming && isConnected && !contract;

  const renderPage = () => {
    if (!isConnected) {
      return <p className="pt-4">Conecta tu wallet para crear el contrato</p>;
    }

    if (isLoading) return <p className="pt-4">Cargando...</p>;

    if (isConfirming) return <p className="pt-4">Confirmando...</p>;

    if (!!contract) return <TenantLink contract={contract} />;

    return <ContractCreate onGenerateLinkButtonClick={create} />;
  };

  return (
    <PageBase>
      <ComponentWithSideBar>
        <div className="w-full space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Crear contrato</h1>
            {showHeader && (
              <p className="text-gray-500 dark:text-gray-400">
                Por favor, ingresá la siguiente información sobre tu contrato,
                para que podamos generar un link para que el inquilino lo acepte
              </p>
            )}
            {renderPage()}
          </div>
        </div>
      </ComponentWithSideBar>
    </PageBase>
  );
}
