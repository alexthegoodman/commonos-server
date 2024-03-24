import { objectType } from "nexus";
import { Context } from "../../../context";

export const WorkEmailFolderType = objectType({
  name: "WorkEmailFolder",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("name", { type: "String" });

    t.list.field("workEmailTemplates", {
      type: "WorkEmailTemplate",
      resolve: async (folder, __, context: Context) => {
        // TODO: just get creatorId off inbox?
        return await context.prisma.workEmailTemplate.findMany({
          where: {
            workEmailFolder: {
              id: folder.id as string,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    });

    t.field("creator", {
      type: "User",
      resolve: async (folder, __, context: Context) => {
        return await context.prisma.user.findFirst({
          where: {
            workEmailFolders: {
              some: {
                id: folder.id as string,
              },
            },
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
