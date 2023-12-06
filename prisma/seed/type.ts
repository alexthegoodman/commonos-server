import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export default async function seedTypes() {
  await prisma.type.createMany({
    data: [
      {
        name: "Create",
        code: "create",
      },
      { name: "Edit", code: "edit" },
    ],
  });

  const types = await prisma.type.findMany();

  // console.info("types", types);

  return {
    types,
  };
}
