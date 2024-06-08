import moment from "moment"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ContractBody } from "./contract-body"

export function ContractPending( { contract, currentUser, onSignContractClick } ) {
  const renderFooter = () => {
    if ( contract?.status === 'ACTIVE' ) { return <p>Este contrato ya fue firmado!!</p>; }
    if ( contract?.ownerId === currentUser.id ) { return <p>Vos sos el propietario</p>; }

    return <Button onClick={onSignContractClick}>Firmar Documento</Button>;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Descripción</Label>
        <Input id="name" readOnly value={contract.description}/>
      </div>
      <ContractBody contract={contract} />
      { renderFooter() }
    </div>
  )
};
