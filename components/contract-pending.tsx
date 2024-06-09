import { SignatureData } from "@/pages/api/signature";
import { ContractStatus } from "@/utils/contract";
import { DefaultUser } from "next-auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FullContract } from "@/app/contract/pending/page";

import { ContractBody } from "./contract-body";

interface ContractPendingProps {
  contract: FullContract;
  currentUser?: DefaultUser;
  onSignContractClick: () => void;
  needApproval: boolean;
  signatureData?: SignatureData;
}

export function ContractPending(props: ContractPendingProps) {
  const {
    contract,
    currentUser,
    onSignContractClick,
    needApproval,
    signatureData,
  } = props;

  const renderFooter = () => {
    if (contract?.status === ContractStatus.ACTIVE) {
      return <p>Este contrato ya fue firmado!!</p>;
    }
    if (contract?.ownerId === currentUser?.id) {
      return <p>Vos sos el propietario</p>;
    }

    return (
      <Button onClick={onSignContractClick}>
        {needApproval ? "Aprobar" : "Firmar Documento"}
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Descripción</Label>
        <Input id="name" readOnly value={contract.description} />
      </div>
      <ContractBody contract={contract} signatureData={signatureData} />
      {renderFooter()}
    </div>
  );
}
