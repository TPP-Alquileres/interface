import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../_base";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        // Validate data from post
        const contract = await prisma.contract.findUnique({
            where: {
              id: "0fbfa422-ed97-4d0f-99b6-cc05c7750f33",
            }
        })

        res.status(200).json(contract)
    } if (req.method === 'PUT') {

    } else {

    }
}
