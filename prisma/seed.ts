import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import flatten from 'lodash/flatten';
import { Domain } from '../src/types/domain';

const prisma = new PrismaClient();
const RECORDS_PER = 10;

const getBuyer = async (
  email?: string,
  password?: string
): Promise<Prisma.BuyerCreateInput> => {
  const mail = email ?? faker.internet.email();
  const salt = await bcrypt.genSalt(10);
  const passhash = await bcrypt.hash(password ?? mail, salt);

  return {
    email: mail,
    passhash,
    name: faker.name.fullName(),
    line1: faker.address.street(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    payments: {
      create: {
        amount: faker.datatype.number({ min: 2500, max: 20000000 }),
        method: {
          create: {
            type: Domain.PaymentType.CreditCard,
            token: faker.random.numeric(),
          },
        },
      },
    },
  };
};
const getSeller = async (
  email?: string,
  password?: string
): Promise<Prisma.SellerCreateInput> => {
  const mail = email ?? faker.internet.email();
  const salt = await bcrypt.genSalt(10);
  const passhash = await bcrypt.hash(password ?? mail, salt);

  return {
    email: mail,
    passhash,
    name: faker.name.fullName(),
    line1: faker.address.street(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    services: {
      createMany: {
        data: flatten(
          [...Array(RECORDS_PER).keys()].map(() => [
            {
              title: faker.name.jobTitle(),
              description: faker.name.jobDescriptor(),
            },
          ])
        ),
      },
    },
    payouts: {
      create: {
        amount: faker.datatype.number({ min: 2500, max: 20000000 }),
        method: {
          create: {
            type: Domain.PaymentType.CreditCard,
            token: faker.random.numeric(),
          },
        },
      },
    },
  };
};

const getMany = async (callback: () => Promise<any>) => {
  let records = [];

  for (let i = 0; i < RECORDS_PER; i++) {
    let res = await callback();
    records.push(res);
  }

  return records;
};

const main = async () => {
  const buyers: Prisma.BuyerCreateInput[] = await getMany(getBuyer);
  const sellers: Prisma.SellerCreateInput[] = await getMany(getSeller);

  await Promise.all([
    ...buyers.map((data) => prisma.buyer.create({ data })),
    ...sellers.map((data) => prisma.seller.create({ data })),
    prisma.buyer.create({
      data: await getBuyer('buyer@domain.com', 'secretpassword'),
    }),
    prisma.seller.create({
      data: await getSeller('seller@domain.com', 'secretpassword'),
    }),
  ]);

  await prisma.review.createMany({
    data: flatten(
      [...Array(RECORDS_PER).keys()].map(() => [
        {
          title: faker.random.word(),
          rating: faker.datatype.number({ max: 5 }),
          buyerId: faker.datatype.number({ min: 1, max: RECORDS_PER }),
          serviceId: faker.datatype.number({ min: 1, max: RECORDS_PER }),
          sellerId: faker.datatype.number({ min: 1, max: RECORDS_PER }),
        },
      ])
    ),
  });

  await prisma.review.createMany({
    data: flatten(
      [...Array(RECORDS_PER).keys()].map(() => [
        {
          title: faker.random.word(),
          rating: faker.datatype.number({ max: 5 }),
          buyerId: faker.datatype.number({ min: 1, max: RECORDS_PER }),
          serviceId: faker.datatype.number({ min: 1, max: RECORDS_PER }),
          sellerId: faker.datatype.number({ min: 1, max: RECORDS_PER }),
        },
      ])
    ),
  });

  await prisma.transaction.createMany({
    data: flatten(
      [...Array(RECORDS_PER).keys()].map(() => [
        {
          amount: faker.datatype.number({ min: 2500, max: 20000000 }),
          fees: faker.datatype.number({ min: 100, max: 5000 }),
          discounts: faker.datatype.number({ min: 100, max: 5000 }),
          payment: Domain.PaymentType.PayPal,
          buyerId: faker.datatype.number({ min: 1, max: RECORDS_PER }),
          serviceId: faker.datatype.number({ min: 1, max: RECORDS_PER }),
          sellerId: faker.datatype.number({ min: 1, max: RECORDS_PER }),
        },
      ])
    ),
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
