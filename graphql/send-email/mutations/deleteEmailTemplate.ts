import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const DeleteEmailTemplateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteEmailTemplate", {
      type: "String",
      args: {
        emailTemplateId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { emailTemplateId },
        { prisma, currentUser }: Context,
        x
      ) => {
        await prisma.emailTemplate.delete({
          where: {
            id: emailTemplateId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        return "DELETED";
      },
    });
  },
});
