import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";

export const CreateFlowMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createFlow", {
      type: "JSON",
      args: {
        prompt: nullable(stringArg()),
        typeCode: nullable(stringArg()),
      },
      resolve: async (
        _,
        { prompt, typeCode },
        { prisma, currentUser }: Context,
        x
      ) => {
        const type = await prisma.type.findFirst({
          where: {
            code: typeCode,
          },
        });

        if (!type) {
          throw new Error("Type not found");
        }

        const flow = await prisma.flow.create({
          data: {
            prompt,
            type: {
              connect: {
                id: type.id,
              },
            },
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        return flow;
      },
    });
  },
});
