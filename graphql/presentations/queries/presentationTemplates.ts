import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const PresentationTemplatesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("presentationTemplates", {
      type: "PresentationTemplate",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const presentationTemplates =
          await prisma.presentationTemplate.findMany({
            orderBy: {
              createdAt: "asc",
            },
          });

        return presentationTemplates;
      },
    });
  },
});
