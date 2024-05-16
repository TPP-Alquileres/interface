import moment from "moment"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ContractBody } from "./contract-body"

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
        <ContractBody contract={contract} />
        <Button onClick={onSignContractClick}>Firmar Documento</Button>
      </div>
    </div>
  )
}
