import OpenAI from "openai";
import {
  getDocumentOutline,
  getDocumentQuestions,
} from "../prompts/getQuestions";
import { getEncoding, encodingForModel } from "js-tiktoken";
import { PrismaClient } from "@prisma/client";
import Helpers from "./Helpers";
import { put } from "@vercel/blob";

export default class OpenAIClient {
  private openai: OpenAI;
  private prisma: PrismaClient;
  private currentUser: any;

  constructor(openai, prisma, currentUser) {
    this.openai = openai;
    this.prisma = prisma;
    this.currentUser = currentUser;
  }

  async makeCompletion(
    outlineContent,
    temperature = 1.5,
    responseFormat = "json_object"
  ) {
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
      // model: "gpt-4-1106-preview",
      messages: [
        {
          content: outlineContent,
          role: "user",
        },
      ],
      response_format: { type: responseFormat as any },
      // max_tokens: 50,
      temperature,
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

      const json =
        responseFormat === "json_object" ? JSON.parse(jsonText) : jsonText;

      console.info("prompt JSON", JSON.stringify(json, null, 2));

      return json;
    } catch (error) {
      console.error("Error parsing OpenAI JSON", error);
    }
  }

  async makeImage(prompt) {
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
    const inputTokens = enc.encode(prompt);

    if (!prompt) {
      throw new Error("No prompt content!");
    }

    console.info("Sending prompt....\n", prompt);

    const { data } = await this.openai.images.generate({
      model: "dall-e-3",
      response_format: "b64_json",
      prompt,
    });

    const fileData = data[0].b64_json as any;

    // upload to storage
    const helpers = new Helpers();
    const filePath = helpers.getUploadDirectory(prompt);

    console.info("uploading file", filePath);

    let buffer;
    if (true) {
      buffer = Buffer.from(
        fileData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
    }
    // else if (contentType === "video") {
    //   buffer = Buffer.from(
    //     base64.replace(/^data:video\/\w+;base64,/, ""),
    //     "base64"
    //   );
    // } else if (contentType === "audio") {
    //   buffer = Buffer.from(
    //     base64.replace(/^data:audio\/\w+;base64,/, ""),
    //     "base64"
    //   );
    // }

    const blob = await put(filePath, buffer, { access: "public" });

    const outputTokensLength = 2000;
    const tokensUsed = inputTokens.length + outputTokensLength;

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

    return blob;
  }
}
