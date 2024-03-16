import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import { getEncoding, encodingForModel } from "js-tiktoken";
import OpenAIClient from "../../../helpers/OpenAI";
import {
  getDocumentGuideQuestions,
  getPresentationGuideQuestions,
} from "../../../prompts/getGuideQuestions";
import AI_Controller from "../../../helpers/AI_Controller";

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

        const aiClient = new AI_Controller(openai, prisma, currentUser);
        const model = "gpt";

        let content = "";
        switch (fileApp) {
          case "documents":
            content = getDocumentGuideQuestions(fileTitle, sectionContent);
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

        const finalJson = await aiClient.makeCompletion(model, content);

        return finalJson;
      },
    });
  },
});
