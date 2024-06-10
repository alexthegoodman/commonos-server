import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateMdProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateMdProject", {
      type: "MdProject",
      args: {
        projectId: nonNull(stringArg()),
        title: nullable(stringArg()),
        context: nullable(stringArg()),
      },
      resolve: async (
        _,
        { projectId, title, context },
        { prisma, currentUser }: Context,
        x
      ) => {
        let updateData: any = {};

        if (title) updateData.title = title;
        if (context) updateData.context = JSON.parse(context);

        const updatedMdProject = await prisma.mdProject.update({
          where: {
            id: projectId,
          },
          data: updateData,
        });

        return updatedMdProject;
      },
    });
  },
});
