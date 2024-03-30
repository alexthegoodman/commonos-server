import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const WorkEmailTemplateQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("workEmailTemplate", {
      type: "WorkEmailTemplate",
      args: {
        templateId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { templateId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const template = await prisma.workEmailTemplate.findUnique({
          where: {
            id: templateId,
            workEmailFolder: {
              creator: {
                id: currentUser.id,
              },
            },
          },
        });

        return template;
      },
    });
  },
});
