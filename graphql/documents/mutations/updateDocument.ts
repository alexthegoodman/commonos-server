import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const UpdateDocumentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateDocument", {
      type: "Document",
      args: {
        documentId: nonNull(stringArg()),
        title: nullable(stringArg()),
        content: nullable(stringArg()),
        plaintext: nullable(stringArg()),
        html: nullable(stringArg()),
        messages: nullable(stringArg()),
      },
      resolve: async (
        _,
        { documentId, title, content, plaintext, html, messages },
        { prisma, currentUser }: Context,
        x
      ) => {
        let updateData = {};

        if (title) updateData = { ...updateData, title };
        if (content)
          updateData = { ...updateData, content: JSON.parse(content) };
        if (plaintext) updateData = { ...updateData, plaintext };
        if (html) updateData = { ...updateData, html };
        if (messages)
          updateData = { ...updateData, messages: JSON.parse(messages) };

        const updatedDocument = await prisma.document.update({
          where: {
            id: documentId,
          },
          data: updateData,
        });

        return updatedDocument;
      },
    });
  },
});
