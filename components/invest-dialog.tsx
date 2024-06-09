import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Address } from "viem";
import { useAccount, useBalance } from "wagmi";

import { useApprove } from "@/hooks/useApprove";
import { Pool, useDeposit } from "@/hooks/usePools";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InvestDialogProps = {
  pool: Pool;
};

export function InvestDialog(props: InvestDialogProps) {
  const { pool } = props;

  const [amount, setAmount] = useState("0");

  const { address } = useAccount();

  const balance = useBalance({
    address,
    token: process.env.NEXT_PUBLIC_MY_TOKEN_ADDRESS as Address,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const {
    needApproval,
    approve,
    isLoading: approveLoading,
  } = useApprove(pool.contract.address, amount);

  const { deposit, isLoading: depositLoading } = useDeposit(pool, amount);

  const isLoading = approveLoading || depositLoading;

  const onClick = () => {
    if (needApproval) {
      approve();
    } else {
      deposit();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Invertir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invertir</DialogTitle>
          <DialogDescription>
            Elegí el monto que queres invertir en el fondo de {pool.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="balance" className="text-right">
              Balance
            </Label>
            <Label id="balance" className="col-span-3">
              {`$${balance.data?.formatted}` || "0.00"}
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Monto
            </Label>
            <Input
              id="name"
              placeholder="$0.00"
              step="1.00"
              type="number"
              className="col-span-3"
              value={amount}
              onChange={onChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onClick} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {needApproval ? "Aprobar" : "Depositar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
