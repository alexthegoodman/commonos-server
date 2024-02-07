import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const DashboardQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("dashboard", {
      type: "Dashboard",
      args: {
        dashboardId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { dashboardId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const dashboard = await prisma.dashboard.findUnique({
          where: {
            id: dashboardId,
          },
        });

        return dashboard;
      },
    });
  },
});
