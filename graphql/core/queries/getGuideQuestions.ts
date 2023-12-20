import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import { getEncoding, encodingForModel } from "js-tiktoken";
import OpenAIClient from "../../../helpers/OpenAI";
import { getPresentationGuideQuestions } from "../../../prompts/getGuideQuestions";

export const GetGuideQuestionsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getGuideQuestions", {
      type: "JSON",
      args: {
        fileApp: nonNull(stringArg()),
        fileTitle: nonNull(stringArg()),
        sectionContent: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { fileApp, fileTitle, sectionContent },
        { prisma, openai, currentUser }: Context,
        x
      ) => {
        console.info("getGuideQuestions", fileApp, fileTitle, sectionContent);

        sectionContent = JSON.parse(sectionContent);

        const openaiClient = new OpenAIClient(openai, prisma, currentUser);

        let content = "";
        switch (fileApp) {
          case "documents":
            // content = getDocumentGuideQuestions(fileTitle, sectionContent);
            break;
          case "slides":
            content = getPresentationGuideQuestions(fileTitle, sectionContent);
            break;
          case "spreadsheets":
            // content = getSheetGuideQuestions(fileTitle, sectionContent);
            break;
          case "images":
            // content = getDrawingGuideQuestions(fileTitle, sectionContent);
            break;
          default:
            throw new Error("Invalid file app");
        }

        const finalJson = await openaiClient.makeCompletion(content);

        return finalJson;
      },
    });
  },
});
