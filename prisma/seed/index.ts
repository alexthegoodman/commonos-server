import seedUsers from "./user";
import clean from "./clean";

import { PrismaClient } from "@prisma/client";
import seedTypes from "./type";

const prisma = new PrismaClient();

async function main() {
  const { users } = await seedUsers();
  const { types } = await seedTypes();
}

clean()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.info("cleaned");
    // reload
    main()
      .catch((e) => console.error(e))
      .finally(async () => {
        console.info("populated");
        await prisma.$disconnect();
      });
  });
