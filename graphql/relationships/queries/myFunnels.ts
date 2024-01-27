import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyFunnelsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myFunnels", {
      type: "Funnel",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const funnels = await prisma.funnel.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return funnels;
      },
    });
  },
});
