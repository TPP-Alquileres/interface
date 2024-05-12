"use client";

import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';

export default function ContractItem({contract, index}: any) {
  const tableRowClassName = index % 2 === 0 ? "bg-gray-100/40 dark:bg-gray-800/40" : "";
  const contractUrl = '/contracts/' + contract.id

  const router = useRouter();
  return (
    <tr key={contract.id} className={tableRowClassName}>
      <td className="px-6 py-3">{contract.description}</td>
      <td className="px-6 py-3">{contract.owner.name}</td>
      <td className="px-6 py-3">{contract.tenant?.name || "-"}</td>
      <td className="px-6 py-3">${contract.amount}</td>
      <td className="px-6 py-3">{contract.status}</td>
      <td className="px-6 py-3">
        <Button size="sm" variant="outline" onClick={() => router.push(contractUrl)}>Ver</Button>
        <Button size="sm" variant="outline">Borrar</Button>
      </td>
    </tr>
  );
}