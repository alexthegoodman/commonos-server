import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateDashboardMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateDashboard", {
      type: "Dashboard",
      args: {
        dashboardId: nonNull(stringArg()),
        title: nullable(stringArg()),
        context: nullable(stringArg()),
      },
      resolve: async (
        _,
        { dashboardId, title, context },
        { prisma, currentUser }: Context,
        x
      ) => {
        let updateData = {};

        if (title) updateData = { ...updateData, title };
        if (context)
          updateData = { ...updateData, context: JSON.parse(context) };

        const updatedDashboard = await prisma.dashboard.update({
          where: {
            id: dashboardId,
          },
          data: updateData,
        });

        return updatedDashboard;
      },
    });
  },
});
