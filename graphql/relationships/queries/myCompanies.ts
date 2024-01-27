import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyCompaniesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myCompanies", {
      type: "Company",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const companies = await prisma.company.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return companies;
      },
    });
  },
});
