import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyFlowQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myFlows", {
      type: "Flow",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const flows = await prisma.flow.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return flows;
      },
    });
  },
});
