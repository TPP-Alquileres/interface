"use client"

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

import { Api } from '@/javascript/api';
import { Label } from '@/components/ui/label';
import { ContractBody } from '@/components/contract-body';
import ComponentWithSideBar from '@/components/component-with-side-bar';
import PageBase from '@/components/page-base';
import TenantLink from '@/components/tenant-link';
import { ContractState } from '@/utils/contract';

export default function ShowContractPage( { params }: { params: { id: string } } ) {
  const { data: session } = useSession();

  const [ contract, setContract ] = useState(null);
  const [ isLoading, setLoading ] = useState(true);

  const showLink = !!contract && contract.status === ContractState.PENDING && contract.ownerId === session?.user.id;

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

  const renderBody = () => {
    if (isLoading) return <p>Cargando...</p>;

    return (
      <div>
        <div className="w-1/2">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{contract?.description}</h1>
          </div>
          { !!contract && <ContractBody contract={contract} /> }
        </div>
        { showLink && ( <TenantLink contract={contract} /> ) }
      </div>
    );
  };

  return (
    <PageBase>
      <ComponentWithSideBar>
        <div className="p-6 space-y-6 w-full">
          { renderBody() }
        </div>
      </ComponentWithSideBar>
    </PageBase>
  )
}