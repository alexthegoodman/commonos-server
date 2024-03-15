import AWS_Bedrock from "./AWS_Bedrock";
import OpenAIClient from "./OpenAI";

export default class AI_Controller {
  awsBedrock: AWS_Bedrock;
  openAI: OpenAIClient;

  constructor(openai, prisma, currentUser) {
    this.awsBedrock = new AWS_Bedrock(currentUser);
    this.openAI = new OpenAIClient(openai, prisma, currentUser);
  }

  async makeCompletion(
    model = "gpt",
    outlineContent,
    temperature = 1.5,
    responseFormat = "json_object"
  ) {
    if (model === "gpt") {
      return this.openAI.makeCompletion(
        outlineContent,
        temperature,
        responseFormat
      );
    } else if (model === "mistral") {
      return this.awsBedrock.makeCompletion(
        model,
        outlineContent,
        temperature,
        responseFormat
      );
    }
  }

  async makeImage(model = "gpt", prompt) {
    if (model === "gpt") {
      return this.openAI.makeImage(prompt);
    }
  }
}
