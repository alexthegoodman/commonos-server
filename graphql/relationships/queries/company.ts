import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CompanyQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("company", {
      type: "Company",
      args: {
        companyId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { companyId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const company = await prisma.company.findUnique({
          where: {
            id: companyId,
          },
        });

        return company;
      },
    });
  },
});
