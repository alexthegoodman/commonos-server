import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import { v4 as uuidv4 } from "uuid";

export const GenerateContentApiKeyMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("generateContentApiKey", {
      type: "ContentDevelopersSettings",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const apiKey = uuidv4();

        const newSettings = await prisma.contentDevelopersSettings.update({
          where: {
            userId: currentUser.id,
          },
          data: {
            apiKey,
          },
        });

        console.info("newSettings", newSettings);

        return newSettings;
      },
    });
  },
});
