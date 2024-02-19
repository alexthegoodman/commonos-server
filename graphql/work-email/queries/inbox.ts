import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const InboxQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("inbox", {
      type: "Inbox",
      args: {
        inboxId: nonNull(stringArg()),
      },
      resolve: async (_, { inboxId }, { prisma, currentUser }: Context, x) => {
        const inbox = await prisma.inbox.findUnique({
          where: {
            id: inboxId,
            domain: {
              user: {
                id: currentUser.id,
              },
            },
          },
        });

        return inbox;
      },
    });
  },
});
