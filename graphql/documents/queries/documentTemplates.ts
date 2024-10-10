import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const DocumentTemplatesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("documentTemplates", {
      type: "DocumentTemplate",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const documentTemplates = await prisma.documentTemplate.findMany({
          orderBy: {
            createdAt: "asc",
          },
        });

        return documentTemplates;
      },
    });
  },
});
