import type { NextApiRequest, NextApiResponse } from "next";
import { renderError } from "@/pages/helpers";

import { ContractStatus } from "../../../../../utils/contract";
import prisma from "../../../_base";

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
    renderError({ res, status: 403, message: "You are not an admin" });
    return;
  }

  if (req.method === "GET") {
    return getHandler({ currentUser, req, res });
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
}

const getHandler = async ({ currentUser, req, res }) => {
  const contracts = await prisma.contract.findMany({
    include: { owner: true, tenant: true },
  });

  res.status(200).json(contracts);
};
