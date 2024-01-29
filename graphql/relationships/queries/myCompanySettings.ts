import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyCompanySettingsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("myCompanySettings", {
      type: "CompanySettings",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const companySettings = await prisma.companySettings.findFirst({
          where: {
            user: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return companySettings;
      },
    });
  },
});
