"use client"

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { ContractPending } from "@/components/contract-pending";
import { useSearchParams } from 'next/navigation';
import { Api } from "@/javascript/api";

export default function PendingContractPage() {
  const { data: session } = useSession();
  const [ contract, setContract ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const searchParams = useSearchParams();
  const contractId = String(searchParams.get('contract_id'));

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
  }, [session?.user] );

  const onSignContractClick = () =>  {
    setLoading(true);
    fetch(`/api/contracts/${contractId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "tenantId": 2,
        "status": "ACTIVE"
      }),
    }).then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
    });
  }

  if ( loading || !contract ) return <p>Cargando ...</p>;
  if ( contract?.status === 'ACTIVE' ) return <p>Este contrato ya fue firmado!!</p>;

  return (
    <ContractPending 
      contract={contract}
      onSignContractClick={onSignContractClick}
    />
  );
}