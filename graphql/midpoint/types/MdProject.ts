import { objectType } from "nexus";
import { Context } from "../../../context";

export const MdProjectType = objectType({
  name: "MdProject",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("context", { type: "JSON" });

    t.field("creator", {
      type: "User",
      resolve: async (mdProject, __, context: Context) => {
        return await context.prisma.user.findFirst({
          where: {
            midpointProjects: {
              some: {
                id: mdProject.id as string,
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
