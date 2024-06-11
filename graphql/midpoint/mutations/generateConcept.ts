import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const GenerateConceptMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("generateConcept", {
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
        const conceptBase64 = await replicate.generateConcept(prompt);

        return conceptBase64;
      },
    });
  },
});
