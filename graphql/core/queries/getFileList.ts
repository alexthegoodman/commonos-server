import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import { getFileList } from "../../../prompts/getFileList";

export const GetFileListQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getFileList", {
      type: "JSON",
      args: {
        flowId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { flowId },
        { prisma, openai, currentUser }: Context,
        x
      ) => {
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

        console.info("getFileList", flow.prompt);

        // get continuation text from openai
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              content: getFileList(flow.prompt),
              role: "user",
            },
          ],
          response_format: { type: "json_object" },
          // max_tokens: 50,
          // temperature: 0.2,
        });

        console.info("openai response", response);

        try {
          const jsonText = response.choices[0].message.content;

          if (!jsonText) {
            throw new Error("No JSON text");
          }

          const json = JSON.parse(jsonText);
          return json;
        } catch (error) {
          console.error("Error parsing OpenAI JSON", error);
        }
      },
    });
  },
});
