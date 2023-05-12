import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const guardAvatars = [
  'https://images.unsplash.com/photo-1547355332-c590834bbbb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1616088526047-3fb4c4436cca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzN8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1640936346777-fcf8fac307cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzYyNjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE1MzExNDA&ixlib=rb-4.0.3&q=80&w=400',
  'https://images.unsplash.com/photo-1641810635290-04b9dbd21a21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA2fHxzZWN1cml0eSUyMGd1YXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1605071483252-41904a888644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxzZWN1cml0eSUyMGd1YXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/flagged/photo-1591463634506-044d049b2fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzYyNjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE1MzE4MzA&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1545650002-3d2d5ac7f375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzYyNjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE1MzE4MzE&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1592348283512-f40aef178d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzYyNjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE1MzE4MzI&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1587647069256-6ec77c96c2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1541214184964-d90ddf59c88b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1552622594-f27a9f6103a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1637145088610-8a2c526495fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
];

const guardedAvatars = [
  'https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzYyNjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE1MzE4MzA&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzYyNjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE1MzE4MzE&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1631064094188-7762262a8cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzYyNjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE1MzE4MzI&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1543267570-95d78122e7e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzYyNjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE1MzE4MzM&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzYyNjV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE1MzE4MzM&ixlib=rb-4.0.3&q=80&w=1080',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHNob3QlMjBwcm9mZXNzaW9uYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhlYWRzaG90JTIwcHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
];

const guardOccupations = [
  'Homewood Police',
  'Birmingham Police',
  'Bessemer Police',
  'Hoover Police',
  'Tuscaloosa Police',
  'Security Guard',
  'Army',
  'Navy',
  'Marines',
  'Private Investigator',
  'Bodyguard',
  'Individual',
  'Ex-police',
];

const cities = [
  'Birmingham',
  'Tuscaloosa',
  'Hoover',
  'Homewood',
  'Bessemer',
  'Vestavia',
  'Mountain Brook',
  'Cahaba Heights',
  'Fairfield',
  'Fultondale',
  'Gardendale',
  'Graysville',
  'Hueytown',
  'Irondale',
  'Kimberly',
  'Leeds',
  'Lipscomb',
  'Midfield',
  'Morris',
  'Mount Olive',
];

async function main() {
  for (let i = 0; i < guardAvatars.length; i++) {
    const guardEmail = faker.internet.email();
    const guardedEmail = faker.internet.email();
    const guardPasshash = faker.internet.password();
    const guardedPasshash = faker.internet.password();
    const guardAvatar = guardAvatars[i];
    const guardedAvatar = faker.helpers.arrayElement(guardedAvatars);

    const newGuard = await prisma.guard.create({
      data: {
        email: guardEmail,
        passhash: guardPasshash,
        name: faker.name.fullName(),
        line1: faker.address.streetAddress(),
        line2: faker.address.secondaryAddress(),
        city: faker.helpers.arrayElement(cities),
        state: 'Alabama',
        zip: faker.address.zipCodeByState('AL'),
        rate: faker.datatype.number({ min: 1500, max: 4000 }),
        occupation: faker.helpers.arrayElement(guardOccupations),
        avatar: guardAvatar,
        avgRating: faker.datatype.float({ min: 3, max: 5, precision: 0.1 }),
        bio: faker.lorem.paragraph(),
      },
    });

    await prisma.guardFeatures.create({
      data: {
        guard: { connect: { id: newGuard.id } },
        yearsOfMilitaryExpeirence: faker.datatype.number({ min: 0, max: 20 }),
        hasGeoTrackingEnabled: faker.datatype.boolean(),
        hasMicrophoneEnabled: faker.datatype.boolean(),
        hasBodyCamEnabled: faker.datatype.boolean(),
        hasInsurance: faker.datatype.boolean(),
        hasBackgroundCheck: faker.datatype.boolean(),
        hasASRBCertification: faker.datatype.boolean(),
        hasAPOSTCertification: faker.datatype.boolean(),
        hasCprCertification: faker.datatype.boolean(),
        hasFirstAidCertification: faker.datatype.boolean(),
        hasOwnTransportation: faker.datatype.boolean(),
        hasOwnWeapon: faker.datatype.boolean(),
        hasOwnUniform: faker.datatype.boolean(),
      },
    });

    const newGuarded = await prisma.guarded.create({
      data: {
        email: guardedEmail,
        passhash: guardedPasshash,
        name: faker.name.fullName(),
        line1: faker.address.streetAddress(),
        line2: faker.address.secondaryAddress(),
        city: faker.helpers.arrayElement(cities),
        state: 'Alabama',
        zip: faker.address.zipCodeByState('AL'),
        avatar: guardedAvatar,
        avgRating: faker.datatype.float({ min: 3, max: 5, precision: 0.1 }),
      },
    });

    // Generate a Hire record for each Guard and Guarded
    const startDateTime = faker.date.recent();
    const endDateTime = faker.date.future(0, startDateTime);

    await prisma.hire.create({
      data: {
        amount: faker.datatype.number({ min: 100, max: 1000 }),
        fees: faker.datatype.number({ min: 10, max: 50 }),
        discounts: faker.datatype.number({ min: 5, max: 30 }),
        payment: faker.finance.transactionType(),
        startDateTime,
        endDateTime,
        guardId: newGuard.id,
        guardedId: newGuarded.id,
        line1: faker.address.streetAddress(),
        city: faker.helpers.arrayElement(cities),
        state: 'Alabama',
        zip: faker.address.zipCodeByState('AL'),
      },
    });

    // Generate Review records for each Guard
    for (let j = 0; j < faker.datatype.number({ min: 0, max: 5 }); j++) {
      await prisma.review.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          rating: faker.datatype.number({ min: 1, max: 5 }),
          guardId: newGuard.id,
          guardedId: newGuarded.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
