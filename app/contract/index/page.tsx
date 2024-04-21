
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutGridIcon, PackageIcon, ShoppingCartIcon } from "lucide-react"
import Link from "next/link"
import ComponentWithSideBar from "@/components/component-with-side-bar"
import ContractItem from "@/components/contract-item"
import { useEffect, useState } from "react"
import { Api } from "@/javascript/api"

export default function Contracts() {

  const [contracts, setContracts]  = useState();
  useEffect(async () => {
    const contractsJson = await (new Api()).get({url: "url"});
    setContracts(contractsJson);
  }, [])
  // const contracts = [{name:"sasa", tenant:"tenant", owner:"owner", amount:"200", status:"Firmado"},
  // {name:"contract2", tenant:"tenant", owner:"owner", amount:"200", status:"Firmado"},
  // {name:"wetrqerr", tenant:"tenant", owner:"owner", amount:"200", status:"Pending"}
  // ];

  return (
    
  <div key="1" className="flex min-h-screen w-full">
    <ComponentWithSideBar>
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="text-xl font-bold">Resources</div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="overflow-auto w-full max-h-[500px]">
            <table className="w-full text-left border-collapse text-base">
              <thead>
                <tr>
                  <th className="font-semibold px-6 py-3">Name</th>
                  <th className="font-semibold px-6 py-3">Owner</th>
                  <th className="font-semibold px-6 py-3">Tenant</th>
                  <th className="font-semibold px-6 py-3">Amount</th>
                  <th className="font-semibold px-6 py-3">Status</th>
                  <th className="font-semibold px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, index) => <ContractItem contract={contract} index={index} />)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
    </ComponentWithSideBar>
  </div>
  )
}
