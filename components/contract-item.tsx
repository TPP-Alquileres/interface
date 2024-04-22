"use client";

import { Button } from "./ui/button";

export default function ContractItem({contract, index}: any) {
    const tableRowClassName = index % 2 === 0 ? "bg-gray-100/40 dark:bg-gray-800/40" : "";
    
    return (
        
    <tr className={tableRowClassName}>
        <td className="px-6 py-3">{contract.name}</td>
        <td className="px-6 py-3">{contract.owner}</td>
        <td className="px-6 py-3">{contract.tenant}</td>
        <td className="px-6 py-3">${contract.amount}</td>
        <td className="px-6 py-3">{contract.status}</td>
        <td className="px-6 py-3">
          <Button size="sm" variant="outline">
            Editar
          </Button>
          <Button size="sm" variant="outline">
            Borrar
          </Button>
        </td>
      </tr>
    );
}