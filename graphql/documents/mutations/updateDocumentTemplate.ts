import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateDocumentTemplateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateDocumentTemplate", {
      type: "DocumentTemplate",
      args: {
        documentTemplateId: nonNull(stringArg()),
        masterVisuals: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { documentTemplateId, masterVisuals },
        { prisma, currentUser }: Context,
        x
      ) => {
        const updatedDocumentTemplate = await prisma.documentTemplate.update({
          where: {
            id: documentTemplateId,
          },
          data: {
            masterVisuals: JSON.parse(masterVisuals),
          },
        });

        return updatedDocumentTemplate;
      },
    });
  },
});
