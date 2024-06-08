"use client";

import { useEffect, useState } from "react";
import { Api } from "@/javascript/api";
import { ContractStatus } from "@/utils/contract";
import { Contract } from "@prisma/client";
import { useSession } from "next-auth/react";

import ComponentWithSideBar from "@/components/component-with-side-bar";
import { ContractBody } from "@/components/contract-body";
import PageBase from "@/components/page-base";
import TenantLink from "@/components/tenant-link";

export default function ShowContractPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session } = useSession();

  const [contract, setContract] = useState<Contract>();
  const [isLoading, setLoading] = useState(true);

  const showLink =
    !!contract &&
    contract.status === ContractStatus.PENDING &&
    contract.ownerId === session?.user.id;

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

  const renderBody = () => {
    if (isLoading) return <p>Cargando...</p>;

    return (
      <div>
        <div className="w-1/2">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{contract?.description}</h1>
          </div>
          {!!contract && <ContractBody contract={contract} />}
        </div>
        {showLink && <TenantLink contract={contract} />}
      </div>
    );
  };

  return (
    <PageBase>
      <ComponentWithSideBar>
        <div className="w-full space-y-6 p-6">{renderBody()}</div>
      </ComponentWithSideBar>
    </PageBase>
  );
}
