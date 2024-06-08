"use client";

import { useEffect, useState } from "react";
import { Api } from "@/javascript/api";
import { Contract } from "@prisma/client";
import { useSession } from "next-auth/react";

import ComponentWithSideBar from "@/components/component-with-side-bar";
import { ContractBody } from "@/components/contract-body";
import PageBase from "@/components/page-base";

export default function ShowContractPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session } = useSession();

  const [contract, setContract] = useState<Contract>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getContract() {
      const contractJson = await new Api().get({
        url: `contracts/${params.id}`,
        currentUser: session?.user,
      });
      setContract(contractJson);
      return contractJson;
    }

    if (session?.user) {
      getContract();
      setLoading(false);
    }
  }, [session?.user, params.id]);

  if (isLoading) return <p>Cargando ...</p>;

  return (
    <PageBase>
      <ComponentWithSideBar>
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{contract?.description}</h1>
          </div>
          {!!contract && <ContractBody contract={contract} />}
        </div>
      </ComponentWithSideBar>
    </PageBase>
  );
}
