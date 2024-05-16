import moment from "moment"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function ContractBody( { contract } ) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 items-start gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Inicio del contrato</Label>
          <Input id="start-date" readOnly value={moment(contract?.startDate).format("DD/MM/YYYY")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">Fin del contrato</Label>
          <Input id="end-date" readOnly value={moment(contract?.endDate).format("DD/MM/YYYY")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Cantidad de dinero asegurada</Label>
          <Input id="amount" readOnly value={contract?.amount} placeholder="$0.00" step="0.01" type="number" />
        </div>
      </div>
    </div>
  )
}