import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const FunnelQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("funnel", {
      type: "Funnel",
      args: {
        funnelId: nonNull(stringArg()),
      },
      resolve: async (_, { funnelId }, { prisma, currentUser }: Context, x) => {
        const funnel = await prisma.funnel.findUnique({
          where: {
            id: funnelId,
          },
        });

        return funnel;
      },
    });
  },
});
