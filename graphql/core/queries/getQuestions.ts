import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import {
  getContentQuestions,
  getDocumentOutline,
  getDocumentQuestions,
  getDrawingQuestions,
  getInitialQuestions,
  getPresentationOutline,
  getPresentationQuestions,
  getRelationshipsQuestions,
  getSheetQuestions,
  getWorkEmailQuestions,
} from "../../../prompts/getQuestions";
import { getEncoding, encodingForModel } from "js-tiktoken";
import OpenAIClient from "../../../helpers/OpenAI";

export const GetQuestionsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getQuestions", {
      type: "JSON",
      args: {
        flowId: nonNull(stringArg()),
        fileApp: nonNull(stringArg()),
        fileTitle: nonNull(stringArg()),
        getThis: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { flowId, fileApp, fileTitle, getThis },
        { prisma, openai, currentUser }: Context,
        x
      ) => {
        console.info("getQuestions", fileTitle, fileApp, getThis);
        const openaiClient = new OpenAIClient(openai, prisma, currentUser);

        const flow = await prisma.flow.findFirst({
          where: {
            id: flowId,
            creator: {
              id: currentUser.id,
            },
          },
        });

        if (!flow) {
          throw new Error("Flow not found");
        }

        let content = "";
        switch (getThis) {
          case "initial":
            content = getInitialQuestions(fileTitle);
            break;
          case "files":
            const { initialQuestions } = flow.questionsContext as any;

            if (fileApp === "documents") {
              const outlineContent = getDocumentOutline(fileTitle);
              const outlineJson =
                await openaiClient.makeCompletion(outlineContent);
              content = getDocumentQuestions(
                fileTitle,
                initialQuestions,
                outlineJson.sections
              );
            } else if (fileApp === "slides") {
              const outlineContent = getPresentationOutline(fileTitle);
              const outlineJson =
                await openaiClient.makeCompletion(outlineContent);
              content = getPresentationQuestions(
                fileTitle,
                initialQuestions,
                outlineJson.slides
              );
            } else if (fileApp === "sheets") {
              content = getSheetQuestions(fileTitle);
            } else if (fileApp === "images") {
              content = getDrawingQuestions(fileTitle);
            } else if (fileApp === "work-email") {
              content = getWorkEmailQuestions(fileTitle);
            } else if (fileApp === "relationships") {
              content = getRelationshipsQuestions(fileTitle);
            } else if (fileApp === "content") {
              content = getContentQuestions(fileTitle);
            }

            break;
          default:
            throw new Error("Invalid getThis");
        }

        console.info("getQuestions", content);

        const finalJson = await openaiClient.makeCompletion(content);

        return finalJson;
      },
    });
  },
});
