import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const NewPresentationTemplateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("newPresentationTemplate", {
      type: "PresentationTemplate",
      args: {
        sourceId: nonNull(stringArg()),
        title: nonNull(stringArg()),
        context: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { sourceId, title, context },
        { prisma, currentUser }: Context,
        x
      ) => {
        const key = title.toLowerCase().replace(/\s/g, "_");

        const newPresentationTemplate =
          await prisma.presentationTemplate.create({
            data: {
              sourceId,
              title,
              key,
              context: JSON.parse(context),
            },
          });

        console.info("newPresentationTemplate", newPresentationTemplate);

        return newPresentationTemplate;
      },
    });
  },
});
