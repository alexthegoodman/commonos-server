import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateFlowMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateFlow", {
      type: "Flow",
      args: {
        flowId: nonNull(stringArg()),
        questionsContext: nullable(stringArg()),
        resultsContext: nullable(stringArg()),
      },
      resolve: async (
        _,
        { flowId, questionsContext, resultsContext },
        { prisma, currentUser }: Context,
        x
      ) => {
        let updateData = {};

        if (questionsContext)
          updateData = {
            ...updateData,
            questionsContext: JSON.parse(questionsContext),
          };

        if (resultsContext)
          updateData = {
            ...updateData,
            resultsContext: JSON.parse(resultsContext),
          };

        const flow = await prisma.flow.update({
          where: {
            id: flowId,
          },
          data: updateData,
        });

        return flow;
      },
    });
  },
});
