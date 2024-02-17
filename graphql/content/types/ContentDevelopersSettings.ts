import { objectType } from "nexus";
import { Context } from "../../../context";

export const ContentDevelopersSettingsType = objectType({
  name: "ContentDevelopersSettings",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("apiKey", { type: "String" });

    t.field("user", {
      type: "User",
      resolve: async (settings, __, context: Context) => {
        // TODO: just get creatorId off domainsettings?
        return await context.prisma.user.findFirst({
          where: {
            contentDevelopersSettings: {
              id: settings.id as string,
            },
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
