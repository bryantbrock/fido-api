import { Request, Router } from 'express';
import bcrypt from 'bcryptjs';
import omit from 'lodash/omit';
import map from 'lodash/map';
import pick from 'lodash/pick';
import { authorize } from '../../middleware/authorize';
import { requires } from '../../middleware/requires';
import { prisma } from '../../utils/prismaClient';
import { getResponse } from '../../utils/getResponse';

const router = Router();

export const getAllBuyers = async () => {
  const data = await prisma.buyer.findMany();

  return map(data, (buyer) => omit(buyer, ['passhash']));
};

export const createBuyer = async (req: Request) => {
  const { email, password } = req.body;

  const buyerExists = await prisma.buyer.findUnique({ where: { email } });
  if (buyerExists) throw Error('Buyer already exists');

  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error('Something went wrong generatoring the salt');

  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error('Something went wrong hashing the password');

  const buyer = await prisma.buyer.create({ data: { email, passhash: hash } });
  if (!buyer) throw Error('Failed to create buyer');

  return omit(buyer, ['passhash']);
};

export const getBuyer = async (req: Request) => {
  const id = Number(req.params.id);
  const buyer = await prisma.buyer.findUnique({ where: { id } });
  if (!buyer) throw Error('Buyer does not exist');

  return omit(buyer, ['passhash']);
};

export const updateBuyer = async (req: Request) => {
  const id = Number(req.params.id);
  const data = pick(req.body, [
    'email',
    'name',
    'line1',
    'line2',
    'city',
    'state',
    'zip',
  ]);

  const buyer = await prisma.buyer.update({ where: { id }, data });
  if (!buyer) throw Error('Buyer does not exist');

  return omit(buyer, ['passhash']);
};

router.post('/', requires(['email', 'password']), getResponse(createBuyer));
router.get('/', authorize, getResponse(getAllBuyers));
router.get('/:id', authorize, getResponse(getBuyer));
router.patch('/:id', authorize, getResponse(updateBuyer));

export default router;
