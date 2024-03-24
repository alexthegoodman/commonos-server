import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyWorkEmailFoldersQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myWorkEmailFolders", {
      type: "WorkEmailFolder",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const folders = await prisma.workEmailFolder.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return folders;
      },
    });
  },
});
