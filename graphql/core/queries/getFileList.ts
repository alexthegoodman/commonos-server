import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import {
  getDocumentList,
  getAddtFilesList,
} from "../../../prompts/getFileList";
import { getEncoding, encodingForModel } from "js-tiktoken";
import OpenAIClient from "../../../helpers/OpenAI";

export const GetFileListQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getFileList", {
      type: "JSON",
      args: {
        flowId: nonNull(stringArg()),
        // getThis: nonNull(stringArg()),
      },
      resolve: async (
        _,
        {
          flowId,
          //getThis
        },
        { prisma, openai, currentUser }: Context,
        x
      ) => {
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

        const { initialQuestions, chosenApps } = flow.questionsContext as any;

        if (!initialQuestions) {
          throw new Error("Questions not found");
        }

        if (!chosenApps) {
          throw new Error("Chosen Apps not found");
        }

        let finalJson = {} as any;

        await Promise.all(
          chosenApps.map(async (app) => {
            let content = "";
            switch (app) {
              case "documents":
                content = getDocumentList(flow.prompt, initialQuestions, 5);
                break;
              case "work-email":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  app,
                  "work-email",
                  3,
                  "email subjects",
                  "Provide email subjects that sound personal and direct rather than like newsletters."
                );
                break;
              case "relationships":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  "Relationships CRM",
                  "relationships",
                  3,
                  "dashboard titles",
                  "Provide Dashboard titles that make sense for monitoring CRM KPIs."
                );
                break;
              case "drawings":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  "image",
                  "drawings",
                  3,
                  "prompts",
                  "Provide image prompts that are detailed and meant for a generator like Dall-E."
                );
                break;
              case "sheets":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  "spreadsheet",
                  "sheets",
                  3,
                  "titles"
                );
                break;
              case "slides":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  "presentation",
                  "slides",
                  3,
                  "titles"
                );
                break;
              case "content":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  "CMS",
                  "content",
                  3,
                  "content titles",
                  "Provide CMS titles that sound like article or blog post titles."
                );
                break;
              default:
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  app,
                  app,
                  3
                );
                break;
            }

            console.info("getFileList", content);

            const appFiles = await openaiClient.makeCompletion(content);

            finalJson = { ...finalJson, ...appFiles };
          })
        );

        return finalJson;
      },
    });
  },
});
