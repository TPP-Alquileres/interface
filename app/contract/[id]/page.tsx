"use client"

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { Api } from '@/javascript/api';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input"
import { ContractBody } from '@/components/contract-body';

export default function ShowContractPage( { params }: { params: { id: string } } ) {
  const { data: session } = useSession();

  const [ contract, setContract ] = useState(null);
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
    async function getContract() {
      const contractJson = await (new Api()).get( { 
        url: `contracts/${params.id}`, currentUser: session?.user
      } );
      setContract(contractJson);
      return contractJson;
    };

    if ( session?.user ) {
      getContract();
      setLoading(false);
    }
  }, [ session?.user ] );

  if (isLoading) return <p>Cargando ...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{contract?.description}</h1>
      </div>
      <ContractBody contract={contract} />
    </div>
  )
}