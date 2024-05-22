import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../_base";
import { ContractState } from "../../../../utils/contract";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await prisma.user.findUnique({ where: { email: req.headers.user_email } });

  if (!currentUser) {
    return res.status(401).json({ error: 'You must be signed in to view the protected content on this page.' });
  }

  if (req.method === 'POST') {
    const contract = await prisma.contract.update({
      where: { id: String(req.query.id) },
      data: { status: ContractState.ACTIVE, tenantId: currentUser.id }
    });
    res.status(200).json(contract);
  } else {
    res.status(404).json({message: "Method not allowed"})
  }
}