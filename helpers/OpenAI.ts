import {
  getDocumentOutline,
  getDocumentQuestions,
} from "../prompts/getQuestions";
import { getEncoding, encodingForModel } from "js-tiktoken";

export default class OpenAIClient {
  constructor(openai, prisma, currentUser) {
    this.openai = openai;
    this.prisma = prisma;
    this.currentUser = currentUser;
  }

  async makeCompletion(outlineContent) {
    const tokenUsageLimit =
      this.currentUser.subscription === "NONE"
        ? 50000
        : this.currentUser.subscription === "STANDARD"
          ? 2000000
          : 0;

    if (this.currentUser.periodTokenUsage >= tokenUsageLimit) {
      throw new Error("Token usage limit reached");
    }

    const enc = getEncoding("cl100k_base");
    const inputTokensOutline = enc.encode(outlineContent);

    if (!outlineContent) {
      throw new Error("No prompt content!");
    }

    console.info("Sending prompt....\n", outlineContent);

    const outlineResponse = await this.openai.chat.completions.create({
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

      const tokensUsed = inputTokensOutline.length + outputTokensOutline.length;

      console.info("tokensUsed", tokensUsed);

      await this.prisma.user.update({
        where: {
          id: this.currentUser.id,
        },
        data: {
          periodTokenUsage: {
            increment: tokensUsed,
          },
        },
      });

      const json = JSON.parse(jsonText);

      // TODO: save outline to flow

      return json;
    } catch (error) {
      console.error("Error parsing OpenAI JSON", error);
    }
  }
}
