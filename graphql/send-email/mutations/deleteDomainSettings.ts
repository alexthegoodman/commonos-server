import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const DeleteDomainSettingsMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteDomainSettings", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma, currentUser, awsSES }: Context, x) => {
        const existingSettings = await prisma.domainSettings.findFirst({
          where: {
            user: {
              id: currentUser.id,
            },
          },
        });

        if (!existingSettings) {
          throw new Error("Domain settings not found");
        }

        const deletedIdentity = await awsSES.deleteEmailIdentity(
          existingSettings.domainName
        );

        if (!deletedIdentity) {
          throw new Error("Failed to delete domain identity");
        }

        await prisma.domainSettings.delete({
          where: {
            id: existingSettings.id,
          },
        });

        return "deleted";
      },
    });
  },
});
