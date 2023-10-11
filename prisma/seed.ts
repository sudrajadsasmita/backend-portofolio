import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashPassword: string = await bcrypt.hash('uwik1718097', 10);
  const user1 = await prisma.user.create({
    data: {
      username: 'sudrajadds',
      email: 'sudrajad.dwi@gmail.com',
      password: hashPassword,
      profile: {
        create: {
          name: 'Sudrajad Dwi Sasmita',
          birth_date: '1998-03-31',
        },
      },
    },
  });
  const user2 = await prisma.user.create({
    data: {
      username: 'sudrajadsasmita',
      email: 'sudrajad.sasmita@gmail.com',
      password: hashPassword,
      profile: {
        create: {
          name: 'Sudrajad Dwi Sasmita',
          birth_date: '1998-03-31',
        },
      },
    },
  });
  console.log({
    user1,
    user2,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
