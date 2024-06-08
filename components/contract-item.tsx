"use client";

import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { ContractStatus } from "../utils/contract";


export default function ContractItem({contract, index, claimContract, claimContractAccept, claimContractDecline}: any) {
  const router = useRouter();

  const tableRowClassName = index % 2 === 0 ? "bg-gray-100/40 dark:bg-gray-800/40" : "";
  const contractUrl = `/contract/${contract.id}`;

  return (
    <tr key={contract.id} className={tableRowClassName}>
      <td className="px-6 py-3">{contract.description}</td>
      <td className="px-6 py-3">{contract.owner.name}</td>
      <td className="px-6 py-3">{contract.tenant?.name || "-"}</td>
      <td className="px-6 py-3">${contract.amount}</td>
      <td className="px-6 py-3">{contract.status}</td>
      <td className="px-6 py-3">
        <Button size="sm" variant="outline" onClick={() => router.push(contractUrl)}>Ver</Button>
        {claimContract && contract.status == ContractStatus.ACTIVE && (
          <Button size="sm" variant="outline" className="ml-2" onClick={() => claimContract(contract.id)}>Iniciar reclamo</Button>
        )}
        {claimContractAccept && (
          <Button size="sm" variant="outline" className="ml-2" onClick={() => claimContractAccept(contract.id)}>Aceptar reclamo</Button>
        )}
        {claimContractDecline && (
          <Button size="sm" variant="outline" className="ml-2" onClick={() => claimContractDecline(contract.id)}>Rechazar reclamo</Button>
        )}
      </td>
    </tr>
  );
}