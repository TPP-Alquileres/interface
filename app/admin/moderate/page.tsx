"use client";

import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Api } from "@/javascript/api";
import { ContractStatus, ContractStatusToDisplay } from "@/utils/contract";
import { useSession } from "next-auth/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ComponentWithSideBar from "@/components/component-with-side-bar";
import ContractItem from "@/components/contract-item";
import { Icons } from "@/components/icons";
import PageBase from "@/components/page-base";
import { FullContract } from "@/app/contract/pending/page";

export default function AdminContracts() {
  const { data: session } = useSession();
  const router = useRouter();
  const [contracts, setContracts] = useState<FullContract[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filters, setFilters] = useState({
    description: "",
    ownerName: "",
    tenantName: "",
    status: "",
  });
  const [isLoading, setLoading] = useState(false);

  const appliedFilters = Object.values(filters).filter(
    (filter) => !!filter
  ).length;

  const getContracts = useCallback(async () => {
    setLoading(true);

    const contractsJson = await new Api().get({
      url: `admins/${session?.user.id}/contracts`,
      currentUser: session?.user,
    });

    setLoading(false);
    setContracts(contractsJson);
    return contractsJson;
  }, [session?.user]);

  useEffect(() => {
    if (!session?.user.isAdmin) {
      router.push("/home");
    }
  }, [session?.user, router]);

  useEffect(() => {
    if (session?.user) {
      getContracts();
    }
  }, [session?.user, getContracts]);

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
        let sortValue;
        if (sortColumn === "ownerName") {
          sortValue = a.owner.name.localeCompare(b.owner.name);
        } else if (sortColumn === "tenantName") {
          sortValue = a.tenant?.name.localeCompare(b.tenant?.name);
        } else {
          sortValue = a[sortColumn].localeCompare(b[sortColumn]);
        }

        return sortDirection === "asc" ? sortValue : -sortValue;
      });
  }, [contracts, filters, searchTerm, sortColumn, sortDirection]);

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const acceptClaim = async (contractId: string) => {
    setLoading(true);

    await new Api().post({
      url: `admins/${session?.user.id}/contracts/${contractId}/acceptClaim`,
      currentUser: session?.user,
    });

    setLoading(false);
    getContracts();
  };

  const declineClaim = async (contractId: string) => {
    setLoading(true);

    await new Api().post({
      url: `admins/${session?.user.id}/contracts/${contractId}/declineClaim`,
      currentUser: session?.user,
    });

    setLoading(false);
    getContracts();
  };

  const finishContract = async (contractId: string) => {
    setLoading(true);

    await new Api().post({
      url: `admins/${session?.user.id}/contracts/${contractId}/finish`,
      currentUser: session?.user,
    });

    setLoading(false);
    getContracts();
  };

  return (
    <PageBase>
      <ComponentWithSideBar>
        <Card className="w-full overflow-auto">
          <CardHeader className="pb-2">
            <div className="text-xl font-bold">Contratos</div>
          </CardHeader>
          <CardContent className="h-full pt-2">
            <div className="flex w-full items-center gap-4">
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
                        <Badge className="absolute -top-2 h-4 w-4 justify-center p-0">
                          {appliedFilters}
                        </Badge>
                      )}
                      <Icons.filter className="h-4 w-4" />
                    </div>
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] space-y-4 p-4">
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
            <Table className="relative h-full overflow-y-auto">
              <TableHeader className="sticky top-0 z-10 mt-4 bg-[color:rgb(255,255,255)] dark:bg-[color:rgb(3,7,17)]">
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("description")}
                  >
                    Descripción
                    {sortColumn === "description" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("ownerName")}
                  >
                    Propietario
                    {sortColumn === "ownerName" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("tenantName")}
                  >
                    Inquilino
                    {sortColumn === "tenantName" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Estado
                    {sortColumn === "status" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "\u2191" : "\u2193"}
                      </span>
                    )}
                  </TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-hidden">
                {filteredData.map((contract, index) => (
                  <ContractItem
                    key={contract.id}
                    contract={contract}
                    currentUser={session?.user}
                    index={index}
                    showAmount={false}
                    acceptClaim={acceptClaim}
                    declineClaim={declineClaim}
                    finishContract={finishContract}
                    isLoading={isLoading}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </ComponentWithSideBar>
    </PageBase>
  );
}
