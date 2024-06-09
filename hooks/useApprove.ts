import { useEffect } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { Address, erc20Abi, parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useToast } from "@/components/ui/use-toast";

export const useApprove = (spender: string, amount: string) => {
  const { address = "" } = useAccount();

  // Check if the contract is already approved
  const allowanceResult = useReadContract({
    query: {
      enabled: !!address,
    },
    abi: erc20Abi,
    address: process.env.NEXT_PUBLIC_MY_TOKEN_ADDRESS as Address,
    functionName: "allowance",
    args: [address as Address, spender as Address],
  });

  const {
    data: allowance = BigInt(0),
    isLoading: allowanceLoading,
    refetch,
  } = allowanceResult;

  const formattedAmount = parseEther(amount);
  const needApproval = allowance ? formattedAmount > allowance : true;

  const {
    data: hash,
    writeContract,
    isError: isWritingError,
    isPending: isWritingLoading,
    error: writingError,
  } = useWriteContract();

  // Approve the contract to spend the tokens
  const approve = () => {
    writeContract({
      address: process.env.NEXT_PUBLIC_MY_TOKEN_ADDRESS as Address,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender as Address, formattedAmount],
    });
  };

  // Wait for the transaction to be processed
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  // Adding the transaction to the recent transactions list
  const addRecentTransaction = useAddRecentTransaction();
  const description = `Approve ${amount} to ${spender}`;
  useEffect(() => {
    if (hash) {
      addRecentTransaction({
        hash,
        description,
      });
    }
  }, [hash, description, addRecentTransaction]);

  // Show transactions notifications
  const { toast } = useToast();
  useEffect(() => {
    if (isWritingError) {
      const message =
        writingError?.message?.split("\n")[0] ||
        "Error simulando la transacción";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } else if (isError) {
      toast({
        title: "Error",
        description: "La transacción ha fallado",
        variant: "destructive",
      });
    } else if (isSuccess) {
      refetch();
      toast({
        title: "Éxito",
        description: "Transacción completada",
      });
    }
  }, [isWritingError, isError, writingError, isSuccess, toast, refetch]);

  return {
    approve,
    isLoading: isWritingLoading || isLoading || allowanceLoading,
    isError: isWritingError || isError,
    isSuccess,
    hash,
    allowance,
    needApproval,
  };
};
