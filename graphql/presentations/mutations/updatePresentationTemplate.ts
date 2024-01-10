import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdatePresentationTemplateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePresentationTemplate", {
      type: "PresentationTemplate",
      args: {
        presentationTemplateId: nonNull(stringArg()),
        context: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { presentationTemplateId, context },
        { prisma, currentUser }: Context,
        x
      ) => {
        const updatedPresentationTemplate =
          await prisma.presentationTemplate.update({
            where: {
              id: presentationTemplateId,
            },
            data: {
              context: JSON.parse(context),
            },
          });

        return updatedPresentationTemplate;
      },
    });
  },
});
