import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyOrganizationsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myOrganizations", {
      type: "Organization",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const organizations = await prisma.organization.findMany({
          where: {
            owner: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return organizations;
      },
    });
  },
});
