import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../_base";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const contracts = await prisma.contract.findMany({
      where: { tenantId: req.query["id"] }
    });
    res.status(200).json(contracts);
  } else {
    res.status(404).json( { message: "Method not allowed" } );
  }
}