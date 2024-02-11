import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateDashboardMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDashboard", {
      type: "Dashboard",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const newDashboard = await prisma.dashboard.create({
          data: {
            title: "New Dashboard",
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info("newDashboard", newDashboard);

        return newDashboard;
      },
    });
  },
});
