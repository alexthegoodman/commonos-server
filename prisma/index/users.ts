import { PrismaClient } from "@prisma/client";
import algoliasearch, { SearchClient } from "algoliasearch";

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_SERVER_API_KEY as string
);

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.info("users", users);

  users.forEach(async (user) => {
    // const index = algolia.initIndex("users");
    // await index.saveObject({
    //     objectID: id,
    //     email,
    // });

    const publicAlgoliaKey = algolia.generateSecuredApiKey(
      process.env.ALGOLIA_SEARCH_API_KEY as string, // A search key that you keep private
      {
        filters: `visible_by:${user.id} OR visible_by:group/public`,
      }
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        algoliaApiKey: publicAlgoliaKey,
      },
    });
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.info("indexes");
    await prisma.$disconnect();
  });
