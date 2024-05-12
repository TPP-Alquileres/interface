import moment from "moment"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ContractPending( { contract, onSignContractClick } ) {
  return (
    <div key="1" className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Contrato</h1>
        <p className="text-gray-500 dark:text-gray-400">Por favor, leer el contrato antes de firmarlo</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Descripción</Label>
          <Input id="name" readOnly value={contract.description}/>
        </div>
        <div className="grid grid-cols-2 items-start gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input id="start-date" readOnly value={moment(contract.startDate).format("DD/MM/YYYY")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input id="end-date" readOnly value={moment(contract.endDate).format("DD/MM/YYYY")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" placeholder="$0.00" readOnly step="0.01" type="number" value={contract.amount} />
          </div>
        </div>
        <Button onClick={onSignContractClick}>Firmar Documento</Button>
      </div>
    </div>
  )
}
