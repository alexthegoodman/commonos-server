import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import {
  getFileOutline,
  getFileQuestions,
  getInitialQuestions,
} from "../../../prompts/getQuestions";
import { getEncoding, encodingForModel } from "js-tiktoken";

export const GetQuestionsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getQuestions", {
      type: "JSON",
      args: {
        flowId: nonNull(stringArg()),
        fileTitle: nonNull(stringArg()),
        getThis: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { flowId, fileTitle, getThis },
        { prisma, openai, currentUser }: Context,
        x
      ) => {
        console.info("getQuestions", fileTitle);
        const enc = getEncoding("cl100k_base");

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
            const { initialQuestions } = flow.questionsContext;

            const outlineContent = getFileOutline(fileTitle);

            const inputTokensOutline = enc.encode(outlineContent);

            const outlineResponse = await openai.chat.completions.create({
              model: "gpt-3.5-turbo-1106",
              messages: [
                {
                  content: outlineContent,
                  role: "user",
                },
              ],
              response_format: { type: "json_object" },
              // max_tokens: 50,
              temperature: 1.5,
            });

            try {
              const jsonText = outlineResponse.choices[0].message.content;

              if (!jsonText) {
                throw new Error("No JSON text");
              }

              const outputTokensOutline = enc.encode(jsonText);

              const tokensUsed =
                inputTokensOutline.length + outputTokensOutline.length;

              console.info("tokensUsed", tokensUsed);

              await prisma.user.update({
                where: {
                  id: currentUser.id,
                },
                data: {
                  periodTokenUsage: {
                    increment: tokensUsed,
                  },
                },
              });

              const json = JSON.parse(jsonText);

              // TODO: save outline to flow

              content = getFileQuestions(
                fileTitle,
                initialQuestions,
                json.sections
              );
            } catch (error) {
              console.error("Error parsing OpenAI JSON", error);
            }

            break;
          default:
            throw new Error("Invalid getThis");
        }

        console.info("getQuestions", content);

        const inputTokens = enc.encode(content);

        // get continuation text from openai
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              content: content,
              role: "user",
            },
          ],
          response_format: { type: "json_object" },
          // max_tokens: 50,
          temperature: 1.5,
        });

        console.info("openai response", response);

        try {
          const jsonText = response.choices[0].message.content;

          if (!jsonText) {
            throw new Error("No JSON text");
          }

          // update user token usage
          const outputTokens = enc.encode(jsonText);
          const tokensUsed = inputTokens.length + outputTokens.length;

          console.info("tokensUsed", tokensUsed);

          await prisma.user.update({
            where: {
              id: currentUser.id,
            },
            data: {
              periodTokenUsage: {
                increment: tokensUsed,
              },
            },
          });

          const json = JSON.parse(jsonText);
          return json;
        } catch (error) {
          console.error("Error parsing OpenAI JSON", error);
        }
      },
    });
  },
});
