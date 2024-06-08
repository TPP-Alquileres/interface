import type { NextApiRequest, NextApiResponse } from "next";

import { ContractStatus } from "../../../utils/contract";
import prisma from "../_base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await prisma.user.findUnique({
    where: { email: req.headers.user_email },
  });

  if (!currentUser) {
    return res.status(401).json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  if (req.method === "POST") {
    postHandler({ currentUser, req, res });
  } else if (req.method === "GET") {
    getHandler({ currentUser, res });
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
}

const postHandler = async ({ currentUser, req, res }) => {
  if (currentUser.isAdmin) {
    res.status(400).json({ message: "You are an admin" });
    return;
  }

  const description = req.body["description"];
  const startDate = req.body["start_date"];
  const endDate = req.body["end_date"];
  const amount = Number(req.body["amount"]);
  const documentUrl = req.body["document_url"] || "";

  try {
    const contract = {
      ownerId: currentUser.id,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      amount,
      documentUrl,
      status: ContractStatus.PENDING,
    };
    const response = await prisma.contract.create({ data: contract });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getHandler = async ({ currentUser, res }) => {
  const contracts = await prisma.contract.findMany({
    where: { OR: [{ ownerId: currentUser.id }, { tenantId: currentUser.id }] },
  });
  res.status(200).json(contracts);
};
