import { PrismaClient } from '@prisma/client';
import { IncomingForm } from 'formidable';
import { UserSerializer } from '../serializers/user_serializer';

export const config = {
  api: {
    bodyParser: false, // Deshabilita el análisis automático de bodyParser en Next.js
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Form could not be processed" });
      return;
    }

    const email = fields.email;
    const password = fields.password;
    const prisma = new PrismaClient();
    let user = await prisma.user.findUnique( { where: { email: email } } );

    if (!user) {
      user = await prisma.user.create( { data: { password, email } } );
      res.status(200).json( new UserSerializer(user) );
      return;
    }

    res.status(400).json( { error: "User is already created" } );
  });
};