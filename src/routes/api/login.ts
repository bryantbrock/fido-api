import { Request, Router } from 'express';
import { prisma } from '../../utils/prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import capitalize from 'lodash/capitalize';
import omit from 'lodash/omit';
import { requires } from '../../middleware/requires';
import { getResponse } from '../../utils/getResponse';

const router = Router();

const getIndividual = async (individual: string, email: string) => {
  switch (individual) {
    case 'buyer':
      return await prisma.buyer.findUnique({ where: { email } });
    case 'seller':
      return await prisma.seller.findUnique({ where: { email } });
    default:
      throw Error('Invalid individual passed as param');
  }
};

const login = async (req: Request) => {
  const { JWT_SECRET } = process.env;
  const tokenLifetime = process.env.DEV_MODE ? 3600000 : 3600;

  const individual = await getIndividual(req.params.individual, req.body.email);
  if (!individual)
    throw Error(`${capitalize(req.params.individual)} does not exist`);

  const isMatch = await bcrypt.compare(req.body.password, individual.passhash);
  if (!isMatch) throw Error('Invalid credentials');

  const token = jwt.sign(
    { id: individual.id, individual: req.params.individual },
    JWT_SECRET!,
    {
      expiresIn: tokenLifetime,
    }
  );
  if (!token) throw Error('Could not sign the token');

  return { token, [req.params.individual]: omit(individual, ['passhash']) };
};

router.post(
  '/:individual',
  requires(['email', 'password']),
  getResponse(login)
);

export default router;
