"use client";

import { CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutGridIcon, PackageIcon, PlusIcon, ShoppingCartIcon } from "lucide-react"
import Link from "next/link"
import ComponentWithSideBar from "@/components/component-with-side-bar"
import ContractItem from "@/components/contract-item"
import { useEffect, useState } from "react"
import { Api } from "@/javascript/api"
import { useRouter } from 'next/navigation';


export default function Contracts() {
  
  const [contracts, setContracts]  = useState([]);
  const url = "http://localhost:3000/api/owners/1/contracts";
  
  const contractCreateUrl = '/contract/create'

  const router = useRouter();
    

  useEffect(() => {
    async function getContracts() {
      const contractsJson = await (new Api()).get({url: url});
      console.log("Contracts: " + contractsJson);
      setContracts(contractsJson);
      return contractsJson;
    }
    getContracts();
  }, [])


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
              {contracts.length === 0 ? (              <tr className="bg-gray-100/40 dark:bg-gray-800/40">
                <td className="px-6 py-3 text-center text-gray-500 dark:text-gray-400" colSpan={6}>
                  No tenés ningún contrato como propietario.
                </td>
              </tr>) : "" }
                {contracts.map((contract, index) => <ContractItem contract={contract} index={index} />)}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="absolute bottom-10 right-10 p-4">
        <Button className="transition-all hover:scale-125" size="sm" variant="outline" onClick={() => router.push(contractCreateUrl)}>
          <PlusIcon className="h-8 w-8" />
        </Button>
        </CardFooter>
      </Card>
      
    </ComponentWithSideBar>
  </div>
  )
}
