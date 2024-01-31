import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CountCompaniesQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("countCompanies", {
      type: "Int",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const companyCount = await prisma.company.count({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
        });

        return companyCount;
      },
    });
  },
});
