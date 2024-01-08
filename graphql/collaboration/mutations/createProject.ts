import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createProject", {
      type: "Project",
      args: {
        title: nonNull(stringArg()),
        organizationId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { title, organizationId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const project = await prisma.project.create({
          data: {
            title,
            organization: {
              connect: {
                id: organizationId,
              },
            },
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        return project;
      },
    });
  },
});
