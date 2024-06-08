import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from '@/components/icons';

export default function TenantLink( { contract } ) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/contract/pending?contract_id=${String(contract?.id)}`;

  return (
    <div className="mt-2 space-y-2">
      <Label>Link para el inquilino</Label>
      <div className="flex space-x-2" >
        <Input className="w-3/4" type="text" readOnly value={link} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigator.clipboard.writeText(link)}
        >
          <Icons.copy className="h-5 w-5" />
          <span className="sr-only">Copy value</span>
        </Button>
      </div>
    </div>
  )
};
