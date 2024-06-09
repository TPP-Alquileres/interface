import { SignatureData } from "@/pages/api/signature";
import moment from "moment";
import { formatEther } from "viem";

import { pools } from "@/hooks/usePools";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FullContract } from "@/app/contract/pending/page";

interface ContractBodyProps {
  contract?: FullContract;
  signatureData?: SignatureData;
}

export function ContractBody(props: ContractBodyProps) {
  const { contract, signatureData } = props;
  const { owner, tenant, startDate, endDate, amount } = contract || {};
  const { payment = "0", pool: poolAddress } = signatureData || {};

  const pool = pools.find((p) => p.contract.address === poolAddress);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="start-date">Propietario</Label>
        <Input
          className="capitalize"
          id="start-date"
          readOnly
          value={owner?.name}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="start-date">Inquilino</Label>
        <Input
          className="capitalize"
          id="start-date"
          readOnly
          value={tenant?.name || "-"}
        />
      </div>
      <div className="grid grid-cols-2 items-start gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Inicio del contrato</Label>
          <Input
            id="start-date"
            readOnly
            value={moment(startDate).format("DD/MM/YYYY")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">Fin del contrato</Label>
          <Input
            id="end-date"
            readOnly
            value={moment(endDate).format("DD/MM/YYYY")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Monto Asegurado (USD)</Label>
          <Input
            id="amount"
            readOnly
            value={amount}
            placeholder="$0.00"
            type="number"
          />
        </div>

        {signatureData && (
          <div className="grid grid-cols-2 items-start gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Monto a pagar (USD)</Label>
              <Input
                id="payment"
                readOnly
                value={formatEther(BigInt(payment))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">Pool</Label>
              <Input
                id="apy"
                readOnly
                value={`${pool?.name} - ${(pool?.apy || 0) * 100}%`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
