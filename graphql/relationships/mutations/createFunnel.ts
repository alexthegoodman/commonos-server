import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateFunnelMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createFunnel", {
      type: "Funnel",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const newFunnel = await prisma.funnel.create({
          data: {
            title: "New Funnel",
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info("newFunnel", newFunnel);

        return newFunnel;
      },
    });
  },
});
