import { objectType } from "nexus";
import { Context } from "../../../context";

export const FunnelType = objectType({
  name: "Funnel",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("context", { type: "JSON" });

    t.field("creator", {
      type: "User",
      resolve: async (funnel, __, context: Context) => {
        // TODO: just get creatorId off funnel?
        return await context.prisma.user.findFirst({
          where: {
            funnels: {
              some: {
                id: funnel.id as string,
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
