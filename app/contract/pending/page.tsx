"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { ContractPending } from "@/components/contract-pending";
import { Api } from "@/javascript/api";
import ComponentWithSideBar from '@/components/component-with-side-bar';
import PageBase from '@/components/page-base';

export default function PendingContractPage() {
  const { data: session } = useSession();
  const [ contract, setContract ] = useState(null);
  const [ isLoading, setLoading ] = useState(true);
  const searchParams = useSearchParams();
  const contractId = String(searchParams?.get('contract_id'));

  useEffect(() => {
    async function getContract() {
      const contractJson = await (new Api()).get( { 
        url: `contracts/${contractId}`, currentUser: session?.user
      } );
      setContract(contractJson);
      return contractJson;
    };

    if ( session?.user ) {
      getContract();
      setLoading(false);
    }
  }, [ session?.user ] );

  const onSignContractClick = async () =>  {
    setLoading(true);

    const contractJson = await (new Api()).post( { 
      url: `contracts/${contractId}/sign`, currentUser: session?.user
    } );

    setContract(contractJson);
    setLoading(false);
  }

  const showContract = !isLoading && !!contract;

  const renderContract = () => {
    if ( isLoading || !contract ) return <p>Cargando...</p>;

    return (
      <ContractPending
        contract={contract}
        currentUser={session?.user}
        onSignContractClick={onSignContractClick}
      />
    );
  };

  return (
    <PageBase>
      <ComponentWithSideBar>
        <div key="1" className="p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Contrato</h1>
            { showContract && <p className="text-gray-500 dark:text-gray-400">Por favor, leer el contrato antes de firmarlo</p> }
          </div>
          { renderContract() }
        </div>
      </ComponentWithSideBar>
    </PageBase>
  );
}