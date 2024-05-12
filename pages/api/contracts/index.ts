import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../_base";
import { ContractState } from "../../../utils/contract";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await prisma.user.findUnique({ where: { email: req.headers.user_email } });

  if (!currentUser) {
    return res.status(401).json({ error: 'You must be signed in to view the protected content on this page.' });
  }

  if (req.method === 'POST') {
    const description = req.body["description"];
    const startDate = req.body["start_date"];
    const endDate = req.body["end_date"];
    const amount = Number(req.body["amount"]);
    const documentUrl = req.body["document_url"];

    const contract = { ownerId: currentUser.id, description, startDate: new Date(startDate), endDate: new Date(endDate),
      amount, documentUrl, status: ContractState.PENDING
    };
    const response = await prisma.contract.create({ data: contract });
    res.status(200).json(response);
  } else if (req.method === 'GET') {
    const contracts = await prisma.contract.findMany({ where: { ownerId: currentUser.id } });
    res.status(200).json(contracts)
  } else {
    res.status(404).json({message: "Method not allowed"})
  }
}