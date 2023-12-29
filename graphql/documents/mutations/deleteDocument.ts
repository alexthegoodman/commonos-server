import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const DeleteDocumentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteDocument", {
      type: "String",
      args: {
        documentId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { documentId },
        { prisma, currentUser }: Context,
        x
      ) => {
        await prisma.document.delete({
          where: {
            id: documentId,
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
