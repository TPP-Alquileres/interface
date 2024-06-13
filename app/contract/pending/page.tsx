"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Api } from "@/javascript/api";
import { SignatureData } from "@/pages/api/signature";
import { Contract, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

import { useAcceptContract } from "@/hooks/useAcceptContract";
import { useApprove } from "@/hooks/useApprove";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import { ContractPending } from "@/components/contract-pending";
import PageBase from "@/components/page-base";

export type FullContract = Contract & { owner: User; tenant?: User };

export default function PendingContractPage() {
  const { data: session } = useSession();
  const { address } = useAccount();

  const [contract, setContract] = useState<FullContract>();
  const [signatureData, setSignature] = useState<SignatureData>();
  const [contractLoading, setContractLoading] = useState(true);
  const [signatureLoading, setSignatureLoading] = useState(true);

  const searchParams = useSearchParams();
  const contractId = String(searchParams?.get("contract_id"));

  useEffect(() => {
    async function getContract() {
      const contractJson = await new Api().get({
        url: `contracts/${contractId}`,
        currentUser: session?.user,
      });
      setContract(contractJson);
      setContractLoading(false);
      return contractJson;
    }

    async function getSignature() {
      const signatureJson = await new Api().get({
        url: `signature?contractId=${contractId}&address=${address}`,
        currentUser: session?.user,
      });
      setSignature(signatureJson);
      setSignatureLoading(false);
      return signatureJson;
    }

    if (session?.user) {
      getContract();
      if (!!address) {
        getSignature();
      }
    }
  }, [session?.user, contractId, address]);

  const onSign = (updatedContract: FullContract) => {
    setContract(updatedContract);
  };

  const { payment = "0" } = signatureData || {};

  const insuranceAddress = process.env
    .NEXT_PUBLIC_RENT_INSURANCE_ADDRESS as string;

  const {
    needApproval,
    approve,
    isLoading: approveLoading,
  } = useApprove(insuranceAddress, formatEther(BigInt(payment)));

  const { accept, isLoading: acceptLoading } = useAcceptContract(
    onSign,
    signatureData
  );

  const onClick = () => {
    if (needApproval) {
      approve();
    } else {
      accept();
    }
  };

  const showContract =
    !contractLoading &&
    !signatureLoading &&
    !acceptLoading &&
    !approveLoading &&
    !!contract;

  const renderContract = () => {
    if (!address)
      return <p className="pt-4">Conecta tu wallet para crear el contrato</p>;

    if (
      contractLoading ||
      signatureLoading ||
      acceptLoading ||
      approveLoading ||
      !contract
    )
      return <p>Cargando...</p>;

    return (
      <ContractPending
        contract={contract}
        currentUser={session?.user}
        onSignContractClick={onClick}
        needApproval={needApproval}
        signatureData={signatureData}
      />
    );
  };

  return (
    <PageBase>
      <ComponentWithSideBar>
        <div key="1" className="space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Contrato</h1>
            {showContract && (
              <p className="text-gray-500 dark:text-gray-400">
                Por favor, leer el contrato antes de firmarlo
              </p>
            )}
          </div>
          {renderContract()}
        </div>
      </ComponentWithSideBar>
    </PageBase>
  );
}
