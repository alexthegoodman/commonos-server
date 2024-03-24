import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyWorkEmailFolderTemplatesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myWorkEmailFolderTemplates", {
      type: "WorkEmailTemplate",
      args: {
        folderId: nonNull(stringArg()),
      },
      resolve: async (_, { folderId }, { prisma, currentUser }: Context, x) => {
        const templates = await prisma.workEmailTemplate.findMany({
          where: {
            workEmailFolder: {
              id: folderId,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return templates;
      },
    });
  },
});
