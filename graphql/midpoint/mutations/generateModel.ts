import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const GenerateModelMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("generateModel", {
      type: "String",
      args: {
        imagePath: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { imagePath },
        { prisma, currentUser, replicate }: Context,
        x
      ) => {
        const modelBase64 = await replicate.generateModel(imagePath);

        return modelBase64;
      },
    });
  },
});
