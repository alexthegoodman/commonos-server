import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyContactsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myContacts", {
      type: "Contact",
      args: {
        skip: nonNull(intArg()),
        take: nonNull(intArg()),
      },
      resolve: async (
        _,
        { skip, take },
        { prisma, currentUser }: Context,
        x
      ) => {
        // TODO: tie to auth
        const contacts = await prisma.contact.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
          skip,
          take,
        });

        return contacts;
      },
    });
  },
});
