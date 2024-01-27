import { objectType } from "nexus";
import { Context } from "../../../context";

export const DashboardType = objectType({
  name: "Dashboard",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("context", { type: "JSON" });

    t.field("creator", {
      type: "User",
      resolve: async (dashboard, __, context: Context) => {
        // TODO: just get creatorId off dashboard?
        return await context.prisma.user.findFirst({
          where: {
            dashboards: {
              some: {
                id: dashboard.id as string,
              },
            },
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
