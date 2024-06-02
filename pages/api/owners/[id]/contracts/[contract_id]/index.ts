import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../../_base";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await prisma.user.findUnique({ where: { email: req.headers.user_email } });

  if (!currentUser) {
    return res.status(401).json({ error: 'You must be signed in to view the protected content on this page.' });
  }

  if (req.method === 'PUT') {
    const { status } = req.body;
    try {
      const updatedContract = await prisma.contract.update({
        where: { 
          id: String(req.query.contract_id),
          ownerId: currentUser.id
        },
        data: {
          status
        },
      });
      res.json(updatedContract);
    } catch (error) {
      res.status(500).json({ error: 'Error updating contract' });
    }
  } else {
    res.status(404).json( { message: "Method not allowed" } );
  }
}