import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const EmailTemplateQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("emailTemplate", {
      type: "EmailTemplate",
      args: {
        emailTemplateId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { emailTemplateId },
        { prisma, currentUser }: Context,
        x
      ) => {
        const emailtemplate = await prisma.emailTemplate.findUnique({
          where: {
            id: emailTemplateId,
          },
        });

        return emailtemplate;
      },
    });
  },
});
