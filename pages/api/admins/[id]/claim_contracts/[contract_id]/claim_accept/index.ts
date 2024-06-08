import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../../_base";
import { ContractState } from "../../../../../../../utils/contract";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await prisma.user.findUnique({ where: { email: req.headers.user_email } });

  if (!currentUser) {
    return res.status(401).json({ error: 'You must be signed in to view the protected content on this page.' });
  }

  try {
    if (req.method === 'POST') {
      postHandler( { currentUser, req, res } );
    } else {
      res.status(404).json({message: "Method not allowed"})
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating contract' });
  }
};

const postHandler = async ( { currentUser, req, res } ) => { 
  const { status } = req.body;
    const updatedContract = await prisma.contract.update({
      where: { 
        id: String(req.query.contract_id),
      },
      data: {
        status: ContractState.CLAIM_ACCEPTED
      },
    });
    res.json(updatedContract);
}