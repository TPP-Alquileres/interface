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
        let contract = { 
            ownerId: 10,
            description: "Este es el primer contrato",
            startDate: new Date(2024, 6, 1),
            endDate: new Date(2024, 6, 1),
            ammount:  10.5,
            documentUrl: "hola.com",
            state: ContractState.PENDING
        }
        await prisma.contract.create(
            { 
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
