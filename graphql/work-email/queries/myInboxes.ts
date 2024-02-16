import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyInboxesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myInboxes", {
      type: "Inbox",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const inboxes = await prisma.inbox.findMany({
          where: {
            domain: {
              user: {
                id: currentUser.id,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return inboxes;
      },
    });
  },
});
