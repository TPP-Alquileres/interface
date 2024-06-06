import moment from "moment"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ContractBody } from "./contract-body"

export function ContractPending( { contract, onSignContractClick } ) {
  // if ( contract?.status === 'ACTIVE' ) return <p>Este contrato ya fue firmado!!</p>;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Descripción</Label>
        <Input id="name" readOnly value={contract.description}/>
      </div>
      <ContractBody contract={contract} />
      { contract?.status === 'ACTIVE' ? <p>Este contrato ya fue firmado!!</p> : <Button onClick={onSignContractClick}>Firmar Documento</Button> }
    </div>
  )
}
