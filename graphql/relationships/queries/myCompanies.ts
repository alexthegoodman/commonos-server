import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyCompaniesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myCompanies", {
      type: "Company",
      args: {
        skip: nonNull(intArg()),
        take: nonNull(intArg()),
      },
      resolve: async (
        _,
        { skip, take },
        { prisma, currentUser }: Context,
        x
      ) => {
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
          skip,
          take,
        });

        return companies;
      },
    });
  },
});
