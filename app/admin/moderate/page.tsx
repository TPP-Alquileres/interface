"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Api } from "@/javascript/api";
import { ContractStatus, ContractStatusToDisplay } from "@/utils/contract";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import ContractItem from "@/components/contract-item";
import { Icons } from "@/components/icons";
import PageBase from "@/components/page-base";

export default function AdminContracts() {
  const { data: session } = useSession();
  const router = useRouter();
  const [contracts, setContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filters, setFilters] = useState({
    description: "",
    ownerName: "",
    tenantName: "",
    status: "",
  });

  const appliedFilters = Object.values(filters).filter(
    (filter) => !!filter
  ).length;

  const getContracts = async () => {
    const contractsJson = await new Api().get({
      url: `admins/${session.user.id}/contracts`,
      currentUser: session.user,
    });
    setContracts(contractsJson);
    return contractsJson;
  };

  useEffect(() => {
    if (!session?.user.isAdmin) {
      router.push("/home");
    }
  }, [session?.user]);

  useEffect(() => {
    if (session?.user) {
      getContracts();
    }
  }, [session?.user]);

  const filteredData = useMemo(() => {
    return contracts
      .filter((contract) => {
        const descriptionMatch = !!filters.description
          ? contract.description
              .toLowerCase()
              .includes(filters.description.toLowerCase())
          : true;
        const ownerMatch = !!filters.ownerName
          ? contract.owner.name
              .toLowerCase()
              .includes(filters.ownerName.toLowerCase())
          : true;
        const tenantMatch = !!filters.tenantName
          ? contract.tenant?.name
              .toLowerCase()
              .includes(filters.tenantName.toLowerCase())
          : true;
        const statusMatch = !!filters.status
          ? contract.status.includes(filters.status)
          : true;
        return descriptionMatch && ownerMatch && statusMatch && tenantMatch;
      })
      .filter((contract) => {
        if (searchTerm.length === 0) return true;

        const descriptionMatch = contract.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const ownerMatch = contract.owner.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const tenantMatch = !!contract.tenant?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return descriptionMatch || ownerMatch || tenantMatch;
      })
      .sort((a, b) => {
        const sortValue = a[sortColumn].localeCompare(b[sortColumn]);
        return sortDirection === "asc" ? sortValue : -sortValue;
      });
  }, [contracts, filters, searchTerm, sortColumn, sortDirection]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const claimContractAccept = async (contractId) => {
    const claimContractAcceptURL = `admins/${session.user.id}/claim_contracts/${contractId}/accept`;
    await new Api().post({
      url: claimContractAcceptURL,
      currentUser: session.user,
    });
    getContracts();
  };

  const claimContractDecline = async (contractId) => {
    const claimContractDeclineURL = `admins/${session.user.id}/claim_contracts/${contractId}/decline`;
    await new Api().post({
      url: claimContractDeclineURL,
      currentUser: session.user,
    });
    getContracts();
  };

  return (
    <PageBase>
      <ComponentWithSideBar>
        <Card className="w-full overflow-auto">
          <CardHeader className="pb-2">
            <div className="text-xl font-bold">Contratos</div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="w-full flex items-center gap-4">
              <Input
                type="search"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearch}
                className="flex-1"
                autoFocus
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <div className="relative">
                      {appliedFilters > 0 && (
                        <Badge className="absolute justify-center -top-2 p-0 h-4 w-4">
                          {appliedFilters}
                        </Badge>
                      )}
                      <Icons.filter className="h-4 w-4" />
                    </div>
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-filter">Estado</Label>
                    <Select
                      onValueChange={(value) =>
                        handleFilterChange(
                          "status",
                          value === "Estado" ? "" : value
                        )
                      }
                      value={filters.status === "" ? "Estado" : filters.status}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          key="default-status-option"
                          className="cursor-pointer"
                          value="Estado"
                        >
                          Estado
                        </SelectItem>
                        {Object.keys(ContractStatus).map((key, index) => (
                          <SelectItem
                            key={key}
                            className="cursor-pointer"
                            value={key}
                            onClick={() => handleFilterChange("status", key)}
                          >
                            {ContractStatusToDisplay[key]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-filter">Descripción</Label>
                    <Input
                      id="description-filter"
                      type="text"
                      placeholder="Filtrar por descripción..."
                      value={filters.description}
                      onChange={(e) =>
                        handleFilterChange("description", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-filter">Propietario</Label>
                    <Input
                      id="owner-name-filter"
                      type="text"
                      placeholder="Filtrar por propietario..."
                      value={filters.ownerName}
                      onChange={(e) =>
                        handleFilterChange("ownerName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-filter">Inquilino</Label>
                    <Input
                      id="tenant-filter"
                      type="text"
                      placeholder="Filtrar por inquilino..."
                      value={filters.tenantName}
                      onChange={(e) =>
                        handleFilterChange("tenantName", e.target.value)
                      }
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <table className="w-full text-left border-collapse text-base">
              <thead>
                <tr>
                  <th className="font-semibold px-6 py-3">Descripción</th>
                  <th className="font-semibold px-6 py-3">Propietario</th>
                  <th className="font-semibold px-6 py-3">Inquilino</th>
                  <th className="font-semibold px-6 py-3">Fecha de creación</th>
                  <th className="font-semibold px-6 py-3">Estado</th>
                  <th className="font-semibold px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 && (
                  <tr className="bg-gray-100/40 dark:bg-gray-800/40">
                    <td
                      className="px-6 py-3 text-center text-gray-500 dark:text-gray-400"
                      colSpan={6}
                    >
                      No hay contratos con esos filtros
                    </td>
                  </tr>
                )}
                {filteredData.map((contract, index) => (
                  <ContractItem
                    key={contract.id}
                    contract={contract}
                    index={index}
                    claimContractAccept={claimContractAccept}
                    claimContractDecline={claimContractDecline}
                  />
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </ComponentWithSideBar>
    </PageBase>
  );
}
