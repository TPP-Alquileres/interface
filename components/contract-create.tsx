/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Agg8L7THrmW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ContractCreate(props) {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Cargar un contrato</h1>
        <p className="text-gray-500 dark:text-gray-400">Por favor, ingresá la siguiente información sobre tu contrato, para que podamos generar un link para que el inquilino lo acepte</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre que le vas a dar al contrato</Label>
          <Input id="name" placeholder="Contrato de alquiler de Libertador al 12000" required />
        </div>
        <div className="flex items-center space-x-4">
          <Label
            className="border-dashed border-2 rounded-lg p-4 w-full cursor-pointer flex items-center justify-center"
            htmlFor="file"
          >
            <UploadIcon className="w-6 h-6" />
            <span className="ml-2 text-sm font-medium">Subí el pdf del contrato de alquiler firmado</span>
            <Input className="sr-only" id="file" type="file" />
          </Label>
        </div>
        <div className="grid grid-cols-2 items-start gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Inicio del contrato</Label>
            <Input id="start-date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">Fin del contrato</Label>
            <Input id="end-date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Cantidad de dinero a asegurar</Label>
            <Input id="amount" placeholder="$0.00" step="0.01" type="number" />
          </div>
        </div>
        <Button onClick={props.onGenerateLinkButtonClick}>Generar Link</Button>
      </div>
    </div>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
