import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyContactSettingsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("myContactSettings", {
      type: "ContactSettings",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        // TODO: tie to auth
        const contactSettings = await prisma.contactSettings.findFirst({
          where: {
            user: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return contactSettings;
      },
    });
  },
});
