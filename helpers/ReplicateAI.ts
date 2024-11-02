import axios from "axios";
import Replicate from "replicate";

export default class ReplicateAI {
  replicateClient: Replicate;

  constructor() {
    this.replicateClient = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
  }

  async fetchFileAsBase64(url) {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const base64File = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      console.info(
        "fetchFileAsBase64 content-type",
        response.headers["content-type"]
      );
      return `data:${response.headers["content-type"]};base64,${base64File}`;
    } catch (error) {
      console.error("Error fetching and converting file:", error);
      throw new Error("Failed to fetch and convert file");
    }
  }

  async generateConcept(prompt = "A tiger in the mountains") {
    // TODO: count towards token limits

    console.info("generating concept...");

    // sdxl-flash
    const imageUrl = (await this.replicateClient.run(
      "chenxwh/sdxl-flash:001bb81139b01780380407b4106ac681df46108e002eafbeb9ccb2d8faca42e1",
      {
        input: {
          width: 1024,
          height: 1024,
          prompt,
          guidance_scale: 3,
          // needed?
          negative_prompt:
            "(deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation, NSFW",
          //   num_inference_steps: 15,
          num_inference_steps: 10,
        },
      }
    )) as unknown as string;

    console.log("generateConcept", imageUrl);

    const base64 = this.fetchFileAsBase64(imageUrl);

    return base64;
  }

  async generateModel(
    imagePath = "https://replicate.delivery/pbxt/KVwdH39PhIC46WaizHYsrFp9f5oLSr65VKhEtxoFtmmwEqeL/hamburger.png"
  ) {
    // TODO: count towards token limits

    console.info("generating model...");

    // tripo-sr
    const modelUrl = (await this.replicateClient.run(
      "camenduru/tripo-sr:e0d3fe8abce3ba86497ea3530d9eae59af7b2231b6c82bedfc32b0732d35ec3a",
      {
        input: {
          image_path: imagePath,
          foreground_ratio: 0.85,
          do_remove_background: true,
        },
      }
    )) as unknown as string;

    console.log("generateModel", modelUrl);

    const base64 = this.fetchFileAsBase64(modelUrl);

    return base64;
  }
}
