import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const FlowQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("flow", {
      type: "Flow",
      args: {
        flowId: nonNull(stringArg()),
      },
      resolve: async (_, { flowId }, { prisma, currentUser }: Context, x) => {
        const flow = await prisma.flow.findFirst({
          where: {
            id: flowId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        return flow;
      },
    });
  },
});
