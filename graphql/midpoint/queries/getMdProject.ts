import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const GetMdProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getMdProject", {
      type: "MdProject",
      args: {
        projectId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { projectId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const mdProject = await prisma.mdProject.findUnique({
          where: {
            id: projectId,
          },
        });

        return mdProject;
      },
    });
  },
});
