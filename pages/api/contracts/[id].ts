import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../_base";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await new Promise(r => setTimeout(r, 2000));
    if (req.method === 'GET') {
        // Validate data from post
        const contract = await prisma.contract.findUnique({
            where: {
              id: String(req.query.id),
            }
        })
        res.status(200).json(contract)
    } if (req.method === 'PUT') {
        const contract = await prisma.contract.update({
            where: {
              id: String(req.query.id)
            },
            data: req.body
        })
        res.status(200).json(contract)

    } else {

    }
}