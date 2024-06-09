import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/pages/api/_base";
import { renderError } from "@/pages/helpers";
import { ContractStatus } from "@/utils/contract";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await prisma.user.findUnique({
    where: { email: req.headers.user_email },
  });

  if (!currentUser) {
    return res.status(401).json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  if (!currentUser.isAdmin) {
    return renderError({ res, status: 403, message: "You are not an admin" });
  }

  try {
    if (req.method === "POST") {
      return postHandler({ currentUser, req, res });
    } else {
      return res.status(404).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error updating contract" });
  }
}

const postHandler = async ({ currentUser, req, res }) => {
  const updatedContract = await prisma.contract.update({
    where: {
      id: String(req.query.contract_id),
    },
    data: {
      status: ContractStatus.CLAIM_DECLINED,
    },
  });
  return res.status(200).json(updatedContract);
};
