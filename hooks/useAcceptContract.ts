import { useEffect, useState } from "react";
import { rentInsuranceAbi } from "@/abis/RentInsurance";
import { Api } from "@/javascript/api";
import { SignatureData } from "@/pages/api/signature";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import { Address } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { useToast } from "@/components/ui/use-toast";
import { FullContract } from "@/app/contract/pending/page";

export const useAcceptContract = (
  onSign: (contract: FullContract) => void,
  data?: SignatureData
) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isLoading, setLoading] = useState(false);

  const { contractId, insuranceId, payment, pool, signature } = data || {};

  const { data: hash, writeContractAsync } = useWriteContract();

  const {
    isSuccess,
    isError,
    isLoading: isConfirming,
  } = useWaitForTransactionReceipt({ hash });

  // Adding the transaction to the recent transactions list
  const addRecentTransaction = useAddRecentTransaction();
  const description = `Seguro de alquiler aceptado`;
  useEffect(() => {
    if (hash) {
      addRecentTransaction({
        hash,
        description,
      });
    }
  }, [hash, description, addRecentTransaction]);

  // Show transactions notifications
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "La transacción ha fallado",
        variant: "destructive",
      });
    } else if (isSuccess) {
      toast({
        title: "Éxito",
        description: "Transacción completada",
      });
    }
  }, [isError, isSuccess, toast]);

  const accept = async () => {
    setLoading(true);

    try {
      await writeContractAsync({
        address: process.env.NEXT_PUBLIC_RENT_INSURANCE_ADDRESS as Address,
        abi: rentInsuranceAbi,
        functionName: "acceptInsurance",
        args: [
          BigInt(insuranceId || 0),
          BigInt(payment || 0),
          pool as Address,
          signature as Address,
        ],
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Error al crear la transaccción.",
        variant: "destructive",
      });
      return;
    }

    try {
      const contractResponse = await new Api().post({
        url: `contracts/${contractId}/sign`,
        currentUser: session?.user,
        body: {
          payment,
          pool,
        },
      });

      onSign(contractResponse);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Error al aceptar el contrato.",
        variant: "destructive",
      });
      return;
    }

    setLoading(false);
  };

  return {
    accept,
    isLoading,
    isConfirming,
  };
};
