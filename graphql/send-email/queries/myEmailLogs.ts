import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyEmailLogsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myEmailLogs", {
      type: "EmailLog",
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
        const emaillogs = await prisma.emailLog.findMany({
          where: {
            sender: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
          skip,
          take,
        });

        return emaillogs;
      },
    });
  },
});
