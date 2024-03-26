import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateWorkEmailTemplateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateWorkEmailTemplate", {
      type: "WorkEmailTemplate",
      args: {
        templateId: nonNull(stringArg()),
        subject: nullable(stringArg()),
        body: nullable(stringArg()),
      },
      resolve: async (
        _,
        { templateId, subject, body },
        { prisma, currentUser }: Context,
        x
      ) => {
        let updateData: any = {};
        if (subject) updateData.subject = subject;
        if (body) updateData.body = body;

        const updatedTemplate = await prisma.workEmailTemplate.update({
          where: {
            id: templateId,
          },
          data: updateData,
        });

        console.info("updatedTemplate", updatedTemplate);

        return updatedTemplate;
      },
    });
  },
});
