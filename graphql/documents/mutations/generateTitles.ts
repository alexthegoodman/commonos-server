import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import OpenAIClient from "../../../helpers/OpenAI";
import { getMoreDocumentTitles } from "../../../prompts/getFileList";

export const GenerateTitlesMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.list.field("generateTitles", {
      type: "Document",
      args: {
        treeMd: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { treeMd },
        { openai, prisma, currentUser }: Context,
        x
      ) => {
        const openaiClient = new OpenAIClient(openai, prisma, currentUser);

        const titlesPrompt = getMoreDocumentTitles(treeMd);

        const titles = await openaiClient.makeCompletion(
          titlesPrompt,
          1.2,
          "json_object"
        );

        const newDocuments = await Promise.all(
          titles.documents.map(async (title) => {
            const newDocument = await prisma.document.create({
              data: {
                title,
                creatorId: currentUser.id,
              },
            });

            return newDocument.id;
          })
        );

        console.info("newDocument", newDocuments);

        const docs = await prisma.document.findMany({
          where: {
            id: {
              in: newDocuments,
            },
          },
        });

        return docs;
      },
    });
  },
});
