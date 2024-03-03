import { PrismaClient } from '@prisma/client';
import { IncomingForm } from 'formidable';
import { UserSerializer } from '../serializers/user_serializer';
import { renderError, renderFormErrorIfNecessary } from '../helpers';


export const config = {
  api: {
    bodyParser: false, // Deshabilita el análisis automático de bodyParser en Next.js
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    renderFormErrorIfNecessary( { res, err } );

    const email = fields.email;
    const password = fields.password;
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique( { where: { email, password } } );

    if (!user) {
      renderError( { res, status: 404, message: "Incorrect user or password" } );
      return;
    }

    res.status(200).json( new UserSerializer(user) );
  });
};