import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const prisma = new PrismaClient()
  // const user = await prisma.user.create({
  //   data: { password, email },
  // })

  if (req.method === 'POST') {
    res.status(200).json({ user: { email, password } });
  } else {
    res.status(404).json({ text: 'Not found' });
  }
}