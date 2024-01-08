import { objectType } from "nexus";
import { Context } from "../../../context";

export const OrganizationType = objectType({
  name: "Organization",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("name", { type: "String" });

    t.list.field("users", {
      type: "User",
      resolve: async (organization, __, context: Context) => {
        return await context.prisma.user.findMany({
          where: {
            memberOrganizations: {
              some: {
                id: organization.id as string,
              },
            },
          },
        });
      },
    });

    t.list.field("projects", {
      type: "Project",
      resolve: async (organization, __, context: Context) => {
        return await context.prisma.project.findMany({
          where: {
            organization: {
              id: organization.id as string,
            },
          },
        });
      },
    });

    t.field("owner", {
      type: "User",
      resolve: async (organization, __, context: Context) => {
        return await context.prisma.user.findFirst({
          where: {
            ownedOrganizations: {
              some: {
                id: organization.id as string,
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
