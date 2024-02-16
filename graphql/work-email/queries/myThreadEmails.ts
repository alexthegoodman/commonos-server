import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyThreadEmailsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myThreadEmails", {
      type: "Email",
      args: {
        threadId: nonNull(stringArg()),
      },
      resolve: async (_, { threadId }, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const emails = await prisma.email.findMany({
          where: {
            thread: {
              id: threadId,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return emails;
      },
    });
  },
});
