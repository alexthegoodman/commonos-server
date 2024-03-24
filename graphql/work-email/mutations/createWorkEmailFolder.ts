import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateWorkEmailFolderMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createWorkEmailFolder", {
      type: "WorkEmailFolder",
      args: {
        name: nonNull(stringArg()),
      },
      resolve: async (_, { name }, { prisma, currentUser }: Context, x) => {
        const newFolder = await prisma.workEmailFolder.create({
          data: {
            name,
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info("newFolder", newFolder);

        return newFolder;
      },
    });
  },
});
