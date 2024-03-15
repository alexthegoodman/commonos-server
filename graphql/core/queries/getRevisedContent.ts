import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import { getEncoding, encodingForModel } from "js-tiktoken";
import OpenAIClient from "../../../helpers/OpenAI";
import { getPresentationGuideQuestions } from "../../../prompts/getGuideQuestions";
import {
  getDocumentRevisionContent,
  getPresentationRevisionContent,
} from "../../../prompts/getRevisedContent";
import AI_Controller from "../../../helpers/AI_Controller";

export const GetRevisedContentQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getRevisedContent", {
      type: "JSON",
      args: {
        fileApp: nonNull(stringArg()),
        fileTitle: nonNull(stringArg()),
        sectionContent: nonNull(stringArg()),
        sectionQuestions: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { fileApp, fileTitle, sectionContent, sectionQuestions },
        { prisma, openai, currentUser }: Context,
        x
      ) => {
        console.info(
          "getRevisedContent",
          fileApp,
          fileTitle,
          sectionContent,
          sectionQuestions
        );

        sectionContent = JSON.parse(sectionContent);
        sectionQuestions = JSON.parse(sectionQuestions);

        const aiClient = new AI_Controller(openai, prisma, currentUser);
        const model = "mistral";

        let content = "";
        let finalJson = {};
        switch (fileApp) {
          case "documents":
            content = getDocumentRevisionContent(
              fileTitle,
              sectionContent,
              sectionQuestions
            );
            let text = await aiClient.makeCompletion(
              model,
              content,
              1.2,
              "text"
            );
            finalJson = { text };
            break;
          case "slides":
            content = getPresentationRevisionContent(
              fileTitle,
              sectionContent,
              sectionQuestions
            );
            finalJson = await aiClient.makeCompletion(model, content);
            break;
          case "spreadsheets":
            break;
          case "images":
            break;
          default:
            throw new Error("Invalid file app");
        }

        return finalJson;
      },
    });
  },
});
