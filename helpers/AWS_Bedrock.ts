import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import Helpers from "./Helpers";
import prisma from "../prisma";
import { getEncoding } from "js-tiktoken";

export default class AWS_Bedrock {
  REGION = "us-west-2";
  bedrockClient;
  private currentUser: any;

  constructor(currentUser) {
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.bedrockClient = new BedrockRuntimeClient({
        region: this.REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
    }
    this.currentUser = currentUser;
  }

  async makeCompletion(
    model,
    outlineContent,
    temperature = 0.7,
    responseFormat = "json_object"
  ) {
    const helpers = new Helpers();
    const tokenUsageLimit = helpers.getTokenLimit(this.currentUser);

    if (this.currentUser.periodTokenUsage >= tokenUsageLimit) {
      throw new Error("Token usage limit reached");
    }

    const enc = getEncoding("cl100k_base");
    const inputTokensOutline = enc.encode(outlineContent);

    if (!outlineContent) {
      throw new Error("No prompt content!");
    }

    console.info("Sending prompt....\n", outlineContent);

    let modelId = "";
    switch (model) {
      case "mistral":
        modelId = "mistral.mistral-7b-instruct-v0:2";
        break;
    }

    // set temperature as between 0.5 and 1.0
    temperature = Math.min(Math.max(temperature, 0.5), 1.0);

    const input = {
      modelId,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: outlineContent,
        //   max_tokens: 400,
        top_k: 50,
        top_p: 0.7,
        temperature,
      }),
    };

    // Create an InvokeModelCommand with the input parameters
    const command = new InvokeModelCommand(input);
    const outlineResponse = await this.bedrockClient.send(command);

    try {
      //   const jsonText = outlineResponse.choices[0].message.content;
      const rawRes = outlineResponse.body;

      // Convert it to a JSON String
      const fullJson = new TextDecoder().decode(rawRes);
      const jsonOutput = JSON.parse(fullJson);
      const jsonText = jsonOutput.outputs
        .map((output) => output.text)
        .join("\n");

      if (!fullJson) {
        throw new Error("No JSON text");
      }

      const outputTokensOutline = enc.encode(jsonText);

      const tokensUsed = inputTokensOutline.length + outputTokensOutline.length;

      console.info("tokensUsed", tokensUsed);

      await prisma.user.update({
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
      console.error("Error parsing Bedrock JSON", error);
    }
  }
}
