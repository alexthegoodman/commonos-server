import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import {
  getDocumentList,
  getAddtFilesList,
} from "../../../prompts/getFileList";
import { getEncoding, encodingForModel } from "js-tiktoken";
import OpenAIClient from "../../../helpers/OpenAI";
import AI_Controller from "../../../helpers/AI_Controller";

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
        const aiClient = new AI_Controller(openai, prisma, currentUser);
        const model = "gpt";

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
                content = getDocumentList(flow.prompt, initialQuestions, 3);
                break;
              case "work-email":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  app,
                  "subjects",
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
                  "titles",
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
                  "prompts",
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
                  "titles",
                  3,
                  "titles"
                );
                break;
              case "slides":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  "presentation",
                  "titles",
                  3,
                  "titles"
                );
                break;
              case "content":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  "CMS",
                  "titles",
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
                  "titles",
                  3
                );
                break;
            }

            console.info("getFileList", content);

            const appFiles = await aiClient.makeCompletion(model, content);

            let includedFiles = {} as any;
            switch (app) {
              case "documents":
                includedFiles.documents = appFiles.documents;
                break;
              case "work-email":
                includedFiles["work-email"] = appFiles.subjects;
                break;
              case "relationships":
                includedFiles.relationships = appFiles.titles;
                break;
              case "drawings":
                includedFiles.drawings = appFiles.prompts;
                break;
              case "sheets":
                includedFiles.sheets = appFiles.titles;
                break;
              case "slides":
                includedFiles.slides = appFiles.titles;
                break;
              case "content":
                includedFiles.content = appFiles.titles;
                break;
              default:
                break;
            }

            finalJson = { ...finalJson, ...includedFiles };
          })
        );

        return finalJson;
      },
    });
  },
});
