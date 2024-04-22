import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../_base";

enum ContractState {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    CLOSE = "CLOSE"
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        
        // Validate data from post
        let ownerId = req.body["owner_id"]
        let description = req.body["description"]
        let startDate = req.body["start_date"]
        let endDate = req.body["end_date"]
        let ammount = req.body["ammount"]
        let documentUrl = req.body["document_url"]
        
        console.log(ownerId)
        let contract = { 
            ownerId: ownerId,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            ammount:  ammount,
            documentUrl: documentUrl,
            state: ContractState.PENDING
        }
        await prisma.contract.create({ 
                data: contract
            })
        res.status(200).json(contract)
    } else if (req.method === 'GET') {
        let ownerId = 10
        const contracts = await prisma.contract.findMany({
            where: {
              ownerId: ownerId
            }
        })
        res.status(200).json(contracts)
    } else {
        res.status(404).json({message: "Method not allowed"})
    }
}