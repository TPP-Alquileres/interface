import moment from "moment";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContractBody({ contract }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="start-date">Propietario</Label>
        <Input
          className="capitalize"
          id="start-date"
          readOnly
          value={contract?.owner?.name}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="start-date">Inquilino</Label>
        <Input
          className="capitalize"
          id="start-date"
          readOnly
          value={contract?.tenant?.name || "-"}
        />
      </div>
      <div className="grid grid-cols-2 items-start gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Inicio del contrato</Label>
          <Input
            id="start-date"
            readOnly
            value={moment(contract?.startDate).format("DD/MM/YYYY")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">Fin del contrato</Label>
          <Input
            id="end-date"
            readOnly
            value={moment(contract?.endDate).format("DD/MM/YYYY")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Monto Asegurado (usd)</Label>
          <Input
            id="amount"
            readOnly
            value={contract?.amount}
            placeholder="$0.00"
            type="number"
          />
        </div>
      </div>
    </div>
  );
}
