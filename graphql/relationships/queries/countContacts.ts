import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CountContactsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("countContacts", {
      type: "Int",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const contactCount = await prisma.contact.count({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
        });

        return contactCount;
      },
    });
  },
});
