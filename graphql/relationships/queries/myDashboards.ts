import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyDashboardsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myDashboards", {
      type: "Dashboard",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const dashboards = await prisma.dashboard.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return dashboards;
      },
    });
  },
});
