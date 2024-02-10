import { extendType, intArg, list, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const ContactsByIdsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("contactsByIds", {
      type: "Contact",
      args: {
        ids: nonNull(list(nonNull(stringArg()))),
      },
      resolve: async (_, { ids }, { prisma, currentUser }: Context, x) => {
        const contacts = await prisma.contact.findMany({
          where: {
            id: {
              in: ids,
            },
          },
        });

        return contacts;
      },
    });
  },
});
