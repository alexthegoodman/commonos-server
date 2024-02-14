import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyDomainSettingsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("myDomainSettings", {
      type: "DomainSettings",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const domainSettings = await prisma.domainSettings.findFirst({
          where: {
            user: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return domainSettings;
      },
    });
  },
});
