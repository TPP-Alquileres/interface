"use client";

import { useSession } from "next-auth/react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGridIcon, PackageIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import ContractItem from "@/components/contract-item";
import { useEffect, useState } from "react";
import { Api } from "@/javascript/api";
import PageBase from "@/components/page-base";

export default function InvestorInvestments() {
  const { data: session } = useSession();
  const [contracts, setContracts]  = useState([]);
  const url = `tenants/${session?.user.id}/contracts`;

  useEffect(() => {
    async function getContracts() {
      const contractsJson = await (new Api()).get( { url, currentUser: session.user } );
      setContracts(contractsJson);
      return contractsJson;
    }

    if ( session?.user ) {
      getContracts();
    }
  }, [ session?.user ] );

  return (
    <PageBase>
      <ComponentWithSideBar>
        <Card className="w-full overflow-auto">
          <CardHeader className="pb-2">
            <div className="text-xl font-bold">Productos para invertir</div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="overflow-auto w-full max-h-[500px]">
              <table className="w-full text-left border-collapse text-base">
                <thead>
                  <tr>
                    <th className="font-semibold px-6 py-3">Titulo</th>
                    <th className="font-semibold px-6 py-3">Descripción</th>
                    <th className="font-semibold px-6 py-3">Tasa de interés anual</th>
                    <th className="font-semibold px-6 py-3">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                   <tr key={0} className={"bg-gray-100/40 dark:bg-gray-800/40"}>
                   <td className="px-6 py-3">Low risk pool</td>
                   <td className="px-6 py-3">Este pool tiene como objetivo encapsular a los inquilinos mas confiables</td>
                   <td className="px-6 py-3">10%</td>
                   <td className="px-6 py-3">
                     <Button size="sm" variant="outline">Invertir</Button>
                   </td>
                 </tr>
                  }
                  { 
                   <tr key={0} className={"bg-gray-100/40 dark:bg-gray-800/40"}>
                   <td className="px-6 py-3">Mid risk pool</td>
                   <td className="px-6 py-3">Este pool tiene como objetivo encapsular a los inquilinos confiables y nuevos</td>
                   <td className="px-6 py-3">13%</td>
                   <td className="px-6 py-3">
                     <Button size="sm" variant="outline">Invertir</Button>
                   </td>
                 </tr>
                  }
{ 
                   <tr key={0} className={"bg-gray-100/40 dark:bg-gray-800/40"}>
                   <td className="px-6 py-3">High risk pool</td>
                   <td className="px-6 py-3">Este pool tiene como objetivo encapsular a los con menos información, si bien el riesgo es bajo, hay mas incertidumbre </td>
                   <td className="px-6 py-3">15%</td>
                   <td className="px-6 py-3">
                     <Button size="sm" variant="outline">Invertir</Button>
                   </td>
                 </tr>
                  }

                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </ComponentWithSideBar>
    </PageBase>
  )
}