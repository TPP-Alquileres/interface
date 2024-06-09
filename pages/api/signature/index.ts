import { NextApiRequest, NextApiResponse } from "next";
import {
  Address,
  createWalletClient,
  encodeAbiParameters,
  http,
  keccak256,
  parseAbiParameters,
  parseEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

import { pools } from "@/hooks/usePools";

import prisma from "../_base";

export type SignatureData = {
  contractId: string;
  sender: string;
  insuranceId: string;
  pool: string;
  payment: string;
  signature: string;
};

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

  if (req.method === "GET") {
    const { contractId, address } = req.query;

    const contract = await prisma.contract.findUnique({
      where: { id: String(contractId) },
    });

    const {
      insuranceId = "0",
      amount = 0,
      startDate,
      endDate,
    } = contract || {};

    const duration = Number(endDate) - Number(startDate);
    const durationInSeconds = duration / 1000;
    const yearInSeconds = 60 * 60 * 24 * 365;

    const pool = pools[0]; // TODO: Assign a pool to the user

    const payment = amount * pool.apy * (durationInSeconds / yearInSeconds);
    const formattedPayment = parseEther(payment.toString());

    const walletClient = createWalletClient({
      chain: mainnet,
      transport: http(),
    });

    const account = privateKeyToAccount(process.env.SIGNER_PK as Address);

    // Encode and double hash the message
    const encodedMessage = encodeAbiParameters(
      parseAbiParameters("address, uint256, uint256, address"),
      [
        address as Address,
        BigInt(insuranceId),
        formattedPayment,
        pool.contract.address,
      ]
    );

    const messageHash = keccak256(keccak256(encodedMessage));

    const signature = await walletClient.signMessage({
      account,
      message: { raw: messageHash },
    });

    res.status(200).json({
      contractId,
      sender: address,
      insuranceId,
      pool: pool.contract.address,
      payment: formattedPayment.toString(),
      signature,
    });
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
}
