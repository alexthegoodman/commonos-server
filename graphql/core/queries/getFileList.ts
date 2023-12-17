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
        getThis: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { flowId, getThis },
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

        const { initialQuestions } = flow.questionsContext;

        let content = "";
        switch (getThis) {
          case "documents":
            content = getDocumentList(flow.prompt, initialQuestions);
            break;
          case "additionalFiles":
            content = getAddtFilesList(flow.prompt, initialQuestions);
            break;
          default:
            throw new Error("Invalid getThis");
        }

        console.info("getFileList", content);

        const finalJson = await openaiClient.makeCompletion(content);

        return finalJson;
      },
    });
  },
});
