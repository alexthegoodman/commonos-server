import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const GenerateTextureMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("generateTexture", {
      type: "String",
      args: {
        prompt: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { prompt },
        { prisma, currentUser, replicate }: Context,
        x
      ) => {
        const textureBase64 = await replicate.generateConcept(
          `${prompt} texture`
        ); // switch out for texture-specific model if needed

        return textureBase64;
      },
    });
  },
});
