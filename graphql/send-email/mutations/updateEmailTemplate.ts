import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateEmailTemplateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateEmailTemplate", {
      type: "EmailTemplate",
      args: {
        emailTemplateId: nonNull(stringArg()),
        title: nullable(stringArg()),
        context: nullable(stringArg()),
      },
      resolve: async (
        _,
        { emailTemplateId, title, context },
        { prisma, currentUser }: Context,
        x
      ) => {
        let updateData = {};

        if (title) updateData = { ...updateData, title };
        if (context)
          updateData = { ...updateData, context: JSON.parse(context) };

        const updatedEmailTemplate = await prisma.emailTemplate.update({
          where: {
            id: emailTemplateId,
          },
          data: updateData,
        });

        return updatedEmailTemplate;
      },
    });
  },
});
