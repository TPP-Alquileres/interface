import type { NextApiRequest, NextApiResponse } from "next";

import { ContractStatus } from "../../../../utils/contract";
import prisma from "../../_base";

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
    if (currentUser.isAdmin) {
      return res.status(400).json({ message: "You are an admin" });
    }

    const contract = await prisma.contract.findUnique({
      where: { id: String(req.query.id) },
    });

    if (contract?.ownerId === currentUser.id) {
      return res.status(400).json({ message: "You are the owner" });
    }

    const updatedContract = await prisma.contract.update({
      where: { id: String(req.query.id) },
      data: { status: ContractStatus.ACTIVE, tenantId: currentUser.id },
      include: { owner: true, tenant: true },
    });
    return res.status(200).json(updatedContract);
  } else {
    return res.status(404).json({ message: "Method not allowed" });
  }
}
