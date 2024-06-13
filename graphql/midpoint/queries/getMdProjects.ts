import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const GetMdProjectsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getMdProjects", {
      type: "MdProject",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const mdProjects = await prisma.mdProject.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        });

        return mdProjects;
      },
    });
  },
});
