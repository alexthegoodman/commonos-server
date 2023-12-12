import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import {
  getFileQuestions,
  getInitialQuestions,
} from "../../../prompts/getQuestions";

export const GetQuestionsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getQuestions", {
      type: "JSON",
      args: {
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

        let content = "";
        switch (getThis) {
          case "initial":
            content = getInitialQuestions(fileTitle);
            break;
          case "files":
            content = getFileQuestions(fileTitle);
            break;
          default:
            throw new Error("Invalid getThis");
        }

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
