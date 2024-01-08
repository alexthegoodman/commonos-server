import { objectType } from "nexus";
import { Context } from "../../../context";

export const ProjectType = objectType({
  name: "Project",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });

    t.field("organization", {
      type: "Organization",
      resolve: async (project, __, context: Context) => {
        return await context.prisma.organization.findFirst({
          where: {
            projects: {
              some: {
                id: project.id as string,
              },
            },
          },
        });
      },
    });

    t.field("creator", {
      type: "User",
      resolve: async (project, __, context: Context) => {
        return await context.prisma.user.findFirst({
          where: {
            projects: {
              some: {
                id: project.id as string,
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
