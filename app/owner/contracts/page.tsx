"use client";

import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutGridIcon, PackageIcon, ShoppingCartIcon } from "lucide-react"
import Link from "next/link"
import ComponentWithSideBar from "@/components/component-with-side-bar"
import ContractItem from "@/components/contract-item"
import { useEffect, useState } from "react"
import { Api } from "@/javascript/api"

export default function Contracts() {
  
  const [contracts, setContracts]  = useState([]);
  const url = "http://localhost:3000/api/owners/1/contracts";
  

    

  useEffect(() => {
    async function getContracts() {
      const contractsJson = await (new Api()).get({url: url});
      console.log("Contracts: " + contractsJson);
      setContracts(contractsJson);
      return contractsJson;
    }
    getContracts();
  }, [])

  // contracts = [{name:"sasa", tenant:"tenant", owner:"owner", amount:"200", status:"Firmado"},
  // {name:"contract2", tenant:"tenant", owner:"owner", amount:"200", status:"Firmado"},
  // {name:"wetrqerr", tenant:"tenant", owner:"owner", amount:"200", status:"Pending"}
  // ];

  console.log("Here are the contractws: " + contracts);


  return (
    
  <div key="1" className="flex min-h-screen w-full">
    <ComponentWithSideBar>
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="text-xl font-bold">Contratos Propietario</div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="overflow-auto w-full max-h-[500px]">
            <table className="w-full text-left border-collapse text-base">
              <thead>
                <tr>
                  <th className="font-semibold px-6 py-3">Titulo</th>
                  <th className="font-semibold px-6 py-3">Propietario</th>
                  <th className="font-semibold px-6 py-3">Inquilino</th>
                  <th className="font-semibold px-6 py-3">Monto Asegurado</th>
                  <th className="font-semibold px-6 py-3">Estado</th>
                  <th className="font-semibold px-6 py-3">Acciones</th>
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
