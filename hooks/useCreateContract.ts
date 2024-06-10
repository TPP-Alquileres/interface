import { useEffect, useState } from "react";
import { rentInsuranceAbi } from "@/abis/RentInsurance";
import { Api } from "@/javascript/api";
import { Contract } from "@prisma/client";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import { Address, parseEther } from "viem";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useToast } from "@/components/ui/use-toast";

type GenerateLinkParams = {
  startDate: any;
  endDate: any;
  amount: any;
  description: any;
};

export const useCreateContract = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [contract, setContract] = useState<Contract>();
  const [isLoading, setLoading] = useState(false);

  const { data: hash, writeContractAsync } = useWriteContract();

  const { data: insuranceId } = useReadContract({
    address: process.env.NEXT_PUBLIC_RENT_INSURANCE_ADDRESS as Address,
    abi: rentInsuranceAbi,
    functionName: "insuranceCounter",
  });

  const {
    isSuccess,
    isError,
    isLoading: isConfirming,
  } = useWaitForTransactionReceipt({ hash });

  // Adding the transaction to the recent transactions list
  const addRecentTransaction = useAddRecentTransaction();
  const description = `Creación de contrato de seguro de alquiler`;
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

  const create = async (values: GenerateLinkParams) => {
    const { startDate, endDate, amount, description } = values;

    const durationInSeconds =
      (Number(new Date(endDate)) - Number(new Date(startDate))) / 1000;

    setLoading(true);

    try {
      await writeContractAsync({
        address: process.env.NEXT_PUBLIC_RENT_INSURANCE_ADDRESS as Address,
        abi: rentInsuranceAbi,
        functionName: "initializeInsurance",
        args: [
          parseEther(BigInt(amount).toString()),
          BigInt(durationInSeconds),
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

    const body = {
      description,
      startDate,
      endDate,
      amount,
      insuranceId: insuranceId?.toString(),
    };

    try {
      const contractResponse = await new Api().post({
        url: "contracts",
        currentUser: session?.user,
        body,
      });

      setContract(contractResponse);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Error al crear el contrato.",
        variant: "destructive",
      });
      return;
    }

    setLoading(false);
  };

  return {
    create,
    contract,
    isLoading,
    isConfirming,
  };
};
