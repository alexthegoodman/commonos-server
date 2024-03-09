import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyInboxEmailThreadsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myInboxEmailThreads", {
      type: "Thread",
      args: {
        inboxId: nonNull(stringArg()),
      },
      resolve: async (_, { inboxId }, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const threads = await prisma.thread.findMany({
          where: {
            inbox: {
              id: inboxId,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return threads;
      },
    });
  },
});
