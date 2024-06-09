import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

import { ContractStatus } from "../../../utils/contract";
import prisma from "../_base";

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

  if (req.method === "POST") {
    postHandler(req, res, currentUser);
  } else if (req.method === "GET") {
    getHandler(res, currentUser);
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
}

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  currentUser: User
) => {
  if (currentUser.isAdmin) {
    res.status(400).json({ message: "You are an admin" });
    return;
  }

  const {
    description,
    startDate,
    endDate,
    amount,
    documentUrl = "",
    insuranceId,
  } = req.body;

  try {
    const contract = {
      ownerId: currentUser.id,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      amount,
      documentUrl,
      status: ContractStatus.PENDING,
      insuranceId,
    };
    const response = await prisma.contract.create({ data: contract });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getHandler = async (res: NextApiResponse, currentUser: DefaultUser) => {
  const contracts = await prisma.contract.findMany({
    where: { OR: [{ ownerId: currentUser.id }, { tenantId: currentUser.id }] },
  });
  res.status(200).json(contracts);
};
