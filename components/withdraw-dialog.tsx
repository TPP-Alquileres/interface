import { useState } from "react";
import { Loader2 } from "lucide-react";
import { formatEther } from "viem";

import { Pool, useWithdraw } from "@/hooks/usePools";
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

type WithdrawDialogProps = {
  pool: Pool;
  balance: bigint;
};

export function WithdrawDialog(props: WithdrawDialogProps) {
  const { pool, balance } = props;

  const [amount, setAmount] = useState("0");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const { withdraw, isLoading } = useWithdraw(pool, amount);

  const onClick = () => {
    withdraw();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Retirar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Retirar</DialogTitle>
          <DialogDescription>
            Elegi el monto que queres retirar del {pool.name} pool
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="balance" className="text-right">
              Balance
            </Label>
            <Label id="balance" className="col-span-3">
              {`$${formatEther(balance)}` || "0.00"}
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
            Retirar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
