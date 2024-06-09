import { useEffect } from "react";
import { insurancePoolAbi } from "@/abis/InsurancePool";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { Address, erc20Abi, erc4626Abi, formatEther, parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useToast } from "@/components/ui/use-toast";

const lowRiskPoolContract = {
  address: process.env.NEXT_PUBLIC_LOW_RISK_ADDRESS as Address,
  abi: erc4626Abi,
} as const;

const mediumRiskPoolContract = {
  address: process.env.NEXT_PUBLIC_MEDIUM_RISK_ADDRESS as Address,
  abi: erc4626Abi,
} as const;

const highRiskPoolContract = {
  address: process.env.NEXT_PUBLIC_HIGH_RISK_ADDRESS as Address,
  abi: erc4626Abi,
} as const;

export type Pool = {
  name: string;
  contract:
    | typeof lowRiskPoolContract
    | typeof mediumRiskPoolContract
    | typeof highRiskPoolContract;
  apy: number;
};

export const pools: Pool[] = [
  {
    name: "Low Risk",
    contract: lowRiskPoolContract,
    apy: 0.1,
  },
  {
    name: "Medium Risk",
    contract: mediumRiskPoolContract,
    apy: 0.13,
  },
  {
    name: "High Risk",
    contract: highRiskPoolContract,
    apy: 0.15,
  },
];

export const usePoolsBalances = () => {
  const { isConnected, address } = useAccount();

  const balancesResult = useReadContracts({
    query: {
      enabled: isConnected && !!address,
    },
    contracts: [
      {
        ...lowRiskPoolContract,
        functionName: "balanceOf",
        args: [address as Address],
      },
      {
        ...mediumRiskPoolContract,
        functionName: "balanceOf",
        args: [address as Address],
      },
      {
        ...highRiskPoolContract,
        functionName: "balanceOf",
        args: [address as Address],
      },
    ],
  });

  const lowRiskBalance = balancesResult.data?.[0].result || BigInt(0);
  const mediumRiskBalance = balancesResult.data?.[1].result || BigInt(0);
  const highRiskBalance = balancesResult.data?.[2].result || BigInt(0);

  const assetsResult = useReadContracts({
    query: {
      enabled: !!address,
    },
    contracts: [
      {
        ...lowRiskPoolContract,
        functionName: "convertToAssets",
        args: [lowRiskBalance],
      },
      {
        ...mediumRiskPoolContract,
        functionName: "convertToAssets",
        args: [mediumRiskBalance],
      },
      {
        ...highRiskPoolContract,
        functionName: "convertToAssets",
        args: [highRiskBalance],
      },
    ],
  });

  const lowRiskAssets = assetsResult.data?.[0].result || BigInt(0);
  const mediumRiskAssets = assetsResult.data?.[1].result || BigInt(0);
  const highRiskAssets = assetsResult.data?.[2].result || BigInt(0);

  return {
    lowRiskBalance,
    lowRiskAssets,
    mediumRiskBalance,
    mediumRiskAssets,
    highRiskBalance,
    highRiskAssets,
  };
};

export const usePoolsTotals = () => {
  const totalResult = useReadContracts({
    contracts: [
      {
        ...lowRiskPoolContract,
        functionName: "totalSupply",
      },
      {
        ...lowRiskPoolContract,
        abi: insurancePoolAbi,
        functionName: "totalLocked",
      },
      {
        ...mediumRiskPoolContract,
        functionName: "totalSupply",
      },
      {
        ...mediumRiskPoolContract,
        abi: insurancePoolAbi,
        functionName: "totalLocked",
      },
      {
        ...highRiskPoolContract,
        functionName: "totalSupply",
      },
      {
        ...highRiskPoolContract,
        abi: insurancePoolAbi,
        functionName: "totalLocked",
      },
    ],
  });

  const lowRiskTotalSupply = totalResult.data?.[0].result || BigInt(0);
  const lowRiskTotalLocked = totalResult.data?.[1].result || BigInt(0);
  const mediumRiskTotalSupply = totalResult.data?.[2].result || BigInt(0);
  const mediumRiskTotalLocked = totalResult.data?.[3].result || BigInt(0);
  const highRiskTotalSupply = totalResult.data?.[4].result || BigInt(0);
  const highRiskTotalLocked = totalResult.data?.[5].result || BigInt(0);

  return {
    lowRiskTotalSupply,
    lowRiskTotalLocked,
    mediumRiskTotalSupply,
    mediumRiskTotalLocked,
    highRiskTotalSupply,
    highRiskTotalLocked,
  };
};

export const useDeposit = (pool: Pool, amount: string) => {
  const { address = "" } = useAccount();
  const { contract, name } = pool;

  const formattedAmount = parseEther(amount);

  const {
    data: hash,
    writeContract,
    isError: isWritingError,
    isPending: isWritingLoading,
    error: writingError,
  } = useWriteContract();

  // Deposit the tokens
  const deposit = () => {
    writeContract({
      address: contract.address,
      abi: contract.abi,
      functionName: "deposit",
      args: [formattedAmount, address as Address],
    });
  };

  // Wait for the transaction to be processed
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  // Adding the transaction to the recent transactions list
  const addRecentTransaction = useAddRecentTransaction();
  const description = `Deposit ${amount} to ${name}`;
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
      toast({
        title: "Éxito",
        description: "Transacción completada",
      });
    }
  }, [isWritingError, isError, writingError, isSuccess, toast]);

  return {
    deposit,
    isLoading: isWritingLoading || isLoading,
    isError: isWritingError || isError,
    isSuccess,
    hash,
  };
};

export const useWithdraw = (pool: Pool, amount: string) => {
  const { address = "" } = useAccount();
  const { contract, name } = pool;

  const formattedAmount = parseEther(amount);

  const {
    data: hash,
    writeContract,
    isError: isWritingError,
    isPending: isWritingLoading,
    error: writingError,
  } = useWriteContract();

  // Withdraw the tokens
  const withdraw = () => {
    writeContract({
      address: contract.address,
      abi: contract.abi,
      functionName: "redeem",
      args: [formattedAmount, address as Address, address as Address],
    });
  };

  // Wait for the transaction to be processed
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  // Adding the transaction to the recent transactions list
  const addRecentTransaction = useAddRecentTransaction();
  const description = `Withdraw ${amount} from ${name}`;
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
      toast({
        title: "Éxito",
        description: "Transacción completada",
      });
    }
  }, [isWritingError, isError, writingError, isSuccess, toast]);

  return {
    withdraw,
    isLoading: isWritingLoading || isLoading,
    isError: isWritingError || isError,
    isSuccess,
    hash,
  };
};
