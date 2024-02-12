import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const MyEmailTemplatesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myEmailTemplates", {
      type: "EmailTemplate",
      args: {
        skip: nonNull(intArg()),
        take: nonNull(intArg()),
      },
      resolve: async (
        _,
        { skip, take },
        { prisma, currentUser }: Context,
        x
      ) => {
        // TODO: tie to auth
        const emailtemplates = await prisma.emailTemplate.findMany({
          where: {
            creator: {
              id: currentUser.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
          skip,
          take,
        });

        return emailtemplates;
      },
    });
  },
});
