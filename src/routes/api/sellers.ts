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

const getAllSellers = async () => {
  const data = await prisma.seller.findMany();

  return map(data, (seller) => omit(seller, ['passhash']));
};

const createSeller = async (req: Request) => {
  const { email, password } = req.body;

  const sellerExists = await prisma.seller.findUnique({ where: { email } });
  if (sellerExists) throw Error('Seller already exists');

  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error('Something went wrong generatoring the salt');

  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error('Something went wrong hashing the password');

  const seller = await prisma.seller.create({
    data: { email, passhash: hash },
  });
  if (!seller) throw Error('Failed to create seller');

  return omit(seller, ['passhash']);
};

const getseller = async (req: Request) => {
  const id = Number(req.params.id);
  const seller = await prisma.seller.findUnique({ where: { id } });
  if (!seller) throw Error('Seller does not exist');

  return omit(seller, ['passhash']);
};

export const updateSeller = async (req: Request) => {
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

  const seller = await prisma.seller.update({ where: { id }, data });
  if (!seller) throw Error('Seller does not exist');

  return omit(seller, ['passhash']);
};

router.post('/', requires(['email', 'password']), getResponse(createSeller));
router.get('/', authorize, getResponse(getAllSellers));
router.get('/:id', authorize, getResponse(getseller));
router.patch('/:id', authorize, getResponse(updateSeller));

export default router;
