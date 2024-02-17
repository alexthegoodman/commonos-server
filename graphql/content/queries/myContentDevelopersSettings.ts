import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyContentDevelopersSettingsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("myContentDevelopersSettings", {
      type: "ContentDevelopersSettings",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const settings = await prisma.contentDevelopersSettings.findFirst({
          where: {
            userId: currentUser.id,
          },
        });

        return settings;
      },
    });
  },
});
