import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../_base";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await new Promise(r => setTimeout(r, 2000));
    if (req.method === 'GET') {
        let tenantId = Number(req.query["id"])
        const contracts = await prisma.contract.findMany({
            where: {
                tenantId: tenantId
            }
        })
        res.status(200).json(contracts)
    } else {
        res.status(404).json({message: "Method not allowed"})
    }
}