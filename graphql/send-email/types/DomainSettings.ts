import { objectType } from "nexus";
import { Context } from "../../../context";

export const DomainSettingsType = objectType({
  name: "DomainSettings",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("domainName", { type: "String" });
    t.field("dkimData", { type: "JSON" });

    t.field("user", {
      type: "User",
      resolve: async (domainsettings, __, context: Context) => {
        // TODO: just get creatorId off domainsettings?
        return await context.prisma.user.findFirst({
          where: {
            domainSettings: {
              id: domainsettings.id as string,
            },
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
