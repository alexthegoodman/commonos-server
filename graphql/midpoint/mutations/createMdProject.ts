import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateMdProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createMdProject", {
      type: "MdProject",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const newMdProject = await prisma.mdProject.create({
          data: {
            title: "New Project",
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        return newMdProject;
      },
    });
  },
});
