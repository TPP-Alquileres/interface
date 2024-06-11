import type { NextApiRequest, NextApiResponse } from "next";
import { rentInsuranceAbi } from "@/abis/RentInsurance";
import prisma from "@/pages/api/_base";
import { renderError } from "@/pages/helpers";
import { ContractStatus } from "@/utils/contract";
import { Address, createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await prisma.user.findUnique({
    where: { email: req.headers.user_email?.toString() },
  });

  if (!currentUser) {
    return res.status(401).json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  if (!currentUser.isAdmin) {
    return renderError({ res, status: 403, message: "You are not an admin" });
  }

  try {
    if (req.method === "POST") {
      return postHandler(req, res);
    } else {
      return res.status(404).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error updating contract" });
  }
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contract_id } = req.query;

  const contract = await prisma.contract.findUnique({
    where: { id: String(contract_id) },
  });

  if (!contract) {
    return res.status(404).json({ error: "Contract not found" });
  }

  try {
    const walletClient = createWalletClient({
      chain: sepolia,
      transport: http(),
    });

    const account = privateKeyToAccount(process.env.SIGNER_PK as Address);

    await walletClient.writeContract({
      address: process.env.NEXT_PUBLIC_RENT_INSURANCE_ADDRESS as Address,
      abi: rentInsuranceAbi,
      functionName: "finishInsurance",
      account,
      args: [BigInt(contract?.insuranceId)],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error sending contract tx" });
  }

  const updatedContract = await prisma.contract.update({
    where: {
      id: String(contract_id),
    },
    data: {
      status: ContractStatus.CLOSE,
    },
  });

  return res.status(200).json(updatedContract);
};
