import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../_base";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await prisma.user.findUnique({ where: { email: req.headers.user_email } });

  if (!currentUser) {
    return res.status(401).json({ error: 'You must be signed in to view the protected content on this page.' });
  }

  if (req.method === 'GET') {
    const contracts = await prisma.contract.findMany({
      where: { ownerId: currentUser.id}, 
      include: { owner: true, tenant: true }
    });
    res.status(200).json(contracts);
  } else {
    res.status(404).json( { message: "Method not allowed" } );
  }
}