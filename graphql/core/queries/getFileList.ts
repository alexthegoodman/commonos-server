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
                  "email subjects"
                );
                break;
              case "relationships":
                content = getAddtFilesList(
                  flow.prompt,
                  initialQuestions,
                  "Relationships CRM",
                  "relationships",
                  3,
                  "dashboard titles"
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
