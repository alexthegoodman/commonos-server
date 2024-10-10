import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const NewDocumentTemplateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("newDocumentTemplate", {
      type: "DocumentTemplate",
      args: {
        sourceId: nonNull(stringArg()),
        title: nonNull(stringArg()),
        masterVisuals: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { sourceId, title, masterVisuals },
        { prisma, currentUser }: Context,
        x
      ) => {
        const key = title.toLowerCase().replace(/\s/g, "_");

        const newDocumentTemplate = await prisma.documentTemplate.create({
          data: {
            sourceId,
            title,
            key,
            masterVisuals: JSON.parse(masterVisuals),
          },
        });

        console.info("newDocumentTemplate", newDocumentTemplate);

        return newDocumentTemplate;
      },
    });
  },
});
