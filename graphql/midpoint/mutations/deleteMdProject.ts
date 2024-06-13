import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const DeleteMdProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteMdProject", {
      type: "String",
      args: {
        projectId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { projectId },
        { prisma, currentUser }: Context,
        x
      ) => {
        await prisma.mdProject.delete({
          where: {
            id: projectId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        return "success";
      },
    });
  },
});
