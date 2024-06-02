"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSession } from "next-auth/react";
import { ContractPending } from "@/components/contract-pending";
import { useSearchParams } from 'next/navigation';
import { Api } from "@/javascript/api";

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

  if ( isLoading || !contract ) return <p>Cargando ...</p>;
  if ( contract?.status === 'ACTIVE' ) return <p>Este contrato ya fue firmado!!</p>;

  return (
    <Suspense>
      <ContractPending 
        contract={contract}
        onSignContractClick={onSignContractClick}
      />
    </Suspense>
  );
}