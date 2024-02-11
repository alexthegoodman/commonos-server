import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateFunnelMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateFunnel", {
      type: "Funnel",
      args: {
        funnelId: nonNull(stringArg()),
        title: nullable(stringArg()),
        context: nullable(stringArg()),
      },
      resolve: async (
        _,
        { funnelId, title, context },
        { prisma, currentUser }: Context,
        x
      ) => {
        let updateData = {};

        if (title) updateData = { ...updateData, title };
        if (context)
          updateData = { ...updateData, context: JSON.parse(context) };

        const updatedFunnel = await prisma.funnel.update({
          where: {
            id: funnelId,
          },
          data: updateData,
        });

        return updatedFunnel;
      },
    });
  },
});
