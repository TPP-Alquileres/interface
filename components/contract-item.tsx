"use client";

import { useRouter } from "next/navigation";
import { Api } from "@/javascript/api";

import { TableCell, TableRow } from "@/components/ui/table";

import { ContractStatus, ContractStatusToDisplay } from "../utils/contract";
import { Button } from "./ui/button";

export default function ContractItem({
  contract,
  currentUser,
  index,
  showAmount = true,
  claim,
  acceptClaim,
  declineClaim,
}: any) {
  const router = useRouter();

  const tableRowClassName =
    index % 2 === 0 ? "bg-gray-100/40 dark:bg-gray-800/40" : "";
  const contractUrl = `/contract/${contract.id}`;

  return (
    <TableRow key={contract.id}>
      <TableCell>{contract.description}</TableCell>
      <TableCell className="capitalize">{contract.owner.name}</TableCell>
      <TableCell className="capitalize">
        {contract.tenant?.name || "-"}
      </TableCell>
      {showAmount && (
        <TableCell className="capitalize">${contract.amount}</TableCell>
      )}
      <TableCell className="capitalize">
        {ContractStatusToDisplay[contract.status]}
      </TableCell>
      <TableCell className="capitalize">
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push(contractUrl)}
        >
          Ver
        </Button>
        {contract.status == ContractStatus.ACTIVE &&
          contract.ownerId === currentUser.id &&
          !currentUser.isAdmin && (
            <Button
              size="sm"
              variant="outline"
              className="ml-2"
              onClick={() => claim(contract.id)}
            >
              Iniciar reclamo
            </Button>
          )}
        {contract.status == ContractStatus.CLAIM && currentUser.isAdmin && (
          <Button
            size="sm"
            variant="outline"
            className="ml-2"
            onClick={() => acceptClaim(contract.id)}
          >
            Aceptar reclamo
          </Button>
        )}
        {contract.status == ContractStatus.CLAIM && currentUser.isAdmin && (
          <Button
            size="sm"
            variant="outline"
            className="ml-2"
            onClick={() => declineClaim(contract.id)}
          >
            Rechazar reclamo
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
